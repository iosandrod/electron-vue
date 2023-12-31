import { VNode, ref, defineExpose, defineComponent, h, onMounted, resolveComponent, reactive, computed } from "vue"
import { createTable, table } from "../table"
import { createEntityTable } from "../entityTable"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid } from 'vxe-table'
import { getRenderFn } from "../columnFn"
import { getTableStyle } from "../tableFn"
import { destroyDialog } from "../dialog"
import { getMouseEventPosition } from "@/utils/utils"
export default defineComponent({
  props: ['tableInstance', 'resizable', 'scrollX', 'scrollY', 'onCellMenu', 'showHeaderFilter', 'onCellClick', 'onCellDblclick', 'showSeqColumn', 'hiddenBorder', 'showHeader', 'height', 'showCheckBoxColumn', 'align', 'animat', 'columns', 'columnConfig', 'data', 'showFilterDialog', 'showHeaderMenuDialog', 'showBodyMenuDialog'] as Array<keyof VxeGridProps>,
  setup(props, context) {
    const _props: any = props
    const tableInstance = _props.tableInstance
    let table: any = null
    if (tableInstance == null) {
      table = ref(createTable(props, context))
    } else {
      table = computed(() => {
        return _props.tableInstance
      })
    }
    return { table: table.value }
  },
  render() {
    const table = this.table
    const component = table.component
    if (component) {
      return component()
    }
    return null
  }
})


