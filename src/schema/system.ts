import { reactive } from "vue"
import { VxeTableDefines } from "vxe-table"

export class system {
  defaultTableConfig = {}
  defaultColumnConfig: VxeTableDefines.ColumnOptions = {
    width: 180
  }
  constructor() { }
  async systemInit() { }
  async initSystemPermission() { }
  async initSystemHttp() { }
  async initSystemMenu() { }
  async openBaseInfoTable()//打开参照弹框
  {
    console.log('打开参照弹框')
  }
}

const systemInstance = reactive(new system())
export { systemInstance } 
