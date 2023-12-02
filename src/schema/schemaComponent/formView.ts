import { VNode, defineExpose, defineComponent, h, onMounted, resolveComponent } from "vue"
import { createTable } from "../table"
import { createEntityTable } from "../entityTable"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeFormProps } from 'vxe-table'
import { createForm } from "../form"
import { createDesignForm } from '../designForm'
export default defineComponent({
  props: ['items', 'data', 'design', 'formInstance'] as Array<(keyof VxeFormProps) | 'design' | 'formInstance'>,
  setup(props, context) {
    let form: any = null
    if (props.formInstance != null) {
      form = props.formInstance
    } else if (props.design == true) {
      form = form || createDesignForm(props)
    } else {
      form = form || createForm(props)
    }
    defineExpose({
      form
    })
    return form.component
  },
})


