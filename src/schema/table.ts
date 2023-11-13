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
import { StyleType, dialogConfig, pickKey, position, tableConfig, tableData, tableSchema } from "@/types/schema"
import { column, createColumn } from "./column"
import { getOptionsCellClassName, getOptionsCheckboxConfig, getOptionsColumns, getOptionsData, getOptionsFilterConfig, getOptionsHeight, getOptionsRowClassName, getOptionsRowConfig, getOptionsScrollX, getOptionsScrollY, getOptionsShowFooter, getOptionsShowHeader, getOptionsTreeConfig, getTableRowConfig, getTableStyle } from "./tableFn"
import { getRenderFn } from "./columnFn"
import { } from 'rxjs'
import { createDialog, dialog } from "./dialog"
import { getDialogMaskHidden, tranPositionNumber } from "@/utils/utils"
export class table extends base<tableSchema> {
  tableConfig: tableConfig = {
    columns: [],//列
    filterConfig: [{ field: 'name', value: 'Test1' }],//过滤配置
    mergeConfig: [],//合并配置
    height: '400px',
    rowConfig: {
      rowHeight: "30px",//行高度
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
    showSeqColumn: true,//显示数字项目
    checkboxConfig: {
      range: true,
      checkAll: false,
      checkField: "checkboxField"
    },
    resizable: true,
    onCellClick: () => { }
  }
  filterDialog?: dialog
  headerMenuDialog?: dialog
  bodyMenuDialog?: dialog
  filterDialogConfig = {
    props: {
      onShow: getDialogMaskHidden((params: any) => { }),
      onHide: (params) => { },
      showHeader: false,
      position: { top: '0px', left: '0px' } as any,
      lockView: false,
      type: "modal",
      height: '300px', width: '150px', mask: false,
      modelValue: false,
      modalData: {
        table: this, tableConfig: {
          data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
          ], columns: [
            { field: 'name', title: '', width: 100, showHeader: false }],
          showHeader: true,
        } as pickKey<tableConfig>,
      }
    } as dialogConfig, context: {}, dialogName: 'columnFilter'
  }
  bodyMenuDialogConfig = {
    props: {
      onShow: getDialogMaskHidden((params: any) => { }),
      onHide: (params) => { },
      showHeader: false,
      position: { top: '0px', left: '0px' } as any,
      lockView: false,
      type: "modal",
      height: '300px', width: '150px', mask: false,
      modelValue: false,
      modalData: {
        table: this, tableConfig: {
          onCellClick: () => {
            console.log('cellClick')
          },
          onCellDblclick: () => {
            console.log('cellDbClick')
          },
          data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
          ], columns: [
            { field: 'name', title: '', width: 100, showHeader: false }],
          showHeader: true,
        } as pickKey<tableConfig>,
      }
    } as dialogConfig, context: {}, dialogName: 'tableMenu'
  }
  headerMenuDialogConfig = {
    props: {
      onShow: getDialogMaskHidden((params: any) => { }),
      onHide: (params) => { },
      showHeader: false,
      position: { top: '0px', left: '0px' } as any,
      lockView: false,
      type: "modal",
      height: '300px', width: '150px', mask: false,
      modelValue: false,
      modalData: {
        table: this, tableConfig: {
          data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
          ], columns: [
            { field: 'name', title: '', width: 100, showHeader: false }],
          showHeader: true,
        } as pickKey<tableConfig>,
      }
    } as dialogConfig, context: {}, dialogName: 'tableMenu'
  }
  tableData: tableData = {
    showData: [],
    data: [],
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
    const schema: tableSchema = this.schema as any
    if (schema != null && Object.keys(schema).length > 0) {
      Object.keys(schema).forEach(key => {
        const _value = schema[key]
        if (_value != null) {
          this.effectPool[`table${key}Effect`] = watchEffect(() => {
            const tableData = this.tableData
            const _tableConfig = this.tableConfig as any
            if (['data'].includes(key)) {
              tableData.data = schema['data'] as any || []
              tableData.showData = schema['data'] as any || []
            } else {
              _tableConfig[key] = schema[key]
            }
          })
        }
      })
    }
    //最后才会初始化Component
    this.initGridOptions()
    this.initColumnFilter()
    this.initComponent()
  }
  async initComponent() {
    const _this = this
    const _vNode = () => {
      const options = this.gridOptions
      const vxeGrid = resolveComponent('vxe-grid')
      const _class = ['h-full', 'w-full']
      _class.push('grid-border-none')
      const outSizeDiv = getRenderFn('div', {
        style: getTableStyle(this).value, class: _class
      })
      const vxeGridCom = h(vxeGrid, {
        ...options, ref: 'vxeGrid',
        onCellClick: ({ row, column }: any) => {
          _this.setCurRow(row)
          _this.setCurColumn(column)
          const tableConfig = _this.tableConfig
          const onCellClick = tableConfig.onCellClick
          if (typeof onCellClick == 'function') {
            onCellClick({ row, column } as any)
          }
        },
        onCellMenu: ({ row, column }: any) => {
          const tableConfig = _this.tableConfig
          const onCellMenu = tableConfig.onCellMenu
          if (typeof onCellMenu == 'function') {
            onCellMenu({ row, column } as any)
          }
        }
      })
      const vxeGridDiv = getRenderFn(vxeGridCom, {}, [[{
        mounted: (el, node) => {
          const instance = node.instance
          this.pageRef.vxeGrid = instance?.$refs.vxeGrid
        },
        unmounted: () => {
          this.pageRef.vxeGrid = null
        }
      }]])
      const inSizeGrid = outSizeDiv(vxeGridDiv())
      return inSizeGrid
    }
    this.component = _vNode
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
  async openBodyMenu() {

  }
  async openHeaderMenu() { }
  async openColumnFilter(field: string, position?: position) {
    tableFn.openColumnFilter(this, field, position)
  }
  async closeColumnFilter() {
    this.filterDialog && this.filterDialog.close()
  }
  async initColumnFilter() {
    const filterDialogConfig = this.filterDialogConfig
    const dialog = createDialog(filterDialogConfig.props as any, filterDialogConfig.context, filterDialogConfig.dialogName)//使用这个模态框
    this.filterDialog = dialog as any
  }
  async initBodyMenuDialog() {
    const bodyMenuDialogConfig = this.bodyMenuDialogConfig
    const dialog = createDialog(bodyMenuDialogConfig.props, bodyMenuDialogConfig.context, bodyMenuDialogConfig.dialogName)
    this.bodyMenuDialog = dialog as any
  }
  async initHeaderMenuDialog() {
    const headerMenuDialog = this.bodyMenuDialogConfig
    const dialog = createDialog(headerMenuDialog.props, headerMenuDialog.context, headerMenuDialog.dialogName)
    this.headerMenuDialog = dialog as any
  }
  async filterFirstData() {
    this.tableData.data = this.tableData.data.filter((row, i) => {
      return i < 3
    })
  }
}

export function createTable(schema?: any, context?: any) {
  const _table = reactive(new table(systemInstance, schema))
  _table.initTableConfig()
  return _table
}
