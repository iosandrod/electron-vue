import { computed, h, reactive, resolveComponent, vShow, watchEffect, withDirectives } from "vue"
import { base } from "./base"
import { system, systemInstance } from "./system"
import { VxeFormItem, VxeFormProps } from "vxe-table"
import { formConfig } from "@/types/schema"
import * as formFn from './formFn'
import { styleBuilder } from "@/utils/utils"
import { createFormItem, formitem } from "./formitem"
export class form extends base<formConfig> {
  formConfig: formConfig = {
    items: [],//编辑项
  }
  renderForm: VxeFormProps = {
  }
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
          formConfig.items = _value.map((item: any) => {
            if (item instanceof formitem) {
              return item
            }
            let _item = createFormItem(item, this)
            return _item
          })
        })
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
    this.initComponent()
  }
  async initRenderForm() {
    const renderForm = this.renderForm
    renderForm.items = formFn.getFormItems(this) as any
    renderForm.data = formFn.getFormData(this) as any
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
      const formView = h(formComponent, { ...this.renderForm, style: { width: '100%' } },
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