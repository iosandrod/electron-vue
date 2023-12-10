import { computed, nextTick, reactive } from "vue"
import { VxeTableDefines } from "vxe-table"
import { base } from "./base"
import { createMenu } from "./menu"
import { menuData } from "@/api/data3"
import { localStorageValue, menuConfig, tabConfig } from "@/types/schema"
import { useLocalStorage } from '@vueuse/core'
import { createMainEntity } from "./businessTable/mainEntity"
import { getRouter } from "@/router"
import { dialogPool } from "./dialog"
import { RouteRecordSingleView } from "vue-router"
import ViewGrid from '@/views/layout/ViewGrid.vue'

export class system extends base {
  getRouter = getRouter
  defaultTableConfig = {}//默认的全体表的配置信息
  localStorage: localStorageValue = {}
  defaultColumnConfig: VxeTableDefines.ColumnOptions = {
    width: 180
  }//一些默认配置
  pageConfig = {
    headerHeight: '50px'
  }
  systemConfig = {
    headerIcon: [],//配置信息
  }
  renderMenu: menuConfig = {}
  renderTab: tabConfig = {}
  entityVetor: any = {}//使用map数据结构
  constructor() {
    super({} as any, {})
    this.displayState = 'destroy'
  }
  //都是使用entity作为路由基础组件
  async systemInit() {
    await dialogPool.initDialogPool()
    //初始化menu 实例数据
    await this.initLocalStorage()
    await this.initRenderMenu()//渲染menu的数据  
    this.displayState = 'show'
  }
  async initSystemPermission() { }
  async initRenderMenu() {//菜单数据
    const data = JSON.parse(JSON.stringify(menuData))
    const renderMenu = this.renderMenu
    const _this = this
    renderMenu.data = computed(() => {
      return data
    }) as any
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
    const renderTab = this.renderTab
    renderTab.tabItems = computed(() => {

    }) as any
  }
  async initSystemHttp() { }
  async initSystemMenu() { }
  async openBaseInfoTable()//打开参照弹框
  {
    console.log('打开参照弹框')
  }
  async initLocalStorage() {
    const localStorage = this.localStorage
    localStorage.token = useLocalStorage('token', '') as any
  }
  routeOpen(entityName: string) {//打开某个路由 以路由基础
    const $router = this.getRouter()
    const allRoute = $router.getRoutes()
    if (allRoute.map(route => route.name).filter(v => v != null).includes(entityName)) {
      $router.push({ name: entityName, path: `/${entityName}` })
      return
    }
    const mainEntity = this.getMainEntity(entityName) //暂时不使用这个配置 
    const route = {
      component: ViewGrid, path: `/${entityName}`, name: entityName, props: (route) => {
        return { entityInstance: mainEntity }
      }
    } as RouteRecordSingleView
    $router.addRoute('index', route)
    nextTick(() => {
      $router.push({ path: `/${entityName}` })
    })
  }
  getMainEntity(entityName: string) {
    const entityVetor = this.entityVetor
    let targetEntity = entityVetor[entityName]
    if (targetEntity == null) {
      targetEntity = createMainEntity(entityName)
      entityVetor[entityName] = targetEntity
    }
    return targetEntity
  }
}

//
const systemInstance = reactive(new system())


export const getSystem = (): system => {
  return systemInstance
}
export { systemInstance }