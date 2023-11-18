import { VNode, defineExpose, defineComponent, h, onMounted, resolveComponent, reactive } from "vue"
import { createTable, table } from "../table"
import { createEntityTable } from "../entityTable"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid } from 'vxe-table'
import { getRenderFn } from "../columnFn"
import { getTableStyle } from "../tableFn"
import { destroyDialog } from "../dialog"
import { getMouseEventPosition } from "@/utils/utils"
export default defineComponent({
  props: ['tableInstance', 'resizable', 'onCellMenu', 'showHeaderFilter', 'onCellClick', 'onCellDblclick', 'showSeqColumn', 'hiddenBorder', 'showHeader', 'height', 'showCheckBoxColumn', 'align', 'animat', 'columns', 'columnConfig', 'data', 'showFilterDialog', 'showHeaderMenuDialog', 'showBodyMenuDialog'] as Array<keyof VxeGridProps>,
  setup(props, context) {
    const _props: any = props
    const tableInstance = _props.tableInstance
    let table: any = null
    if (tableInstance == null) {
      table = createTable(props, context)
    } else {
      table = tableInstance
    }
    defineExpose({
      table
    })
    return table.component
    // return () => {
    //   const options = table.gridOptions
    //   const vxeGrid = resolveComponent('vxe-grid')
    //   // return h('div', {}, [h(vxeGrid, options)])
    //   const _class = ['h-full', 'w-full']
    //   _class.push('grid-border-none')
    //   const outSizeDiv = getRenderFn('div',
    //     {
    //       style: getTableStyle(table).value, class: _class
    //     },
    //     [[{
    //       mounted() { }, unmounted() {
    //         const dialogMap = table.dialogMap
    //         Object.values(dialogMap).forEach((value: any) => {
    //           destroyDialog(value)
    //         })
    //         console.log('unmounted')
    //         const effectPool = table.effectPool
    //         Object.values(effectPool).forEach((effect: any) => {
    //           if (effect) {
    //             effect()
    //           }
    //         })
    //         // destroyDialog(filterDialog!)
    //       }
    //     }]]
    //   )
    //   const vxeGridCom = h(vxeGrid, {
    //     ...options, ref: 'vxeGrid',
    //     onCellClick: ({ row, column }: any) => {
    //       _this.setCurRow(row)
    //       _this.setCurColumn(column)
    //       const tableConfig = _this.tableConfig
    //       const onCellClick = tableConfig.onCellClick
    //       if (typeof onCellClick == 'function') {
    //         onCellClick({ row, column } as any)
    //       }
    //     },
    //     onCellMenu: (params: any) => {
    //       const { row, column, $event } = params
    //       const position = getMouseEventPosition($event)
    //       const tableConfig = _this.tableConfig
    //       // table.openBodyMenu(position)
    //       const onCellMenu = tableConfig.onCellMenu
    //       if (typeof onCellMenu == 'function') {
    //         onCellMenu({ row, column } as any)
    //       }
    //     }
    //   })
    //   const vxeGridDiv = getRenderFn(vxeGridCom, {}, [[{
    //     mounted: (el, node) => {
    //       const instance = node.instance
    //       table.pageRef.vxeGrid = instance?.$refs.vxeGrid
    //     },
    //     unmounted: () => {
    //       table.pageRef.vxeGrid = null
    //     }
    //   }]])
    //   const inSizeGrid = outSizeDiv(vxeGridDiv())
    //   return inSizeGrid
    // }
  },
})


