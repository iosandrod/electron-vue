import { computed, h, reactive, toRef } from "vue"
import { base } from "./base"
import { _system, system } from "./system"
import { VxeColumnProps, VxeGridPropTypes, VxeColumn, VxeGridProps, VxeTableDefines } from "vxe-table"
import { StyleType, columnConfig, pickRef } from "@/types/schema"
import { isUndefined } from "xe-utils"
import { tableView } from "./table"
import { getColumnField, getColumnSlot, getColumnType, getColumnVisiable, getColumnWidth, getInSizeDiv, getOutSizeDiv, getSlotDefault } from "./columnFn"

export class column extends base<VxeTableDefines.ColumnOptions> {
  // columnConfig: pickRef<VxeTableDefines.ColumnOptions & columnConfig> = {
  columnConfig: pickRef<VxeTableDefines.ColumnOptions & columnConfig> = {
    isEdit: false,
    field: "",
    width: 200,
    type: 'string' as any,
    columnHeight: '60px'//行的高度
  } //渲染组件配置
  table?: tableView
  filterConfig = {}
  sortConfig = {}
  renderColumn: pickRef<VxeTableDefines.ColumnOptions> = {
    // slots: {},
  }
  constructor(system: system, schema?: any, table?: tableView) {
    super(system, schema)
    this.table = table
    Object.keys(schema).forEach((key) => {
      const columnConfig = this.columnConfig as any
      columnConfig[key] = toRef(schema, key)
    })
  }
  async initColumnConfig() {
    let renderColumn = this.renderColumn
    renderColumn.params = this
    renderColumn.slots = getColumnSlot(this)
    renderColumn.visible = getColumnVisiable(this)
    renderColumn.field = getColumnField(this)
    renderColumn.type = getColumnType(this) as any
    renderColumn.width = getColumnWidth(this) as any
  }
  async initComponent(): Promise<void> { }
  // getSlotDefault() {
  //   return computed(() => {
  //     const columnConfig = this.columnConfig
  //     const type = columnConfig.type as string
  //     const fn = ({ row, rowIndex, column }: any) => {
  //       const outSizeDiv = getOutSizeDiv(this, row)
  //       return outSizeDiv
  //     }
  //     return fn
  //   })
  // }
  getSlotEdit() {
    return computed(() => {
      const fn = ({ row, rowIndex }) => {
        return h("div", {}, ["123"])
      }
      return fn
    })
  }
  changeColumnType(type: any) {
    this.columnConfig.type = type
  }
}

export function createColumn(schema?: any, table?: any) {
  const system = _system
  const _column = reactive(new column(system, schema, table))
  _column.initColumnConfig()
  return _column
}
