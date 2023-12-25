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
import { StyleType, dialogConfig, dialogMap, inputConfig, pickKey, position, scrollConfig, tableConfig, tableData, tableSchema, tableState } from "@/types/schema"
import { column, createColumn } from "./column"
import { getOptionsCellClassName, getOptionsFilterConfig, getOptionsHeight, getOptionsRowClassName, getOptionsRowConfig, getOptionsScrollX, getOptionsScrollY, getOptionsShowFooter, getOptionsShowHeader, getOptionsTreeConfig, getTableRowConfig, getTableStyle } from "./tableFn"
import { closeDialog, createDialog, destroyDialog, dialog, openDialog } from "./dialog"
import { createDialogConfig } from "./tableDialogConfig"
import { tableMethod } from "./tableMethod"
import { contextMenu } from "./businessTable/contextMenu"
import { mergeConfig } from "@/api/data4"
import { input } from "./input"
import lodash from 'lodash'
import { tableHeaderMenu, tableBodyMenu } from "./tableStaticData"


export class table extends base<tableSchema> implements tableMethod {
  tableState: tableState = 'scan'
  // tableState: tableState = 'scan'
  isFocus: boolean = false
  renderFilterTable: tableConfig = {
    columns: []
  }
  renderWhereInput: inputConfig = {}
  tablePermission = {
    canRefreshData: true,//能否刷新数据
    canChangeCurRow: true,//能否改变当前行数据
    canChangeCurColumn: true
  }
  editWeakMap = new Map()
  renderFilterColTable: tableConfig = {
    columns: []
  }
  pageRef: {
    globalInput?: input
    filterColTable?: table
    filterTable?: table
    vxeGrid?: VxeGridInstance,
    headerContext?: contextMenu,
    bodyContext?: contextMenu
  } = {}
  columnWeakMap = new WeakMap()
  mergeDivMap = new WeakMap()
  mergeDivColMap = new WeakMap()
  mergeColObj = {}
  menuConfig = {
    headerMenu: {
      // list: JSON.parse(JSON.stringify(tableHeaderMenu))
      list: lodash.cloneDeep(tableHeaderMenu)
    },
    bodyMenu: {
      list: lodash.cloneDeep(tableBodyMenu)
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
    globalWhereShow: false,
    showHeaderMenuDialog: true,
    columns: [],//列
    globalWhere: "",
    filterConfig: [],//过滤配置
    mergeConfig: {},//合并配置
    sortconfig: [],//处理排序
    height: 'auto',
    limitSize: 100,
    rowConfig: {
      rowHeight: 30,//行高度
      background: 'red',
      useKey: false
    },
    hiddenBorder: false,
    headerConfig: {//表头配置
      rowHeight: 35,//行高度
    },
    showHeaderFilter: true,
    showHeaderSort: true,
    showHeader: true,
    showCheckBoxColumn: true,//显示选择项
    columnConfig: { resizable: true },
    showSeqColumn: true,//显示数字项目
    checkLabelField: "",
    checkboxConfig: {
      range: true,
      checkAll: false,
      checkField: "checkboxField"
    },
    resizable: true,
    isTree: false,
    treeParentId: '',
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
    const permission = this.tablePermission.canChangeCurRow
    if (permission == false) {
      return
    }
    this.tableData.curRow = row
    let tableState = this.tableState
    if (tableState == 'moreRowEdit') {
      this.tableData.editData = [...new Set([...this.tableData.editData, row])]
    } else {
      this.tableData.editData.length && (this.tableData.editData = [])
    }
    await this.curRowChange()
  }
  async curRowChange() {
    const curRowChange = this.tableConfig.curRowChange
    if (typeof curRowChange == 'function') {
      await curRowChange({ row: this.tableData.curRow, table: this })
    }
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
  openBodyMenu($event: MouseEvent) {
    const bodyContext = this.pageRef.bodyContext!
    bodyContext.openContext($event)
  }
  openHeaderMenu($event: MouseEvent) {
    const headerContext = this.pageRef.headerContext!
    headerContext.openContext($event)
  }
  setTableEdit(editType: tableState) {
    if (['fullEdit', 'singleRowEdit', 'moreRowEdit', 'scan',].includes(editType)) {
      this.tableState = editType
    }
  }
  async scrollToPosition(left: any, top: any) {
    try {
      const vxeGrid = this.pageRef.vxeGrid as VxeGridInstance
      vxeGrid.scrollTo(left, top)
    } catch (error) {
      console.error('没有找到vxeGrid实例')
    }
  }
  openGlobalWhere() {
    const tableConfig = this.tableConfig
    tableConfig.globalWhereShow = true
  }
  closeGlobalWhere() {
    const tableConfig = this.tableConfig
    tableConfig.globalWhereShow = false
  }
  //设置合并配置
  async setMergeConfig(rows?: any[], cols?: any[]) {//行 
    if (Object.keys(this.tableConfig.mergeConfig!).length > 0) {
      this.tableConfig.mergeConfig = {} as any
    } else {
      const _mergeConfig = mergeConfig
      const showData = this.tableData.data
      const _mergeConfig1 = _mergeConfig.map(row => {
        const rowArr = row.rowArr
        const start = rowArr[0]
        const end = rowArr[1] + rowArr[0]
        const _rowArr = showData.slice(start, end)
        const colArr = row.colArr
        return {
          rowArr: _rowArr,
          colArr: colArr
        }
      })
      let result: any = {}
      let _obj = this.gridOptions.columns?.map(col => col.field!).map((field: string) => {
        result[field] = { rowArr: [] }
        let _obj1 = result[field]
        let testMerge = _mergeConfig1
        testMerge.forEach(merge => {
          let colArr = merge.colArr
          if (colArr.includes(field)) {
            _obj1.rowArr.push(merge.rowArr)
          }
        })
        return _obj1
      })
      this.tableConfig.mergeConfig = result as any
    }
  }
  //获取选择配置
  getCheckBoxRecord() {
    const vxeGrid = this.pageRef.vxeGrid
    const checkArr = vxeGrid?.getCheckboxRecords()
    return checkArr
  }
  setCheckBoxRecord(rowArr: any[]) {
    const vxeGrid = this.pageRef.vxeGrid
    if (!Array.isArray(rowArr) || rowArr.length == 0) {
      vxeGrid?.clearCheckboxRow()
      return
    }
    vxeGrid?.setCheckboxRow(rowArr, true)
  }
  toggleCheckboxRow(row: any) {
    const vxeGrid = this.pageRef.vxeGrid
    vxeGrid?.toggleCheckboxRow(row)
  }
  changeColumnEditType(field: string, type: string) {
    let targetCol = this.tableConfig.columns.find(col => {
      return col.columnConfig?.field == field
    })
    if (targetCol) {
      // targetCol.columnConfig.options = [{ key: '1', value: '3' }]
      targetCol!.columnConfig!.editType! = type
    }
  }
  async autoRefreshData() {
    const effectPool = this.effectPool
    const table = this
    effectPool.refreDataEffect = watchEffect(() => {
      let showData = table.tableData.data
      const filterConfig = table.tableConfig.filterConfig!
      let arrayFilterConfig = filterConfig.filter(item => item.filterType == 'array')
      const _data = showData.filter((row: any, i, arr) => {
        let state = true
        for (const config of arrayFilterConfig) {
          let field = config.field!
          let filterArr = config.filterData || []
          if (filterArr.length == 0 || state == false) {
            continue
          }
          let _value: any = row[field]
          //@ts-ignore
          if (!filterArr.includes(_value)) {
            state = false
          }
        }
        return state
      })
      //使用loadData获取好像更好一些
      const _data1 = _data.slice(0)
      table.tableData.showData = _data1
      nextTick(async () => {
        const vxeGrid = table.pageRef.vxeGrid
        let canRefreshData = table.tablePermission.canRefreshData
        if (canRefreshData == true) {
          table.tablePermission.canRefreshData = false
          //使用节流处理
          setTimeout(() => {
            try {
              let showData = this.tableData.showData
              console.log('run refreshData')
              vxeGrid?.reloadData(showData).then(res => {
                const scrollConfig = table.scrollConfig
                const scrollTop = scrollConfig.scrollTop
                const scrollLeft = scrollConfig.scrollLeft
                vxeGrid.scrollTo(scrollLeft, scrollTop)
                table.tablePermission.canRefreshData = true
              })
            } catch (error) {
              table.tablePermission.canRefreshData = true
            }
          }, 100);
        }
      })
    })
  }
}

export function createTable(schema?: any, context?: any) {
  const system = systemInstance
  const _table = reactive(new table(system, schema))
  _table.initTableConfig()
  return _table
}
/* 
*/

