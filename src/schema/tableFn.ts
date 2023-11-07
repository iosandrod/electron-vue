import { computed, isReactive } from "vue";
import { table } from "./table";
import { StyleType } from "@/types/schema";
import { column, createColumn } from "./column";


export const getTableRowConfig = (table: table) => {
    const tableConfig = table.tableConfig
    const rowConfig = tableConfig.rowConfig
    return rowConfig
}
export const getTableHeaderConfig = (table: table) => {
    const tableConfig = table.tableConfig
    const headerConfig = tableConfig.headerConfig
    return headerConfig
}

export const getTableRowHeight = (table: table) => {
    return computed(() => {
        const rowConfig = getTableRowConfig(table)
        const rowHeight = rowConfig.rowHeight
        return rowHeight
    })
}

export const getTableHeaderHeight = (table: table) => {
    return computed(() => {
        const headerConfig = getTableHeaderConfig(table)
        const rowHeight = headerConfig.rowHeight
        return rowHeight
    })
}

export const getTableStyle = (table: table) => {
    return computed(() => {
        const style: StyleType = {}
        const baseStyle = table.getBaseStyle().value
        return { ...style, ...baseStyle }
    })
}

export const getOptionsId = (table: table) => {
    return computed(() => {
        return
    })
}

export const getOptionsData = (table: table) => {
    return computed(() => {
        const showData = table.tableData.data
        const _data = showData.filter(row => {
            const filterConfig = table.tableConfig.filterConfig
            const status = filterConfig.reduce((res, item: any) => {
                if (res == false) {
                    return res
                }
                const field = item.field
                const value = item.value
                const _value = row[field]
                if (_value == value) {
                    res == false
                }
                return res
            }, true)
            return status
        })
        table.tableData.showData = _data
        return _data
    })
}

export const getOptionsColumns = (table: table) => {
    return computed(() => {
        const tableConfig = table.tableConfig
        const columns = tableConfig.columns
        const renderColumns = columns.map(col => {
            if (col instanceof column) {
                return col.renderColumn
            }
            return createColumn(col, table).renderColumn
        })
        return renderColumns
    })
}


export const getOptionsTreeConfig = (table: table) => {
    return computed(() => {
        return {}
    })
}


export const getOptionsScrollX = (table: table) => {
    return computed(() => {
        return {
            enable: true,
            gt: 30,
            oSize: 0,
        }
    })
}

export const getOptionsScrollY = (table: table) => {
    return computed(() => {
        return {
            enable: true,
            gt: 0,
            oSize: 0,
        }
    })
}

export const getOptionsRowConfig = (table: table) => {
    return computed(() => {
        return {
            isHover: true
        }
    })
}

export const getOptionsRowClassName = (table: table) => {
    return computed(() => {
        return ({ row }: any) => {
            const curRow = table.tableData.curRow
            if (curRow === row) {
                return ['curRowClass']
            }
            return ['notCurRowClass']
        }
    })
}

export const getOptionsCellClassName = (table: table) => {
    return computed(() => {
        return ({ row, column }: any) => {
            const curRow = table.tableData.curRow
            const curColumn = table.tableData.curColumn
            if (row == curRow && column?.params == curColumn && column?.field != null) {
                return ['rowSelect']
            }
            return []
        }
    })
}

export const getOptionsFilterConfig = (table: table) => {
    return computed(() => {
        return {
            showIcon: true
        }
    })
}



