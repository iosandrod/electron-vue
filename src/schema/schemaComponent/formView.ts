import { VNode, defineExpose, defineComponent, h, onMounted, resolveComponent } from "vue"
import { createTable } from "../table"
import { createEntityTable } from "../entityTable"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeFormProps } from 'vxe-table'
import { createForm } from "../form"
export default defineComponent({
  props: ['items', 'data'] as Array<keyof VxeFormProps>,
  setup(props, context) {
    const form: any = createForm(props)
    defineExpose({
      form
    })
    return form.component
  },
})


