import { Subject } from "rxjs"
import { reactive, h, computed } from "vue"
import { base } from "../base"
import { pageTree } from "./pageTree"
import layoutGridView from "../schemaComponent/layoutGridView"
import { http } from "../http"
import { tableMethod } from "../tableMethod"
import { table } from "../table"
import { getTableData } from "@/api/httpApi"
import { tableData } from "@/api/data"
import { layoutConfig, tableConfig } from "@/types/schema"
import { entityColumn } from "../entityColumn"
export class basicEntity extends base implements tableMethod {//其实他也是一个组件
  sub = new Subject()//动作发射器
  http = http
  layoutConfig: layoutConfig = {
    isDraggable: false,
    isResizable: false,
    useCssTransform: true,
    verticalCompact: true
  }
  entityName = ''
  pageRef: {
    vxeGrid: table
  } = {
      vxeGrid: {} as table
    }
  entityConfig = {
    wheres: [],//query
    entityName: '',
  }
  pageConfig: any = {}
  tableInfo?: any = {}//远程获取的数据
  pageTree?: pageTree//页面树
  renderLayout: layoutConfig = {}
  nodeArr: [] = []
  renderTableInfo: any = {}
  util: any
  tableData = {
    data: []
  }
  curRowChange: any
  constructor(schema: any, system: any) {
    super(schema, system)
  }
  async initEntity() {
    await this.initNode()
  }
  initComponent() {
    const vNode = () => {
      let pageTree = this.pageTree
      return h(layoutGridView, { pageTree: pageTree })
    }
    this.component = vNode
  }
  initPageTree() {
    const entityConfig = this.schema
  }
  async initNode() {

  }
  async initRenderTableInfo() {
    const renderTableInfo = this.renderTableInfo() as tableConfig
    renderTableInfo.columns = computed(() => {
      const columns: [] = this.tableInfo.columns || []
      const _columns = columns.map((col: any) => {
        let _col = new entityColumn()
        _col.initColumn(col)
        return _col
      })
      return _columns
    }) as any
    renderTableInfo.data = computed(() => {
      return this.tableData.data
    }) as any
  }
  async getPageData() {//获取页面数据,与实体相关的
    try {
      this.setPageLoading(true)
      let curRow = this.getCurRow()
      let { url, params } = await this.util.httpServe.getPageData(this)
      let otherParams = {}
      await this.getRunBefore('getTableData', params, url, otherParams)
      let { params: newParams, url: newUrl } = otherParams as any
      params = newParams || params
      url = newUrl || url
      await this.setDataPermission(params)
      const data = tableData
      this.tableData.data = data as any
      // const { status, msg, dtMain: rows, total, data } =
      //   let _rows = rows
      //   let _total = total
      //   if (_rows == null) {
      //     _rows = data
      //   }
      //   if (_total == null) {
      //     _total = data?.length || 0
      //   }
      //   this.tableData.data = _rows
      //   // this.tableData.showData = _rows
      //   let _showData = this.sortTableData(_rows)
      //   this.tableData.data = _showData
      //   let _showData1 = _showData
      //   _showData1 = this.filterGlobalWhere(_showData1) //根据全局条件进行过滤，在显示查找面板里找到符合条件的数据
      //   _showData1 = this.filterColumnWhere(_showData1) //根据显示查找面板里已经过滤完毕的数据，再到每个单独列的条件进一步过滤符合要求数据
      //   this.tableData.showData = _showData1 //在视图层渲染
      //   // this.tableData.showData = this.sortTableData(_rows)
      //   await this.getRunAfter('getTableData', _rows, _total) //调用执行后的函数
      //   this.setPageLoading(false) //关闭加载动画效果
      //   if (this.curRowChange) {
      //     //判断当前表是否有该属性函数，如果有就调用
      //     this.curRowChange.call(this, curRow, true) //获取当前行的数据
      //   }
      //   return _showData1
    } catch (error) {
      //   console.error(error, 'testError')
      //   this.setGetTableDataPermission(true)
      //   this.setPageLoading(false)
    }
  }
  setPageLoading(arg0: boolean) {
    throw new Error("Method not implemented.")
  }
  getCurRow() {
    const table = this.pageRef.vxeGrid!
    return table.getCurRow()
  }
  async getRunBefore(arg0: string, params: any, url: any, otherParams: {}) {
  }
  async getRunAfter(arg0: string, _rows: any, _total: any) {
  }
  setDataPermission(params: any) {
    // throw new Error("Method not implemented.")
  }
  sortTableData(_rows: any) {
    throw new Error("Method not implemented.")
  }
  filterGlobalWhere(_showData1: any): any {
    throw new Error("Method not implemented.")
  }
  filterColumnWhere(_showData1: any): any {
    throw new Error("Method not implemented.")
  }
  setGetTableDataPermission(arg0: boolean) {
    throw new Error("Method not implemented.")
  }
  async getTableConfig() {

  }
  addItem()//添加一个节点
  { }

}

export const createBasicEntity = async () => {
  // const entity = reactive(new basicEntity())
}
