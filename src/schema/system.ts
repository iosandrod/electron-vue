import { reactive } from "vue"
import { VxeTableDefines } from "vxe-table"









export class system {
  defaultTableConfig = {}
  defaultColumnConfig: VxeTableDefines.ColumnOptions = {
    width: 180
  }//一些默认配置
  renderMenu: any = {}
  constructor() { }
  async systemInit() {
    await this.initRenderMenu()//渲染menu的数据
  }
  async initSystemPermission() { }
  async initRenderMenu() {
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
