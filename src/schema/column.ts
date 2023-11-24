import { computed, h, reactive, toRef } from "vue"
import { base } from "./base"
import { systemInstance, system } from "./system"
import { VxeColumnProps, VxeGridPropTypes, VxeColumn, VxeGridProps, VxeTableDefines } from "vxe-table"
import { StyleType, columnConfig, formItemConfig, pickRef } from "@/types/schema"
import { isUndefined } from "xe-utils"
import { table } from "./table"
import * as columnFn from './columnFn'
import { getColumnAlign, getColumnField, getColumnResizable, getColumnSlot, getColumnTitle, getColumnType, getColumnVisiable, getColumnWidth, getInSizeDiv, getOutSizeDiv, getSlotDefault } from "./columnFn"
import XEUtils from "xe-utils"
import * as dateFns from 'date-fns'
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
    filterOptions: []
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
  resetFilterOptions() {
    const table = this.table!
    const data = table.gridOptions.data
    let columnConfig = this.columnConfig
    let field = columnConfig.field
    let type = columnConfig.type!

  }
}
const formats = { datetime: 'yyyy-MM-dd HH:mm:ss', date: 'yyyy-MM-dd', time: 'HH:mm:ss' };
export const filterFormat = {
  date: (column: column, data: []) => {
    let _data = data.map((row: any) => {
      let _row: any = null
      try {
        _row = dateFns.parse(row, formats.date, new Date())
      } catch (error) {

      }
      return _row
    })
    return _data
  },
  datetime: (column: column, data: []) => {
    let _data = data.map((row: any) => {
      let _row: any = null
      try {
        _row = dateFns.parse(row, formats.datetime, new Date())
      } catch (error) {

      }
      return _row
    })
    return _data

  },
  time: (column: column, data: []) => {
    let _data = [...new Set(data.map((row: any) => {
      let _row: any = ''
      try {
        _row = dateFns.parse(row, formats.time, new Date())
      } catch (error) {

      }
      return _row
    }))]
    return _data
  },
  string: (column: column, data: []) => {

  },
  bool: (column: column, data: []) => {

  },
  number: (column: column, data: []) => {

  },
}


export function createColumn(schema: any, table: any) {
  const system = systemInstance
  const _column = reactive(new column(system, schema, table))
  _column.initColumnConfig()
  return _column
}


