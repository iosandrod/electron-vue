import { computed, h, reactive, resolveComponent, vShow, watch, watchEffect, withDirectives } from "vue"
import { base } from "./base"
import { system, systemInstance } from "./system"
import { VxeFormItem, VxeFormProps } from "vxe-table"
import { StyleType, formConfig, itemConfig, layoutConfig, layoutItem, layoutItemConfig } from "@/types/schema"
import * as formFn from './formFn'
import { styleBuilder } from "@/utils/utils"
import { createFormItem, formitem } from "./formitem"
import instanceView from "./schemaComponent/instanceView"
import formitemView from "./editComponent/formitemView"
export class form extends base<formConfig> {
  formConfig: formConfig = {
    data: {},
    isDraggable: false,
    isResizable: false,
    items: [],//编辑项
    disabled: false,
  }
  formData = {

  }
  renderForm: VxeFormProps = {
  }
  renderLayout: layoutConfig = {}
  constructor(schema: any, system: system) {
    super(system, schema)
  }
  async initForm() {
    const schema = this.schema!
    const formConfig: any = this.formConfig
    const effectPool = this.effectPool
    for (const key of Object.keys(schema)) {
      const value = schema[key]
      if (key == 'items') {
        // effectPool[`form${key}Effect`] = watchEffect(() => {
        //   let _value = schema[key] || []
        //   //@ts-ignore
        //   formConfig.items = _value.map((item: any, i) => {
        //     let _item = null
        //     if (item instanceof formitem) {
        //       _item = item
        //     } else {
        //       _item = createFormItem(item, this)
        //     }
        //     return _item
        //   })
        // }) as any
        continue
      }
      effectPool[`form${key}Effect`] = watchEffect(() => {
        formConfig[key] = schema[key]
      })
    }
    this.initFormItems()
    this.initFormRules()
    this.initRenderForm()
    this.initRenderLayout()
    this.initComponent()
  }
  async validate() {

  }
  initFormRules() {

  }
  initFormItems() {
    const schema = this.schema!
    let key = 'items'
    const formConfig: any = this.formConfig//表格
    let _value = schema[key] || []
    watch(() => schema['items'], (newValue: any) => {
      if (!Array.isArray(newValue)) {
        return
      }
      formConfig.items = newValue.map((item: any,) => {
        let _item = null
        if (item instanceof formitem) {
          _item = item
        } else {
          _item = createFormItem(item, this)
        }
        return _item
      })
    })
    //@ts-ignore 
    formConfig.items = _value.map((item: any, i) => {
      let _item = null
      if (item instanceof formitem) {
        _item = item
      } else {
        _item = createFormItem(item, this)
      }
      return _item
    })

    // debugger
    // console.log(formConfig.ites)
  }
  //计算
  calculateLayout(reset = false) {
    const _this = this
    const formConfig = _this.formConfig
    const items: formitem[] = formConfig.items as formitem[]
    const itemWidth = formConfig.itemWidth || 6
    const _layout = items.filter(item => item.itemConfig.visible != false).map((item: formitem, i, arr) => {
      const itemConfig = item.itemConfig
      const span: number = itemConfig.span as number || itemWidth
      const field = item.itemConfig.field!
      const obj: layoutItem = {
        i: field,
        w: span,
        h: 1
      } as layoutItem
      return obj
    })
    _layout.reduce((res, item) => {
      const w = item.w
      if (res.x + w > 24) {
        res.x = 0
        ++res.y
        item.y = res.y
        item.x = res.x
        res.x += w
      } else {
        item.y = res.y
        item.x = res.x
        res.x += w
      }
      return res
    }, { x: 0, y: 0 })
    if (reset) {
      this.renderLayout.layout = _layout
    }
    return _layout
  }
  async initRenderLayout() {
    const renderLayout = this.renderLayout
    const formConfig = this.formConfig
    const _layout = this.calculateLayout()
    renderLayout.layout = _layout
    renderLayout.colNum = 24
    renderLayout.isDraggable = computed(() => {
      return formConfig.isDraggable
    }) as any
    renderLayout.isResizable = computed(() => {
      return formConfig.isResizable
    }) as any
    renderLayout.rowHeight = computed(() => {
      return formConfig.rowHeight || 35
    }) as any
    renderLayout.margin = [0, 0]
    // renderLayout.preventCollision = true
    renderLayout.useCssTransform = computed(() => {
      // return formConfig.useCssTransform
      return true
    }) as any
    renderLayout.verticalCompact = computed(() => {
      // return formConfig.verticalCompact
      return true
    }) as any
    renderLayout['onUpdate:layout'] = (value) => {
      renderLayout.layout = value
    }
  }
  async initRenderForm() {
    const renderForm = this.renderForm
    renderForm.data = computed(() => {
      return this.formConfig.data
    })
    renderForm.customLayout = true
  }
  async initComponent(): Promise<void> {
    const show = computed(() => {
      return this.displayState == 'show'
    })
    const destroy = computed(() => {
      return this.displayState == 'destroy'
    })
    const vNode = () => {
      const formComponent = resolveComponent('vxe-form')
      if (destroy.value == true) {
        return null
      }
      const _this = this
      const formView = h(formComponent, { ...this.renderForm, style: { width: '100%' } }, {
        default: () => {
          const renderLayout = _this.renderLayout
          const layoutCom = resolveComponent('grid-layout')
          const layoutItemCom = resolveComponent('grid-item')
          const entityCom =
            h('div', { class: 'h-full w-full' }, [
              h(layoutCom, { ...renderLayout, style: { height: '100%', width: '100%' } as StyleType, },
                () => _this.formConfig.items!.filter((item: formitem) => {
                  return item.itemConfig.visible == true
                }).map((item: formitem, i) => {
                  const obj = item.renderLayoutItem
                  return h(layoutItemCom, { ...obj, key: item.itemConfig.field },
                    () => {
                      const inputCom = h(formitemView, { formitem: item, data: _this.formConfig.data })
                      return h('div', { style: { height: "100%", width: '100%' } }, [inputCom])
                    }
                  )
                })),
            ])
          return entityCom
        }
      }
      )
      const style = styleBuilder.setFull().getStyle()
      return withDirectives(h('div', { style }, [formView]), [[vShow, show.value]])
    }
    this.component = vNode
  }
  getEditItems() {
    return this.formConfig.items
  }
  getEditItemFields() {
    const items = this.getEditItems()
    return items.map(item => item.itemConfig.field)
  }
  setItemDisabled(field?: Array<string> | string, status?: boolean) {
    let fieldArr: any = null
    if (typeof field == 'string') {
      fieldArr = [field]
    } else {
      fieldArr = field
    }
    if (!Array.isArray(fieldArr)) {
      return
    }
    fieldArr.forEach((field: string) => {
      const items = this.formConfig.items
      const targetItem = items.find((item: formitem) => {
        return item.itemConfig.field == field
      }) as formitem
      if (targetItem) {
        targetItem!.itemConfig.disabled = Boolean(status)
      }
    })
  }
  setFormDisabled(disabled: boolean) {
    const _disabled = Boolean(disabled)
    this.formConfig.disabled = _disabled
  }
  addFormItem(itemConfig: itemConfig) {
    const item = createFormItem(itemConfig, this)
    this.formConfig.items.push(item as any)
    this.calculateLayout(true)
  }
  removeFormItem(field: string) {
    const formConfig = this.formConfig
    const items = formConfig.items
    const targetIndex = items.findIndex((item: formitem) => {
      return item.itemConfig.field == field
    })
    if (targetIndex == -1) {
      return
    }
    items.splice(targetIndex, 1)
  }
  setItemDisplay(field: string | Array<string>, status?: boolean) {
    let fieldArr: any = null
    if (typeof field == 'string') {
      fieldArr = [field]
    } else if (Array.isArray(field)) {
      fieldArr = field
    }
    fieldArr.forEach((field: string) => {
      const items = this.formConfig.items
      const targetItem = items.find((item: formitem) => {
        return item.itemConfig.field == field
      }) as formitem
      if (targetItem) {
        targetItem!.itemConfig.visible = Boolean(status)
      }
    })
    this.renderLayout.layout = this.calculateLayout()
  }
}

export const createForm = (schema: formConfig): form => {
  const _form = reactive(new form(schema, systemInstance))
  _form.initForm()
  return _form as form
}