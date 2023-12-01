import { Subject } from "rxjs"
import { reactive, h, computed, resolveComponent } from "vue"
import { base } from "../base"
import { pageTree } from "./pageTree"
import layoutGridView from "../schemaComponent/layoutGridView"
import { http } from "../http"
import { tableMethod } from "../tableMethod"
import { table } from "../table"
import { getEntityConfig, getTableConfig, getTableData, getTableInfo } from "@/api/httpApi"
import { tableData, tableData2 } from "@/api/data"
import { layoutConfig, tableConfig, layoutItem, StyleType, mainTableInfo, btnCategory } from "@/types/schema"
import { entityColumn } from "../entityColumn"
import lodash from "lodash"
import { comVetor } from "@/plugin/register"
import { getRenderTable } from "./basicEntityFn"
import * as entityRenderFn from './basicEntityFn'
import { mainEntity } from "./mainEntity"
import { tableData3 } from "@/api/data2"
import { withDirectives } from 'vue'
import { pageloadMiddleware } from "@/middleware/pageloadMiddleware"
import { confirmMiddleware } from "@/middleware/confirmMiddleware"
import { detailEntity } from "./detailEntity"
import { createEntityButton } from "../entityButton"
export class basicEntity extends base implements tableMethod {//其实他也是一个组件
  sub = new Subject()//动作发射器
  detailTable?: detailEntity[] = []
  http = http
  entityType = 'main'//这里默认是主表
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
  entityName = ''
  pageRef: {
    vxeGrid: table
  } = {
      vxeGrid: {} as table
    }
  tableConfig: any = {//表格配置
    //表格配置
  }
  detailEntityConfig = {
    curDetailKey: ''
  }
  buttonCategory: btnCategory = ''
  entityConfig?: any
  pageConfig: any = {}//页面配置
  tableInfo?: mainTableInfo = {} as any//远程获取的数据
  renderLayout: layoutConfig = {}//渲染节点数据
  renderLayoutItems: Array<layoutItem> = []
  renderTable: any = {}//渲染表格的数据
  renderEditForm: any = {}//渲染编辑表格
  renderSearchForm: any = {}//渲染查询表格
  renderButtonGroup: any = []//初始化按钮   
  renderDetailTable: any = {}//渲染子表配置
  renderEditTable: any = {}//渲染编辑表格配置 
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
  getTableKey() {
    //获取表格主键
    const originTableInfo = this.originTableInfo
    return originTableInfo.cKeyColumn
  }
  getTableKeyCode() {
    //获取表格必录字段 
    const originTableInfo = this.originTableInfo
    return originTableInfo.cCodeColumn
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
      const schema = this.entityConfig!
      return h(layoutCom, { ...renderLayout, style: { height: '100%' } as StyleType }, () => schema!.map((item: any) => {
        return h(layoutItemCom, item,
          () => {
            let renderCom: any = null
            let defaultCom: any = null
            const component = item.component//
            if (component != null) {//
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
  }
  //
  async dispatch(eventName = '') {//触发某个函数

  }
  async getPageData() {//获取页面数据,与实体相关的
    try {
      const payload = { entity: this, params: {}, url: '' }
      const fn = async (payload: any, next: any) => {
        const params = payload.params
        const url = payload.url
        const entity = payload.entity
        // const data=await http.post()//这里模拟获取数据
        const data = JSON.parse(JSON.stringify(tableData2))//这里是数据  
        this.tableData.data = data
        await next()
      }
      const middleArr = [pageloadMiddleware, confirmMiddleware, fn]//两个中间件
      await this.runMiddlewares(payload, middleArr, 0)
      // this.setPageLoading(true) 
      // let curRow = this.getCurRow()
      // console.log(curRow, 'testCurRow')
      // let { url, params } = await this.util.httpServe.getPageData(this)
      // let { url, params } = {} as any
      // let otherParams = {}
      // await this.getRunBefore('getTableData', params, url, otherParams)
      // let { params: newParams, url: newUrl } = otherParams as any
      // params = newParams || params
      // url = newUrl || url
      // await this.setDataPermission(params)
      // const data = tableData3
      // this.tableData.data = data as any//获取数据 
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
        return this.entityConfig
      },
      set: (value) => {
        console.log(value)
      }
    }) as any
  }
  async initEntityConfig() {//初始化页面节点数据
    if (this.entityConfig == null) {
      //使用entityConfig
      this.entityConfig = await getEntityConfig(this) as any
    }
    //为什么要覆盖schema
    //
    const schema = this.entityConfig!
    const _this: any = this
    await Promise.all(schema.map(async (item: any) => {//这是个数组 节点数组
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
  async runMiddlewares(payload: any, middlewares: any, index: any) {
    if (index < middlewares.length) {
      const currentMiddleware = middlewares[index];
      await currentMiddleware(payload, async () => {
        try {
          await this.runMiddlewares(payload, middlewares, index + 1);
        } catch (error: any) {
          return payload.error = error
        }
      });
    }
  }
  initRenderButtonGroup() {
    // const renderButtonGroup = this.renderButtonGroup//渲染当前按钮组
    const tableInfo = this.tableInfo
    const buttons = tableInfo?.tableButtons!//
    const buttonCategory = this.buttonCategory
    const entityName = this.entityName
    let _button = buttons?.find((btn) => {
      const category = btn.category
      const tableName = btn.tableName
      if (category == buttonCategory && entityName == tableName) {
        return true
      }
    })
    _button = _button || buttons?.find((btn) => {
      const category = btn.category
      return category == buttonCategory
    })
    const targetButtons = _button?.buttons || []//获取到这个东西
    this.renderButtonGroup = targetButtons?.map(btn => {
      const _btn = createEntityButton(btn)
      return _btn
    })
    return { entity: this, renderButtons: this.renderButtonGroup }
  }
  async initRenderDetailEntity() {
    return await entityRenderFn.getRenderDetailEntity(this as any)
  }
  getDetailEntity(entityName: string) {
    const detailTable = this.detailTable
    const targetTable = detailTable?.find(table => {
      return table.entityName == entityName
    })
    return targetTable!
  }
  setCurrentEntityDesign(status: boolean) {
    this.layoutConfig.isDraggable = Boolean(status)
    this.layoutConfig.isResizable = Boolean(status)
  }
}

export const createBasicEntity = async () => {
  return
}
