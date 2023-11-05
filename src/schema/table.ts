import { base } from "./base"
import { resolveComponent, computed, h, reactive, shallowRef, useAttrs, VNodeProps, ComponentPropsOptions } from "vue"
import {
  VxeFormPropTypes,
  VxeGridInstance,
  VxeGridPropTypes,
  VxeGridProps,
  VxeOptgroupProps,
  VxeOption,
  VxeTablePropTypes
} from "vxe-table"
import { system, _system } from "./system"
import { StyleType, tableConfig, tableData, tableSchema } from "@/types/schema"
import { column, createColumn } from "./column"
export class tableView extends base<tableSchema> {
  tableConfig: tableConfig = {
    columns: [],//列
    filterConfig: [{ field: 'name', value: 'Test1' }],//过滤配置
    mergeConfig: [],//合并配置
    rowConfig: {
      rowHeight: "30px"
    },
    headerConfig: {//表头配置
      rowHeight: "30px"
    }
  }
  tableData: tableData = {
    showData: [],
    data: []
  }
  gridOptions: any = {}
  constructor(system: system, schema?: tableSchema, parent?: any) {
    //父级节点
    super(system, schema)
    this.tableData.data = schema?.data || []
    this.tableData.showData = schema?.data?.map(v => v) || []
  }
  async initComponent() {
    super.initComponent()
    const _vNode = () => {
      const options = this.gridOptions
      const _this: any = this
      const vxeGrid = resolveComponent('vxe-grid')
      const vNode = h(
        "div",
        {
          style: _this.getTableStyle().value,
          class: ['h-full w-full']
        },
        [h(vxeGrid, { ...options })]
      )
      return vNode
    }
    this.component = _vNode
  }

  async initGridOptions() {
    this.gridOptions = this.getOptions()
  }
  getOptionsId() {
    return computed(() => { })
  }
  getOptionsData() {
    return computed(() => {
      const showData = this.tableData.showData
      const _data = showData.filter(row => {
        const filterConfig = this.tableConfig.filterConfig
        const status = filterConfig.reduce((res, item: any) => {
          if (res == false) {
            return res
          }
          const field = item.field
          const value = item.value
          const _value = row[field]
          if (_value == value) {
            res == false
          }
          return res
        }, true)
        return status
      })
      return _data
    })
  }
  getOptions() {
    const columns = this.getTableColumns().value.map((row: any) => {
      return row.renderColumn
    })
    const opt: VxeGridProps = {
      data: this.getOptionsData().value,
      treeConfig: this.getOptionsTreeConfig().value,
      columns: columns
    }
    return opt
  }
  getOptionsColumns() {
    return computed(() => { })
  }
  getOptionsTreeConfig() {
    return computed(() => {
      const treeConfig: VxeTablePropTypes.TreeConfig = {}
      return treeConfig
    })
  }
  getTableStyle() {
    return computed(() => {
      const style: StyleType = {}
      const baseStyle = super.getBaseStyle().value
      return { ...style, ...baseStyle }
    })
  }
  getTableColumns() {
    return computed(() => {
      const schema = this.schema
      const columns = schema?.columns || []
      const _columns = columns.map((col: any) => {
        const myCol = createColumn(col, this)
        return myCol
      })
      return _columns
    })
  }
}

export function createTable(schema?: any, context?: any) {
  const _table = reactive(new tableView(_system, schema))
  _table.initGridOptions()
  _table.initComponent()
  console.log(_table.component)
  return _table
}
