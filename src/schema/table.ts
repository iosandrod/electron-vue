import { base } from "./base"
import { resolveComponent, computed, h, reactive, shallowRef, useAttrs, VNodeProps, ComponentPropsOptions, toRef, watchEffect, isReactive, nextTick } from "vue"
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
import { StyleType, dialogConfig, dialogMap, pickKey, position, scrollConfig, tableConfig, tableData, tableSchema, tableState } from "@/types/schema"
import { column, createColumn } from "./column"
import { getOptionsCellClassName, getOptionsCheckboxConfig, getOptionsColumns, getOptionsData, getOptionsFilterConfig, getOptionsHeight, getOptionsRowClassName, getOptionsRowConfig, getOptionsScrollX, getOptionsScrollY, getOptionsShowFooter, getOptionsShowHeader, getOptionsTreeConfig, getTableRowConfig, getTableStyle } from "./tableFn"
import { closeDialog, createDialog, destroyDialog, dialog, openDialog } from "./dialog"
import { createDialogConfig } from "./tableDialogConfig"
import { tableMethod } from "./tableMethod"


export class table extends base<tableSchema> implements tableMethod {
  tableState: tableState = 'scan'
  isFocus: boolean = false
  columnWeakMap = new WeakMap()
  menuConfig = {
    headerMenu: {
      position: {
        left: 0,
        top: 0
      },
      show: false,
      list: [
        { context: '' }
      ]
    },
    bodyMenu: {
      position: {
        left: 0,
        top: 0
      },
      show: false,
      list: [
        {}
      ]
    }
  }
  scrollConfig: scrollConfig = {
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0
  }
  tableConfig: tableConfig = {
    showFilterDialog: true,
    showBodyMenuDialog: true,
    showHeaderMenuDialog: true,
    columns: [],//列
    filterConfig: [{ field: 'name', value: 'Test1' }],//过滤配置
    mergeConfig: [],//合并配置
    height: 'auto',
    limitSize: 100,
    rowConfig: {
      rowHeight: 30,//行高度
      background: 'red',
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
    // filterDialog: undefined,
    // headerMenuDialog: undefined,
    // bodyMenuDialog: undefined
  }
  // dialogConfig = createDialogConfig(this)  
  tableData: tableData = {
    showData: [],
    data: [],
    editData: [],
    curRow: undefined,
    curColumn: undefined,
    curFilterColumn: undefined
  }
  gridOptions: VxeGridProps = {}
  constructor(system: system, schema?: tableSchema, parent?: any) {
    //父级节点
    super(system, schema)
  }
  getTableKey() {
    throw new Error("Method not implemented.")
  }
  getTableKeyCode() {
    throw new Error("Method not implemented.")
  }
  getCurRow() {
    return this.tableData.curRow
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
  openBodyMenu(position: position) {
    this.menuConfig.bodyMenu.show = false
    nextTick(() => {
      this.menuConfig.bodyMenu.position = position
      this.menuConfig.bodyMenu.show = true
    })
  }
  openHeaderMenu(position: position) {
    this.menuConfig.headerMenu.show = false
    nextTick(() => {
      this.menuConfig.headerMenu.position = position
      this.menuConfig.headerMenu.show = true
    })
  }
  setTableEdit(editType: tableState) {
    if (['fullEdit', 'singleRowEdit', 'moreRowEdit', 'scan',].includes(editType)) {
      this.tableState = editType
    }
  }
  async initColumnFilter() {
    tableFn.initColumnFilter(this)
  }
  async initBodyMenuDialog() {
    tableFn.initBodyMenuDialog(this)
  }
  async initHeaderMenuDialog() {
    tableFn.initHeaderMenuDialog(this)
  }
  async scrollToPosition(left: any, top: any) {
    try {
      const vxeGrid = this.pageRef.vxeGrid as VxeGridInstance
      vxeGrid.scrollTo(left, top)
    } catch (error) {
      console.error('没有找到vxeGrid实例')
    }
  }
}

export function createTable(schema?: any, context?: any) {
  const system = {} as system
  const _table = reactive(new table(system, schema))
  _table.initTableConfig()
  return _table
}
/* 
*/