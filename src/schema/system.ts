import { reactive } from "vue"
import { VxeTableDefines } from "vxe-table"

export class system {
  defaultTableConfig = {}
  defaultColumnConfig: VxeTableDefines.ColumnOptions = {
    width: 200
  }
  constructor() {}
  async systemInit() {}
  async initSystemPermission() {}
  async initSystemHttp() {}
  async initSystemMenu() {}
}

const _system = reactive(new system())
export { _system }
