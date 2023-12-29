import { computed, h, reactive, resolveComponent, vShow, watchEffect, withDirectives } from "vue"
import { base } from "./base"
import { system, systemInstance } from "./system"
import { VxeFormItem, VxeFormProps } from "vxe-table"
import { StyleType, formConfig, layoutConfig, layoutItem, layoutItemConfig } from "@/types/schema"
import * as formFn from './formFn'
import { styleBuilder } from "@/utils/utils"
import { createFormItem, formitem } from "./formitem"
import instanceView from "./schemaComponent/instanceView"
import formitemView from "./editComponent/formitemView"
export class form extends base<formConfig> {
  formConfig: formConfig = {
    isDraggable: true,
    isResizable: true,
    items: [],//编辑项
    disabled: false,
  }
  renderForm: VxeFormProps = {
  }
  renderLayout: layoutConfig = {}
  constructor(schema: any, system: system) {
    super(system, schema)
  }
  async initForm() {
    const schema = this.schema!
    const formConfig = this.formConfig
    const effectPool = this.effectPool
    for (const key of Object.keys(schema)) {
      const value = schema[key]
      if (key == 'items') {
        effectPool[`form${key}Effect`] = watchEffect(() => {
          let _value = schema[key] || []
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
          formConfig.items.forEach(item => {
            //@ts-ignore
            item.getData = () => {
              return schema.data || {}
            }
          })
        }) as any
        continue
      }
      if (value != null) {
        const effectPool = this.effectPool
        const formConfig = this.formConfig as any
        effectPool[`form${key}Effect`] = watchEffect(() => {
          formConfig[key] = schema[key]
        })
      }
    }
    this.initRenderForm()
    this.initRenderLayout()
    this.initComponent()
  }
  async initRenderLayout() {
    const renderLayout = this.renderLayout
    const formConfig = this.formConfig
    const items: formitem[] = formConfig.items
    const _layout = items.map((item: formitem, i, arr) => {
      const itemConfig = item.itemConfig
      const span: number = itemConfig.span as number || 6
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
    // renderForm.items = formFn.getFormItems(this) as any
    renderForm.data = formFn.getFormData(this) as any
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
                () => _this.formConfig.items!.map((item: formitem, i) => {

                  const obj = item.renderLayoutItem
                  // return h(layoutItemCom, _item,
                  return h(layoutItemCom, { ...obj },
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
}

export const createForm = (schema: any) => {
  const _form = reactive(new form(schema, systemInstance))
  _form.initForm()
  return _form
}