import { Subject } from "rxjs"
import { reactive, h, computed, resolveComponent, Suspense, Teleport, isProxy } from "vue"
import { base } from "../base"
import { pageTree } from "./pageTree"
import layoutGridView from "../schemaComponent/layoutGridView"
import { GridLayout, GridItem } from 'vue-grid-layout'
import * as layoutGrid from 'vue-grid-layout'
import { http } from "../http"

import { tableMethod } from "../tableMethod"
import { createTable, table } from "../table"
import { getEntityConfig, getTableConfig, getTableData, getTableInfo } from "@/api/httpApi"
import { tableData, tableData2 } from "@/api/data"
import { layoutConfig, tableConfig, layoutItem, StyleType, mainTableInfo, btnCategory, formConfig, itemConfig, formItemConfig, layoutItemConfig, menuConfig, dialogConfig, tableState } from "@/types/schema"
import { _columns, entityColumn } from "../entityColumn"
import lodash from "lodash"
import { comVetor } from "@/plugin/register"
import { getRenderTable } from "./basicEntityFn"
import * as entityRenderFn from './basicEntityFn'
import { mainEntity } from "./mainEntity"
import { tableData3 } from "@/api/data2"
import { withDirectives, vShow } from 'vue'
import { pageloadMiddleware } from "@/middleware/pageloadMiddleware"
import { confirmMiddleware } from "@/middleware/confirmMiddleware"
import { detailEntity } from "./detailEntity"
import { createEntityButton } from "../entityButton"
import { createForm, form } from "../form"
import { propsConfig } from "../icon"
import contextMenuView from "../schemaComponent/contextMenuView"
import { contextMenu, createContextMenu } from "./contextMenu"
import { mergeData } from "@/api/data4"
import { tableMenuData } from "@/api/data3"
import { createMenu, menu } from "../menu"
import { createDialog, dialog } from "../dialog"
import dialogView from "../schemaComponent/dialogView"
import { VxeGrid } from "vxe-table"
export class basicEntity extends base implements tableMethod {//其实他也是一个组件
  tabIndex: number = 0//使用tabIndex ,路由的tab
  sub = new Subject()//动作发射器
  detailTable?: detailEntity[] = []
  http = http
  entityType = 'main'//这里默认是主表
  layoutConfig: layoutConfig = {
    rowHeight: 10,
    isDraggable: false,
    isResizable: false,
    useCssTransform: false,
    verticalCompact: false,//
    list: [{
      key: '1',
      // icon: () => h(MailOutlined),
      label: 'Navigation One',
      title: 'Navigation One',
      onClick: () => {
        console.log(this)
      }
    },
    {
      key: 'sub1',
      // icon: () => h(AppstoreOutlined),
      label: 'Navigation Three',
      title: 'Navigation Three',
      onClick: () => {
        console.log(this)
      },
      children: [
        {
          key: '3',
          label: 'Option 3',
          title: 'Option 3',
          onClick: () => {
            console.log(this)
          }
        },
      ],
    },]
  }
  mainEntity?: mainEntity
  originTableInfo?: any
  schema?: {} = {}
  entityName = ''
  pageRef: {
    // menuRef?: menu,
    searchDialog?: dialog
    vxeGrid?: table,
    vxeForm?: form,
    contextMenu?: contextMenu,
    searchForm?: form
  } = {
      vxeGrid: undefined,
      vxeForm: undefined,
      contextMenu: undefined,
    }
  tableConfig: { columns?: entityColumn[] } = {//表格配置
    //表格配置
    columns: []
  }
  menuConfig = {
    list: JSON.parse(JSON.stringify(tableMenuData))
  }
  detailEntityConfig = {
    curDetailKey: ''
  }
  buttonCategory: btnCategory = ''
  entityConfig?: any//这个是模型的配置，是一个数组
  pageConfig: any = {}//页面配置
  tableInfo?: mainTableInfo = {} as any//远程获取的数据
  renderLayout: layoutConfig = {}//渲染节点数据
  renderLayoutItems: Array<layoutItem> = []
  renderTable: any = {}//渲染表格的数据
  renderEditForm: formConfig = {} as any //渲染编辑表格 
  renderEditEntity: any = {}//初始化编辑表格
  renderSearchForm: any = {}//渲染查询表格
  renderButtonGroup: any = []//初始化按钮   
  renderDetailTable: any = {}//渲染子表配置
  renderEditTable: any = {}//渲染编辑表格配置 
  renderSearchDialog: dialogConfig = {}
  nodeArr: [] = []
  renderTableInfo: any = {}
  util: any
  tableData = {
    data: []
  }
  curRowChange: any
  constructor(schema: any, system: any) {
    super(schema, system)
    this.system = system
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
    const _divStyle = { position: 'absolute', top: '0px', left: '0px', bottom: '0px', background: "white", opacity: '0', right: '0px' } as StyleType
    const contextInstance = this.pageRef.contextMenu
    const _this = this
    const _div = h('div', {
      style: _divStyle,
      onContextmenu: (event: MouseEvent) => {
        _this.openContext(event)
      }
    } as propsConfig, [
      h(contextMenuView, { contextMenuInstance: this.pageRef.contextMenu })
    ])
    const _div1 = h('div')
    const dragDiv = computed(() => {
      let drag = this.renderLayout.isDraggable && this.renderLayout.isResizable
      if (drag == true) {
        return _div
      }
      return _div1
    })
    const vNode = () => {
      //这里如果有虚拟节点必须使用虚拟节点
      const layoutCom = resolveComponent('grid-layout')
      const layoutItemCom = resolveComponent('grid-item')
      const renderLayout = this.renderLayout
      const schema = this.entityConfig!
      const _this = this
      const show = computed(() => {
        return _this.displayState == 'show'
      })
      const destroy = computed(() => {
        return _this.displayState == 'destroy'
      })
      if (destroy.value == true) {
        return null
      }
      return withDirectives(
        h('div', { class: 'h-full w-full' }, [
          h(layoutCom, { ...renderLayout, style: { height: '100%', width: '100%' } as StyleType, }, () => schema!.map((item: any) => {
            const _item = {
              x: item.x, y: item.y, h: item.h, w: item.w, i: item.i, onMove: (i: any, newx: any, newy: any) => {
                item.x = newx
                item.y = newy
              },
              onResize: (i: any, newH: any, newW: any, newHPx: any, newWPx: any) => {
                item.h = newH
                item.w = newW
              }
            } as layoutItem
            return h(layoutItemCom, _item,
              () => {
                let renderCom: any = null
                let defaultCom: any = null
                const component = item.component//
                if (component != null) {//
                  renderCom = component()
                }
                const renderStyle = { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType
                if (renderCom) {
                  defaultCom = h('div', { style: renderStyle }, [renderCom,
                    h(dragDiv.value, {
                      onContextmenu: (event: MouseEvent) => {
                        _this.openContext(event, _item)
                        event.preventDefault()
                        event.stopPropagation()
                      },
                    })
                  ])
                } else {
                  defaultCom = h('div', { style: renderStyle }, ['默认节点'])
                }
                return defaultCom
              }
            )
          })),
          h(dialogView, { dialogInstance: _this.pageRef.searchDialog })
        ])
        , [[vShow, show.value]])
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
      //   const { params, url } = await getTableData(this)
      //   const payload = { entity: this, params, url }
      //   const fn = async (payload: any, next: any) => {
      //     const params = payload.params
      //     const url = payload.url
      //     // const entity = payload.entity
      //     const result: any = await http.postZkapsApi(url, params)//这里模拟获取数据
      //     // const data = JSON.parse(JSON.stringify(mergeData))//这里是数据  
      //     // this.tableData.data = data
      //     const { status, msg, dtMain: rows, total, data } = result
      //     let _rows = rows
      //     let _total = total
      //     if (_rows == null) {
      //       _rows = data
      //     }
      //     if (_total == null) {
      //       _total = data?.length || 0
      //     }
      //     this.tableData.data = _rows
      //     await next()
      //   }
      const data = JSON.parse(JSON.stringify(tableData))//这里是数据  
      this.tableData.data = data
      // const middleArr = [pageloadMiddleware
      //   // , confirmMiddleware
      //   , fn]//两个中间件
      // await this.runMiddlewares(payload, middleArr, 0)
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
  async getTableConfig() { }
  //添加一个节点
  addItem() { }
  async initRenderTable() {
    try {
      const entity = this
      const renderTable = entity.renderTable//这个是渲染表格的数据
      renderTable.columns = computed(() => {
        return this.tableConfig.columns
      }) as any//处理表格 
      renderTable.data = computed(() => {
        return entity.tableData.data
      }) as any//行与列 
      const table = createTable(renderTable)
      entity.pageRef.vxeGrid = table//只初始化一次
      // console.log(table.gridOptions)
      // return reactive({ ...table.gridOptions })
      // return renderTable
      return { tableInstance: table }
    } catch (error) {
      return Promise.reject("表格数据获取出错")
    }
  }
  async initEntity(initConfig?: any): Promise<void> {//
    this.displayState = 'destroy'//显示状态
    await this.initTableInfo()
    await this.initEntityConfig()//这个函数才是最重要的
    await this.initRenderLayout()//初始化layout的需要制定
    await this.initDragMenu()
    await this.initRenderContext()
    this.initComponent()//初始化普通的component
    const show = initConfig.show//显示的东西
    if (show != false) {
      this.displayState = 'show'
    }
    setTimeout(() => {
      this.getPageData()
    }, 1000);
  }
  initDragMenu() {
    // const list = this.menuConfig.list
    const contextMenu = createMenu(this.menuConfig as menuConfig)
    this.pageRef.contextMenu = contextMenu as any
  }
  initDetailEntity() {
    //基类没有初始化子表的配置的东西
  }
  initRenderContext() {
    const list = this.layoutConfig.list
    const contextMenu = createContextMenu({ list: list }) as any
    this.pageRef.contextMenu = contextMenu
  }
  //打开右键菜单
  openContext(event: MouseEvent, entityItem?: any) {
    const contextInstance = this.pageRef.contextMenu!
    console.log(contextInstance, 'testInstance')
    contextInstance?.openContext(event)
  }
  async initRenderSearchDialog() {
    entityRenderFn.initRenderSearchDialog(this)
  }
  async initRenderSearchForm() {
    return entityRenderFn.initRenderSearchForm(this)
  }
  async initRenderEditForm() {
    return entityRenderFn.initRenderEditForm(this)
  }
  async initTableInfo() {
    const tableInfo = await getTableConfig(this.entityName)//相当于表名吧,这个函数具有副作用
    this.tableInfo = tableInfo
    const entity = this
    const columns: any = entity.tableInfo!.tableColumns
    const _columns = columns.map((col: any) => {
      let _col = new entityColumn()
      _col.initColumn(col)
      _col.getEntity = () => { return this }
      //@tsin
      return _col
    })
    this.tableConfig.columns = _columns!
    this.tableConfig.columns!.forEach((col: any) => {
      console.log(isProxy(col))
      if (col.field == 'cCustNo') {
        // col.getRowEditType = (row: any, col: any) => {
        //   if (row['cSdOrderNo'] == '1111') {
        //     return 'string'
        //   } else {
        //     return 'select'
        //   }
        // }
      }
      if (col.editType == 'select') {
        col.options = [{ label: '小风', value: 'xiaofeng' }, { label: '小峰', value: 'xiaofeng1' }]
      }
    })
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
    renderLayout.margin = [0, 0]
    // renderLayout.responsive = true
    // renderLayout.useCssTransform = false
    // renderLayout.verticalCompact = false
    renderLayout.rowHeight = computed(() => {
      return this.layoutConfig.rowHeight
    }) as any
    renderLayout.colNum = 24
    renderLayout.layout = computed(() => {
      const _layout = this.entityConfig.map((item: any) => {
        return {
          x: item.x, y: item.y, h: item.h, w: item.w,
          i: item.i
        } as layoutItem
      })
      return _layout
    }) as any
  }
  async initEntityConfig() {//初始化页面节点数据
    if (this.entityConfig == null) {
      //使用entityConfig
      this.entityConfig = await getEntityConfig(this) as any
    }
    const entityConfig = this.entityConfig!//这个是节点配置
    await Promise.all(entityConfig.map(async (item: any) => {//这是个数组 节点数组
      try {
        let _item = await this.resolveEntityItem(item)
        return _item
      } catch (error) {
        console.error('初始化出错')
      }
    }))
  }
  addEntityItem() { }
  removeEntityItem() { }
  async resolveEntityItem(item: any) {
    const _this = this
    const itemConfig = item.layoutItemConfig!
    const renderFunName = itemConfig.renderFunName
    let renderComName = itemConfig.renderComName as keyof typeof comVetor
    let renderCom: any = h('div', [])
    let renderData: any = {}
    //@ts-ignore
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
  }
  async runMiddlewares(payload: any, middlewares: any[], index: any) {
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
  getMainTable() {
    return this.mainEntity || this
  }
  initRenderButtonGroup() {
    const entity = this.getMainTable()
    const tableInfo = entity.tableInfo
    let buttons: any = tableInfo?.tableButtons! || []//
    if (!Array.isArray(buttons)) {
      buttons = []
    }
    const buttonCategory = this.buttonCategory
    const entityName = this.entityName
    let _button = buttons?.find((btn: any) => {
      const category = btn.category
      const tableName = btn.tableName
      if (category == buttonCategory && entityName == tableName) {
        return true
      }
    })
    _button = _button || buttons?.find((btn: any) => {
      const category = btn.category
      return category == buttonCategory
    })
    const targetButtons = _button?.buttons || []//获取到这个东西
    this.renderButtonGroup = targetButtons?.map((btn: any) => {
      const _btn = createEntityButton(btn, this)
      return _btn
    })
    return { entity: this, buttons: this.renderButtonGroup }
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
  initRenderEditEntity() {
    //初始化编辑的entity
  }
  setCurrentEntityDesign(status: boolean) {
    this.layoutConfig.isDraggable = Boolean(status)
    this.layoutConfig.isResizable = Boolean(status)
  }
  setMergeConfig() {
    const vxeGrid = this.pageRef.vxeGrid
    vxeGrid?.setMergeConfig()
  }
  setTableEdit(state: tableState) {
    const vxeGrid = this.pageRef.vxeGrid
    if (vxeGrid == null) {
      return
    }
    vxeGrid.tableState = state
  }
  changeColumnEditType(field: string, type: string) {
    let targetCol = this.tableConfig.columns!.find(col => {
      return col?.field == field
    })
    if (targetCol) {
      console.log(targetCol)
      // targetCol.columnConfig.options = [{ key: '1', value: '3' }]
      targetCol!.editType! = type
    }
  }
}

export const createBasicEntity = async () => {
  return null
}
