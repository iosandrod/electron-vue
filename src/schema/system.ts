import { computed, h, isProxy, nextTick, reactive } from "vue"
import { VxeButton, VxeTableDefines } from "vxe-table"
import { base } from "./base"
import { createMenu, menu } from "./menu"
import { menuData, menuData1 } from "@/api/data3"
import { StyleType, command, dialogConfig, localStorageValue, menuConfig, routeOpenConfig, tabConfig, tableConfig } from "@/types/schema"
import { useLocalStorage } from '@vueuse/core'
import { createMainEntity, mainEntity } from "./businessTable/mainEntity"
import { getRouter } from "@/router"
// import { dialogPool } from "./dialog"
import { RouteRecordSingleView } from "vue-router"
import ViewGrid from '@/views/layout/ViewGrid.vue'
import { TabPaneProps } from "ant-design-vue"
import { createTab, tab } from "./tab"
import index9Vue from "@/views/index9.vue"
import index10Vue from "@/views/index10.vue"
import index1Vue from "@/views/index1.vue"
import { createTable, table } from "./table"
import entityView from "./schemaComponent/entityView"
import { createMainEditEntity } from "./businessTable/mainEditEntity"
import { getTableConfig } from "@/api/httpApi"
import { createBaseInfoTable } from "./editClass/baseInfoTable"

