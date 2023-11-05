import { tableView } from "./table";

export const getTableRowConfig = (table: tableView) => {
    const tableConfig = table.tableConfig
    const rowConfig = tableConfig.rowConfig
    return rowConfig
}

export const getTableRowHeight = (table: tableView) => {
    const rowConfig = getTableRowConfig(table)
    const rowHeight = rowConfig.rowHeight
    return rowHeight
}