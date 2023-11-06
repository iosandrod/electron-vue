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
  VxeTableInstance
} from "vxe-table"
import { system, _system } from "./system"
import { StyleType, pickKey, tableConfig, tableData, tableSchema } from "@/types/schema"
import { column, createColumn } from "./column"
import { getOptionsCellClassName, getOptionsColumns, getOptionsData, getOptionsFilterConfig, getOptionsRowClassName, getOptionsRowConfig, getOptionsScrollX, getOptionsScrollY, getOptionsTreeConfig, getTableRowConfig, getTableStyle } from "./tableFn"
import { getRenderFn } from "./columnFn"
import { } from 'rxjs'
export class tableView extends base<tableSchema> {
  tableConfig: tableConfig = {
    columns: [],//列
    filterConfig: [{ field: 'name', value: 'Test1' }],//过滤配置
    mergeConfig: [],//合并配置
    rowConfig: {
      rowHeight: "30px",//行高度
      currentEditRow: []//当前编辑的行配置
    },
    headerConfig: {//表头配置
      rowHeight: "30px"//行高度
    }
  }
  propsTableConfig: pickKey<tableConfig> = {
  }
  tableData: tableData = {
    showData: [],
    data: [],
    curRow: null,
    curColumn: null
  }
  gridOptions: any = {}
  constructor(system: system, schema?: tableSchema, parent?: any) {
    //父级节点
    super(system, schema)
  }
  initTableConfig() {
    const schema: tableSchema = this.schema as any
    if (schema != null && Object.keys(schema).length > 0) {
      // this.effectPool.tableConfigEffect = watchEffect(() => {

      // })
      Object.keys(schema).forEach(key => {
        this.effectPool[`table${key}Effect`] = watchEffect(() => {
          const tableData = this.tableData
          const _tableConfig = this.tableConfig as any
          if (['data'].includes(key)) {
            tableData.data = schema['data'] as any || []
            tableData.showData = schema['data'] as any || []
          } else {
            const value = schema[key]
            if (value != null) {
              _tableConfig[key] = schema[key]
            }
          }
        })
      })
    }
    //最后才会初始化Component
    this.initGridOptions()
    this.initComponent()
  }
  async initComponent() {
    const _this = this
    const _vNode = () => {
      const options = this.gridOptions
      const vxeGrid = resolveComponent('vxe-grid')
      const outSizeDiv = getRenderFn('div', { style: getTableStyle(this).value, class: ['f-full', 'w-full'] })
      const vxeGridCom = h(vxeGrid, {
        ...options, ref: 'vxeGrid', onCellClick: ({ row, column }: any) => {
          _this.setCurRow(row)
          _this.setCurColumn(column)
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
    const gridOptions = this.gridOptions as VxeGridProps
    gridOptions.columns = getOptionsColumns(this) as any
    gridOptions.data = getOptionsData(this) as any
    gridOptions.treeConfig = getOptionsTreeConfig(this) as any
    gridOptions.scrollX = getOptionsScrollX(this) as any
    gridOptions.scrollY = getOptionsScrollY(this) as any
    gridOptions.rowConfig = getOptionsRowConfig(this) as any
    gridOptions.rowClassName = getOptionsRowClassName(this) as any
    gridOptions.cellClassName = getOptionsCellClassName(this) as any
    gridOptions.filterConfig = getOptionsFilterConfig(this) as any
  }
  async setCurRow(row: any) {//设置当前行
    this.tableData.curRow = row
  }
  async setCurColumn(col: any) {
    this.tableData.curColumn = col
  }
  async openColumnFilter(field: string) {
    const vxeGrid = this.pageRef.vxeGrid as VxeTableInstance
    // console.log(this.gridOptions)
    console.log(vxeGrid, vxeGrid.openFilter)
  }
}

export function createTable(schema?: any, context?: any) {
  const _table = reactive(new tableView(_system, schema))
  _table.initTableConfig()
  return _table
}
