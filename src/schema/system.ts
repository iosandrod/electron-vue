import { computed, nextTick, reactive } from "vue"
import { VxeTableDefines } from "vxe-table"
import { base } from "./base"
import { createMenu, menu } from "./menu"
import { menuData } from "@/api/data3"
import { StyleType, localStorageValue, menuConfig, tabConfig } from "@/types/schema"
import { useLocalStorage } from '@vueuse/core'
import { createMainEntity, mainEntity } from "./businessTable/mainEntity"
import { getRouter } from "@/router"
import { dialogPool } from "./dialog"
import { RouteRecordSingleView } from "vue-router"
import ViewGrid from '@/views/layout/ViewGrid.vue'
import { TabPaneProps } from "ant-design-vue"
import { createTab, tab } from "./tab"
import index9Vue from "@/views/index9.vue"
import index10Vue from "@/views/index10.vue"
import index1Vue from "@/views/index1.vue"

export class system extends base {
  getRouter = getRouter
  defaultTableConfig = {}//默认的全体表的配置信息
  localStorage: localStorageValue = {}
  defaultColumnConfig: VxeTableDefines.ColumnOptions = {
    width: 180
  }//一些默认配置
  pageRef: {
    menuRef?: menu,
    tabRef?: tab
  } = {

    }
  entityConfigVetor = new Map()
  pageConfig = {
    headerHeight: '50px'
  }
  systemConfig = {
    headerIcon: [],//配置信息
    activeKey: ''
  }
  renderMenu: menuConfig = {}
  renderTab: tabConfig = {}
  entityVetor: {
    [key: string]: mainEntity
  } = {}//使用map数据结构
  constructor() {
    super({} as any, {})
    this.displayState = 'destroy'
  }
  //都是使用entity作为路由基础组件
  async systemInit() {
    dialogPool.initDialogPool()
    //初始化menu 实例数据
    await this.initLocalStorage()
    await this.initRenderMenu()//渲染menu的数据
    await this.initRenderTab()
    this.displayState = 'show'
    setTimeout(() => {
      this.routeOpen('t_SdOrder')
    }, 1000);
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
    const _this = this
    const renderTab = this.renderTab
    renderTab.tabItems = computed(() => {
      const entityVetor = _this.entityVetor
      const entityArr = Object.values(entityVetor).sort((entity1, entity2) => {
        return entity1.tabIndex - entity2.tabIndex//先排序
      }).map(entity => {
        let cnName = entity?.tableInfo?.cnName
        const obj = {
          tab: cnName,
          key: entity.entityName
        } as TabPaneProps & { key: string }
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
  async initLocalStorage() {
    const localStorage = this.localStorage
    localStorage.token = useLocalStorage('token', '') as any
  }
  routeOpen(entityName: string) {//打开某个路由 以路由基础
    const $router = this.getRouter()
    const allRoute = $router.getRoutes()
    if (allRoute.map(route => route.name).filter(v => v != null).includes(entityName)) {
      $router.push({ path: `/${entityName}` })
    } else {
      const mainEntity = this.getMainEntity(entityName) //暂时不使用这个配置
      this.entityConfigVetor.set(mainEntity, {
      })
      const route = {
        component: {}, path: `/${entityName}`, name: entityName,
        props: (route) => {
          return { entityInstance: mainEntity }
        }
      } as RouteRecordSingleView
      $router.addRoute('index', route)
      nextTick(() => {
        $router.push({ path: `/${entityName}` })
      })
    }
    this.systemConfig.activeKey = entityName
  }
  getMainEntity(entityName: string) {
    const entityVetor = this.entityVetor
    let targetEntity: any = entityVetor[entityName]
    if (targetEntity == null) {
      targetEntity = createMainEntity(entityName)
      entityVetor[entityName] = targetEntity//这个是实体类
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