export class system extends base {
  commandQueue: command[] = [

  ]
  getRouter = getRouter
  defaultTableConfig = {}//默认的全体表的配置信息
  localStorage: localStorageValue = {}
  defaultColumnConfig: VxeTableDefines.ColumnOptions = {
    width: 180
  }//一些默认配置
  baseInfoTableMap: any = {}
  pageRef: {
    menuRef?: menu,
    tabRef?: tab
  } = {

    }
  formItemBaseInfoTable: {
    [key: string]: table//那么formitem不需要再次生成table实例
  } = {}
  entityConfigVetor = new Map()
  pageConfig = {
    headerHeight: '50px'
  }
  systemConfig = {
    headerIcon: [],//配置信息
    activeKey: '',
    companyConfig: {
      companyId: '0009',
      companyName: "",
    }
  }
  renderMenu: menuConfig = {}
  renderTab: tabConfig = {}
  entityVetor: {
    [key: string]: mainEntity
  } = {}//使用map数据结构
  baseInfoEntityVetor: {
    [key: string]: mainEntity
  } = {}
  constructor() {
    super({} as any, {})
    this.displayState = 'destroy'
  }
  //都是使用entity作为路由基础组件
  async systemInit() {
    // dialogPool.initDialogPool()
    //初始化menu 实例数据
    await this.initBaseInfoTable('')
    await this.initLocalStorage()
    await this.initRenderMenu()//渲染menu的数据
    await this.initRenderTab()
    this.displayState = 'show'
    setTimeout(() => {
      this.routeOpen({ entityName: "t_SdOrder" })
      // this.routeOpen({ entityName: 't_SdOrder', isEdit: true })
      // this.routeOpen('index10')
      // const router = this.getRouter()
      // router.push({ path: '/index8' })
    }, 1000);
  }
  async initSystemPermission() { }
  async initRenderMenu() {//菜单数据
    const data = JSON.parse(JSON.stringify(menuData1))
    const renderMenu = this.renderMenu
    const _this = this
    renderMenu.data = data
    renderMenu.key = 'id'
    renderMenu.parentKey = 'parentId'
    renderMenu.titleKey = 'menuName'
    renderMenu.rootKey = '0'
    renderMenu.rootTitle = '系统菜单'
    renderMenu.itemClick = (item) => {
      const schema = item.schema
      const tableName = schema.tableName
      _this.routeOpen(tableName)
    }
    const menu = createMenu(renderMenu)
    this.pageRef.menuRef = menu//这种配置是写死的
  }
  async initRenderTab() {
    const _this = this
    const renderTab = this.renderTab
    renderTab.onTabClick = () => {
      console.log('tabClick')
    }
    renderTab.onChange = (key: any) => {
      this.routeOpen(key)//使用key  
    }
    renderTab.tabItems = computed(() => {
      const entityVetor = _this.entityVetor
      const entityArr = Object.values(entityVetor).sort((entity1, entity2) => {
        return entity1.tabIndex - entity2.tabIndex//先排序
      }).map(entity => {
        let cnName = entity?.tableInfo?.cnName || ''
        const obj = {
          tab: cnName,
          key: entity.entityName,
        } as TabPaneProps & { key: string }
        if (entity.isEditEntity == true) {
          obj.tab = `${obj.tab}编辑`
          obj.key = `${entity.entityTabKey}`
        }
        return obj
      })
      return entityArr//使用vetor的tab
    }) as any
    renderTab.activeKey = computed(() => {
      return this.systemConfig.activeKey
    }) as any
    renderTab.tabBarStyle = computed(() => {
      const obj = {
        margin: '0 0 0 0 !important',
        height: '30px'
      } as StyleType
      return obj
    }) as any
    const tabRef = createTab(renderTab)
    this.pageRef.tabRef = tabRef
  }
  async initSystemHttp() { }
  async initSystemMenu() { }
  async openBaseInfoTable()//打开参照弹框
  {
    console.log('打开参照弹框')
  }
  async createBaseInfoTable(baseInfoConfig: any) {
    const tableName = baseInfoConfig.tableName
    let baseInfoTableMap = this.baseInfoTableMap
    let baseInfoTable = baseInfoTableMap[tableName]
    if (baseInfoTable != null) {
      return
    }
    let _baseInfoTable = createBaseInfoTable(baseInfoConfig)
    this.baseInfoTableMap[tableName] = _baseInfoTable
  }
  async initLocalStorage() {
    const localStorage = this.localStorage
    localStorage.token = useLocalStorage('token', '') as any
  }
  //打开路由
  routeOpen(openConfig: routeOpenConfig | string) {//打开某个路由 以路由基础,是否编辑页面 
    //判断是否有这个路由
    if (typeof openConfig == 'string') {
      const reg = new RegExp(/_edit$/)
      openConfig = { entityName: openConfig }
      if (reg.test(openConfig.entityName)) {
        openConfig.isEdit = true
      }
    }
    const isEdit = openConfig.isEdit
    const entityName = openConfig.entityName
    const $router = this.getRouter()
    const renderMenu = this.renderMenu
    const data = renderMenu.data
    const state = data?.map((row: any) => row.tableName).includes(entityName)
    if (Boolean(state) == false) {//普通路由
      $router.push(entityName)
      this.systemConfig.activeKey = entityName
      return
    }
    let entityKey = null
    if (isEdit == true) {
      let reg = new RegExp(/_edit$/)
      if (reg.test(entityName)) {
        entityKey = entityName
      } else {
        entityKey = `${entityName}_edit`
      }
    } else {
      entityKey = entityName
    }
    const allRoute = $router.getRoutes()
    if (allRoute.map(route => route.name).filter(v => v != null).includes(entityKey)) {
      $router.push({ path: `/${entityKey}` })
    } else {
      let entityKey: any = null
      let mainEntity: any = null
      if (isEdit !== true) {
        mainEntity = this.getMainEntity(entityName) //暂时不使用这个配置
        entityKey = entityName
      } else {
        mainEntity = this.getMainEditEntity(entityName)
        entityKey = `${entityName}_edit`
      }
      const route = {
        component: () => entityView, path: `/${entityKey}`, name: entityKey,
        props: (route) => {
          return { entityInstance: mainEntity, key: entityKey }
        }
      } as RouteRecordSingleView
      $router.addRoute('index', route)
      nextTick(() => {
        $router.push({ path: `/${entityKey}` })
      })
    }
    this.systemConfig.activeKey = entityKey
  }
  getMainEntity(entityName: string) {
    const entityVetor = this.entityVetor
    let targetEntity: any = entityVetor[entityName]
    if (targetEntity == null) {
      targetEntity = createMainEntity(entityName)
      targetEntity.entityTabKey = entityName
      entityVetor[entityName] = targetEntity//这个是实体类
    }
    return targetEntity
  }
  getMainEditEntity(entityName: string) {
    const entityVetor = this.entityVetor
    const entityEditName = `${entityName}_edit`
    let targetEntity: any = entityVetor[entityEditName]
    if (targetEntity == null) {
      targetEntity = createMainEditEntity(entityName)
      targetEntity.entityTabKey = `${entityName}_edit`
      entityVetor[entityEditName] = targetEntity
    }
    return targetEntity
  }
  getFormItemBaseInfoTable() {//使用formitem的baseInfoTable的编辑项

  }
  async initBaseInfoTable(tableName: string) {
    const tableConfig = {
      showCheckBoxColumn: false,
      onCellClick: () => {
        console.log('clickFn')
      },
      height: "300px",
      data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      ], columns: [
        { field: 'name', title: '', width: 100, showHeader: true },
        {
          showFilter: false, showSort: false,
          showHeader: false,
          field: 'operator', title: "操作", width: 100, slots: {
            default: (column: any) => {
              return h('div', {}, [h(VxeButton, {
                onClick: () => {
                }
              }, () => {
                return h('div', {}, ['选择'])
              })])
            }
          }
        }
      ],
      showHeader: true,
      resizable: false,
      showHeaderFilter: false,
      showHeaderSort: false,
    }
    const tableRef = createTable(tableConfig)
    this.baseInfoTableMap['t_SdOrder'] = tableRef
  }
  getBaseInfoTable() {

  }
  async createSearchTable(tableName: string, searchFieldArr?: string[]) {
    //查询的tableRef
    const tableInfo = await getTableConfig(tableName)
    // console.log(tableInfo, 'testInfo') 
    const renderTable: tableConfig = {
      columns: []
    }
    const _table = createTable(renderTable)
  }
  addCommand(command: command) {
    // this.commandQueue = [...this.commandQueue, command]
    this.commandQueue.push(command)
  }
  //添加全局弹出框
  addGlobalDialog(dialogConfig: dialogConfig) {

  }
  removeGlobalDialog(key: string) {

  }
}
//
const systemInstance = reactive(new system())


export const getSystem = (): system => {
  return systemInstance as system
}
export { systemInstance }