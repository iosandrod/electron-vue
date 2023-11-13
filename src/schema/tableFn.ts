import { computed, isReactive } from "vue";
import { table } from "./table";
import { StyleType, position } from "@/types/schema";
import { column, createColumn } from "./column";
import { VxeGridProps } from "vxe-table";


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
        const rowConfig = getTableRowConfig(table)!
        const rowHeight = rowConfig.rowHeight
        return rowHeight
    })
}

export const getTableHeaderHeight = (table: table) => {
    return computed(() => {
        const headerConfig = getTableHeaderConfig(table)!
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
            const filterConfig = table.tableConfig.filterConfig!
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
        const checkBoxColumn = tableConfig.showCheckBoxColumn == true ? { type: 'checkbox', width: 50, field: 'checkboxField', align: 'center' } : null
        const seqColumn = tableConfig.showSeqColumn == true ? { type: "seq", width: 30, align: 'center' } : null
        const defaultColumns = [seqColumn, checkBoxColumn].filter(col => col != null)
        const columns = [...defaultColumns, ...tableConfig.columns,]
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
        return null
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
            const arr = ['']
            const tableConfig = table.tableConfig
            const hiddenBorder = tableConfig.hiddenBorder
            const curRow = table.tableData.curRow
            if (curRow === row) {
                arr.push('curRowClass')
            }
            if (hiddenBorder == true) {
                arr.push('')
            }
            return arr
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

export const getOptionsCheckboxConfig = (table: table) => {
    return computed(() => {
        const tableConfig = table.tableConfig
        return tableConfig.checkboxConfig
    })
}

export const getOptionsHeight = (table: table) => {
    return computed(() => {
        const tableConfig = table.tableConfig
        return tableConfig.height
    })
}

export const getOptionsShowFooter = (table: table) => {
    return computed(() => {
        const columns = getOptionsColumns(table).value
        const showFooter = columns.reduce((res: boolean, item) => {
            if (res == true) {
                return res
            }
            const slots: any = item.slots!
            const footer = slots?.footer
            if (footer != null) {
                return true
            }
            return res
        }, false)
        return showFooter
    })
}

export const getOptionsShowHeader = (table: table) => {
    return computed(() => {
        return table.tableConfig.showHeader
    })
}

export const openColumnFilter = (table: table, field: string, position?: position) => {
    if (position) {
        table.filterDialogConfig.props.position = position
    }
    table.filterDialog && table.filterDialog.open()
}


export const initGridOptions = (table: table) => {
    const gridOptions = table.gridOptions as VxeGridProps
    gridOptions.columns = getOptionsColumns(table) as any
    gridOptions.data = getOptionsData(table) as any
    gridOptions.treeConfig = getOptionsTreeConfig(table) as any
    gridOptions.scrollX = getOptionsScrollX(table) as any
    gridOptions.scrollY = getOptionsScrollY(table) as any
    gridOptions.rowConfig = getOptionsRowConfig(table) as any
    gridOptions.rowClassName = getOptionsRowClassName(table) as any
    gridOptions.cellClassName = getOptionsCellClassName(table) as any
    gridOptions.filterConfig = getOptionsFilterConfig(table) as any
    gridOptions.checkboxConfig = getOptionsCheckboxConfig(table) as any
    gridOptions.height = getOptionsHeight(table) as any
    gridOptions.showFooter = getOptionsShowFooter(table) as any
    gridOptions.showHeader = getOptionsShowHeader(table) as any
    gridOptions.border = false
    gridOptions.menuConfig = { enabled: true }
}