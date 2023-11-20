import { computed, h, reactive, toRef } from "vue"
import { base } from "./base"
import { systemInstance, system } from "./system"
import { VxeColumnProps, VxeGridPropTypes, VxeColumn, VxeGridProps, VxeTableDefines } from "vxe-table"
import { StyleType, columnConfig, formItemConfig, pickRef } from "@/types/schema"
import { isUndefined } from "xe-utils"
import { table } from "./table"
import * as columnFn from './columnFn'
import { getColumnAlign, getColumnField, getColumnResizable, getColumnSlot, getColumnTitle, getColumnType, getColumnVisiable, getColumnWidth, getInSizeDiv, getOutSizeDiv, getSlotDefault } from "./columnFn"

export class column extends base<VxeTableDefines.ColumnOptions> {
  columnConfig: VxeTableDefines.ColumnOptions & columnConfig = {
    isEdit: false,
    type: 'string' as any,
    showFilter: true,//显示filter
    showSort: true,
    resizable: true,
    roundType: {//小数点后面的位数
      iRoundAmout: 2,
      iRoundInt: 0,
      iRoundInvRate: 6,
      iRoundNorQty: 3,
      iRoundNum: 0,
      iRoundPersent: 6,
      iRoundQty: 4,
      iRoundUnitPrice: 2,
    },
    width: 100,
    filterPulldownShow: false,
  } //渲染组件配置
  table?: table
  filterConfig = {
  }
  sortConfig = {}
  renderColumn: pickRef<VxeTableDefines.ColumnOptions> = {
  }
  renderFormitem: formItemConfig = {} as any
  constructor(system: system, schema?: any, table?: table) {
    super(system, schema)
    this.table = table
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
