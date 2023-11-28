import { Subject } from "rxjs"
import { reactive, h, computed, resolveComponent } from "vue"
import { base } from "../base"
import { pageTree } from "./pageTree"
import layoutGridView from "../schemaComponent/layoutGridView"
import { http } from "../http"
import { tableMethod } from "../tableMethod"
import { table } from "../table"
import { getTableConfig, getTableData, getTableInfo } from "@/api/httpApi"
import { tableData } from "@/api/data"
import { layoutConfig, tableConfig, layoutItem, StyleType } from "@/types/schema"
import { entityColumn } from "../entityColumn"
import lodash from "lodash"
import { comVetor } from "@/plugin/register"
import { getRenderTable } from "./basicEntityFn"
import * as entityRenderFn from './basicEntityFn'
import { mainEntity } from "./mainEntity"
import { tableData3 } from "@/api/data2"
import { withDirectives } from 'vue'
export class basicEntity extends base implements tableMethod {//其实他也是一个组件
  sub = new Subject()//动作发射器
  http = http
  layoutConfig: layoutConfig = {
    rowHeight: 30,
    isDraggable: false,
    isResizable: false,
    useCssTransform: true,
    verticalCompact: true// 
    //
  }
  originTableInfo?: any
  schema?: Array<layoutItem> = []
  entityType = ''
  entityName = ''
  pageRef: {
    vxeGrid: table
  } = {
      vxeGrid: {} as table
    }
  tableConfig: any = {//表格配置
    //表格配置
  }
  entityConfig: any = {
    nodeArr: []//节点数据  包括nodename nodedata   
  }
  pageConfig: any = {}
  tableInfo?: any = {}//远程获取的数据
  renderLayout: layoutConfig = {}//渲染节点数据
  renderLayoutItems: Array<layoutItem> = []
  renderTable: any = {}//渲染表格的数据
  renderEditForm: any = {}//渲染编辑表格
  renderSearchForm: any = {}//渲染查询表格
  renderButtonGroup: any = {}//初始化按钮  
  renderDetailTable: any = {}//渲染子表配置
  renderEditDetailTable: any = {}//渲染编辑表的子表配置  一个对象存所有东西 
  nodeArr: [] = []
  renderTableInfo: any = {}
  util: any
  tableData = {
    data: []
  }
  curRowChange: any
  constructor(schema: any, system: any) {
    super(schema, system)
    this.displayState = 'destroy'
    this.schema = schema
  }
  initComponent() {
    const _div = h('div', { style: { position: "absolute", top: '0px', left: '0px', bottom: '0px', background: "white", opacity: '0', right: '0px' } as StyleType })
    const dragDiv = computed(() => {
      let drag = this.renderLayout.isDraggable && this.renderLayout.isResizable
      if (drag == true) {
        return _div
      }
      return null
    })
    const vNode = () => {
      //这里如果有虚拟节点必须使用虚拟节点
      const layoutCom = resolveComponent('grid-layout')
      const layoutItemCom = resolveComponent('grid-item')
      const renderLayout = this.renderLayout

      return h(layoutCom, { ...renderLayout }, () => this.schema!.map(item => {
        return h(layoutItemCom, item,
          () => {
            let renderCom: any = null
            let defaultCom: any = null
            const component = item.component
            if (component != null) {
              renderCom = withDirectives(component(), [[{
                mounted(div, node) { },
                unmounted() { }
              }]])
            }
            if (renderCom) {
              defaultCom = h('div', { style: { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType }, [renderCom,
                dragDiv.value
              ])
            } else {
              defaultCom = h('div', { style: { position: "relative", background: 'red', height: '100%', width: '100%' } as StyleType }, ['默认节点'])
            }
            return defaultCom
          }
        )
      }))
    }
    this.component = vNode as any
  }
  async initNode() {
    console.log('initNode')
  }
  //
  async getPageData() {//获取页面数据,与实体相关的
    try {
      this.setPageLoading(true)
      let curRow = this.getCurRow()
      // console.log(curRow, 'testCurRow')
      // let { url, params } = await this.util.httpServe.getPageData(this)
      let { url, params } = {} as any
      let otherParams = {}
      // await this.getRunBefore('getTableData', params, url, otherParams)
      let { params: newParams, url: newUrl } = otherParams as any
      params = newParams || params
      url = newUrl || url
      await this.setDataPermission(params)
      const data = tableData3
      this.tableData.data = data as any//获取数据 
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
      console.error(error, 'testError')
      //   this.setGetTableDataPermission(true)
      //   this.setPageLoading(false)
    }
  }
  setPageLoading(arg0: boolean) {
  }
  getCurRow() {
    const table = this.pageRef.vxeGrid!
    return table.getCurRow()
  }
  //执行之前做的事情
  async getRunBefore() {
  }
  async getRunAfter() {
  }
  setDataPermission(params: any) {
  }
  sortTableData(_rows: any) {
  }
  filterGlobalWhere(_showData1: any): any {
  }
  filterColumnWhere(_showData1: any): any {
  }
  setGetTableDataPermission(arg0: boolean) {
  }
  async getTableConfig() {
    console.log('getTableConfig')
  }
  //添加一个节点
  addItem() { }
  async initRenderTable() {
    return await entityRenderFn.getRenderTable(this)
  }
  async initEntity(initConfig?: any): Promise<void> {//
    this.displayState = 'destroy'//显示状态
    await this.initEntityConfig()//这个函数才是最重要的
    await this.initRenderLayout()//初始化layout的需要制定
    this.initComponent()//初始化普通的component
    const show = initConfig.show//显示的东西
    if (show != false) {
      this.displayState = 'show'
    }
  }
  async initRenderLayout() {
    const renderLayout = this.renderLayout
    renderLayout.isDraggable = computed(() => {
      return this.layoutConfig.isDraggable
    }) as any
    renderLayout.isResizable = computed(() => {
      return this.layoutConfig.isResizable
    }) as any
    renderLayout.useCssTransform = computed(() => {
      return this.layoutConfig.useCssTransform
    }) as any
    renderLayout.verticalCompact = computed(() => {
      return this.layoutConfig.verticalCompact
    }) as any
    renderLayout.rowHeight = computed(() => {
      return this.layoutConfig.rowHeight
    }) as any
    renderLayout.colNum = 24
    renderLayout.layout = computed({
      get: () => {
        return this.schema
      },
      set: (value) => {
        console.log(value)
      }
    }) as any
  }
  async initEntityConfig() {//初始化页面节点数据
    if (this.schema == null) {
      this.schema = await getTableInfo(this.entityName) as any
    }
    const schema = this.schema!
    const _this: any = this
    await Promise.all(schema.map(async item => {//这是个数组 节点数组
      const itemConfig = item.layoutItemConfig!
      const renderFunName = itemConfig.renderFunName
      let renderComName = itemConfig.renderComName as keyof typeof comVetor
      let renderCom: any = h('div', ['123'])
      let renderData: any = {
        columns: [],
        data: []
      }
      if (renderFunName != null && _this[renderFunName]) {//初始化渲染数据
        const _this: any = this
        renderData = await _this[renderFunName](_this)//渲染函数数据 这个是函数来的
      }
      if (renderComName != null && comVetor[renderComName]) {
        renderCom = comVetor[renderComName]
      }
      item.component = () => {
        return h(renderCom, { ...renderData, style: { height: "100%", width: '100%' } })//使用闭包 
      }
      return item
    }))
  }
}

export const createBasicEntity = async () => {
  // const entity = reactive(new basicEntity())
}
