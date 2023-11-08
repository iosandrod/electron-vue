import { h, reactive } from "vue"
import { base } from "./base"
import { system, systemInstance } from "./system"
import { VxeFormProps } from "vxe-table"
export class form extends base {
  formConfig = {}
  renderForm: VxeFormProps = {}
  constructor(schema: any, system: system) {
    super(system)
  }
  async initForm() {

  }
  async initComponent(): Promise<void> {
    const vNode = () => {
      return h('div')
    }
    this.component = vNode
  }
}


export const createForm = (schema: any) => {
  const _form = reactive(new form(schema, systemInstance))
}