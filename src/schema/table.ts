import { base } from "./base"
import { resolveComponent, computed, h, reactive, shallowRef, useAttrs, VNodeProps, ComponentPropsOptions, toRef, watchEffect, isReactive } from "vue"
import {
  VxeFormPropTypes,
  VxeGridInstance,
  VxeGridPropTypes,
  VxeGridProps,
  VxeOptgroupProps,
  VxeOption,
  VxeTablePropTypes,
  VxeTableInstance,
  VxeTableDefines
} from "vxe-table"
import * as tableFn from './tableFn'
import { system, systemInstance } from "./system"
import { StyleType, dialogConfig, dialogMap, pickKey, position, tableConfig, tableData, tableSchema, tableState } from "@/types/schema"
import { column, createColumn } from "./column"
import { getOptionsCellClassName, getOptionsCheckboxConfig, getOptionsColumns, getOptionsData, getOptionsFilterConfig, getOptionsHeight, getOptionsRowClassName, getOptionsRowConfig, getOptionsScrollX, getOptionsScrollY, getOptionsShowFooter, getOptionsShowHeader, getOptionsTreeConfig, getTableRowConfig, getTableStyle } from "./tableFn"
import { getRenderFn } from "./columnFn"
import { } from 'rxjs'
import { closeDialog, createDialog, destroyDialog, dialog, openDialog } from "./dialog"
import { getDialogMaskHidden, tranPositionNumber } from "@/utils/utils"
import { dialogPool } from "./dialog"
import { createDialogConfig } from "./tableDialogConfig"
export class table extends base<tableSchema> {
  tableState: tableState = 'fullEdit'
  columnWeakMap = new WeakMap()
  tableConfig: tableConfig = {
    showFilterDialog: true,
    showBodyMenuDialog: false,
    showHeaderMenuDialog: false,
    columns: [],//列
    filterConfig: [{ field: 'name', value: 'Test1' }],//过滤配置
    mergeConfig: [],//合并配置
    height: 'auto',
    rowConfig: {
      rowHeight: 30,//行高度
      background: 'red',
      currentEditRow: []//当前编辑的行配置
    },
    hiddenBorder: false,
    headerConfig: {//表头配置
      rowHeight: "30px",//行高度
    },
    showHeaderFilter: true,
    showHeaderSort: true,
    showHeader: true,
    showCheckBoxColumn: true,//显示选择项
    columnConfig: { resizable: true },
    showSeqColumn: true,//显示数字项目
    checkboxConfig: {
      range: true,
      checkAll: false,
      checkField: "checkboxField"
    },
    resizable: true,
    onCellClick: () => { }
  }
  searchConfig = {
    searchString: '',
    filterConfig: []
  }
  dialogMap: dialogMap = {
    filterDialog: undefined,
    headerMenuDialog: undefined,
    bodyMenuDialog: undefined
  }
  dialogConfig = createDialogConfig(this)
  tableData: tableData = {
    showData: [],
    data: [],
    editData: [],
    curRow: undefined,
    curColumn: undefined,
    curFilterColumn: undefined
  }
  gridOptions: any = {}
  constructor(system: system, schema?: tableSchema, parent?: any) {
    //父级节点
    super(system, schema)
  }
  initTableConfig() {
    tableFn.initTableConfig(this)
  }
  async initGridOptions() {
    tableFn.initGridOptions(this)
  }
  async setCurRow(row: any) {//设置当前行
    this.tableData.curRow = row
  }
  async setCurColumn(col: any) {
    const params = col?.params
    if (params instanceof column) {
      this.tableData.curColumn = params
    } else if (col instanceof column) {
      this.tableData.curColumn = col
    }
  }
  openDialog(key: string, position?: position) {
    openDialog({ key: key, position: position })
  }
  closeDialog(key: string) {
    closeDialog(key)
  }
  destroyDialog(key: string) {
    destroyDialog(key)
    const dialogMap: any = this.dialogMap
    const _key = Object.entries(dialogMap).find(([key1, value]) => {
      return value == key
    })?.[0]
    if (_key != null) {
      dialogMap[_key!] = null
    }
  }
  async initColumnFilter() {
    tableFn.initColumnFilter(this)
  }
  async initBodyMenuDialog() {
    // const bodyMenuDialogConfig = this.bodyMenuDialogConfig
    // const dialog = createDialog(bodyMenuDialogConfig.props, bodyMenuDialogConfig.context, bodyMenuDialogConfig.dialogName)
    // this.bodyMenuDialog = dialog as any
  }
  async initHeaderMenuDialog() {
    // const headerMenuDialog = this.bodyMenuDialogConfig
    // const dialog = createDialog(headerMenuDialog.props, headerMenuDialog.context, headerMenuDialog.dialogName)
    // this.headerMenuDialog = dialog as any
  }
  async filterFirstData() {
    this.tableData.data = this.tableData.data.filter((row, i) => {
      return i < 3
    })
  }
}

export function createTable(schema?: any, context?: any) {
  // const system = systemInstance
  const system = {} as system
  const _table = reactive(new table(system, schema))
  _table.initTableConfig()
  return _table
}
