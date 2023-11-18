import { reactive } from "vue"
// import { _system, system } from "./system"
// import { tableView } from "./table"

export class entityTable extends tableView {
  tableName?: string
  constructor(system: system, tableName: string) {
    //schema就是props
    super(system, {})
    this.tableName = tableName
  }
}

export function createEntityTable(tableName: string) {//
  const table = reactive(new entityTable(_system, tableName))
  // table.initComponent()
  // table.initGridOptions()
  return table
}
