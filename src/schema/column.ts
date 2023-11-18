import { computed, h, reactive, toRef } from "vue"
import { base } from "./base"
import { systemInstance, system } from "./system"
import { VxeColumnProps, VxeGridPropTypes, VxeColumn, VxeGridProps, VxeTableDefines } from "vxe-table"
import { StyleType, columnConfig, pickRef } from "@/types/schema"
import { isUndefined } from "xe-utils"
import { table } from "./table"
import * as columnFn from './columnFn'
import { getColumnAlign, getColumnField, getColumnResizable, getColumnSlot, getColumnTitle, getColumnType, getColumnVisiable, getColumnWidth, getInSizeDiv, getOutSizeDiv, getSlotDefault } from "./columnFn"

export class column extends base<VxeTableDefines.ColumnOptions> {
  columnConfig: pickRef<VxeTableDefines.ColumnOptions & columnConfig> = {
    isEdit: false,
    type: 'string' as any,
    showFilter: true,
    showSort: true,
    resizable: true,
    width: 100
  } //渲染组件配置
  table?: table
  filterConfig = {
  }
  sortConfig = {}
  renderColumn: pickRef<VxeTableDefines.ColumnOptions> = {
  }
  constructor(system: system, schema?: any, table?: table) {
    super(system, schema)
    this.table = table
    // Object.keys(schema).forEach((key) => {
    //   const columnConfig = this.columnConfig as any
    //   columnConfig[key] = toRef(schema, key)
    // })
  }
  async initColumnConfig() {
    columnFn.initColumnConfig(this)
  }
  async initComponent(): Promise<void> { }
  changeColumnType(type: any) {
    this.columnConfig.type = type
  }
}

export function createColumn(schema: any, table: any) {
  const system = systemInstance
  const _column = reactive(new column(system, schema, table))
  _column.initColumnConfig()
  return _column
}
