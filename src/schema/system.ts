import { computed, reactive } from "vue"
import { VxeTableDefines } from "vxe-table"
import { base } from "./base"
import { createMenu } from "./menu"
import { menuData } from "@/api/data3"
import { menuConfig, tabConfig } from "@/types/schema"



export class system extends base {
  defaultTableConfig = {}
  defaultColumnConfig: VxeTableDefines.ColumnOptions = {
    width: 180
  }//一些默认配置
  pageConfig = {
    headerHeight: '50px'
  }
  systemConfig = {
    headerIcon: [],
  }
  renderMenu: menuConfig = {}
  renderTab: tabConfig = {}
  entityVetor: any = {}//使用map数据结构
  constructor() {
    super({} as any, {})
    this.displayState = 'destroy'
  }
  async systemInit() {
    //初始化menu 实例数据
    await this.initRenderMenu()//渲染menu的数据
    this.displayState = 'show'
  }
  async initSystemPermission() { }
  async initRenderMenu() {//菜单数据
    const data = JSON.parse(JSON.stringify(menuData))
    const systemConfig = this.systemConfig
    const renderMenu = this.renderMenu
    renderMenu.data = computed(() => {
      return data
    }) as any
    renderMenu.key = 'id'
    renderMenu.parentKey = 'parentId'
    renderMenu.titleKey = 'menuName'
    renderMenu.rootKey = '0'
    renderMenu.rootTitle = '系统菜单'
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
}

const systemInstance = reactive(new system())
export { systemInstance } 
