import { VNode, defineExpose, defineComponent, h, onMounted, resolveComponent } from "vue"
import { createTable } from "../table"
import { createEntityTable } from "../entityTable"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid } from 'vxe-table'
export default defineComponent({
  props: ['align', 'animat', 'columns', 'columnConfig', 'data'] as Array<keyof VxeGridProps>,
  setup(props, context) {
    const table: any = createTable(props, context)
    defineExpose({
      table
    })
    return table.component
  },
})


