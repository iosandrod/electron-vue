import { h, reactive, watchEffect } from "vue"
import { base } from "./base"
import { system, systemInstance } from "./system"
import { VxeFormProps } from "vxe-table"
import { formConfig } from "@/types/schema"
import * as formFn from './formFn'
export class form extends base<formConfig> {
  formConfig: formConfig = {
    items: [],

  }
  renderForm: VxeFormProps = {
  }
  constructor(schema: any, system: system) {
    super(system)
  }
  async initForm() {
    const schema = this.schema!
    for (const key of Object.keys(schema)) {
      const value = schema[key]
      if (value != null) {
        const effectPool = this.effectPool
        const formConfig = this.formConfig as any
        effectPool[`select${key}Effect`] = watchEffect(() => {
          formConfig[key] = schema[key]
        })
      }
    }
    this.initComponent()
  }
  async initRenderForm() {
    const renderForm = this.renderForm
    renderForm.items = formFn.getFormItems(this) as any
  }
  async initComponent(): Promise<void> {
    const vNode = () => {
      return h('div', {}, ['123'])
    }
    this.component = vNode
  }
}


export const createForm = (schema: any) => {
  const _form = reactive(new form(schema, systemInstance))
  _form.initForm()
  return _form
}