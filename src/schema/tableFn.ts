import { computed, h, isReactive, resolveComponent, watchEffect, withDirectives } from "vue";
import { table } from "./table";
import { StyleType, position, tableSchema } from "@/types/schema";
import { column, createColumn } from "./column";
import { VxeGridProps } from "vxe-table";
import { getRenderFn } from "./columnFn";
import { getDialogPosition } from "./dialogFn";
import { getMouseEventPosition } from "@/utils/utils";
import { createDialog } from "./dialog";


export const getTableRowConfig = (table: table) => {
    const tableConfig = table?.tableConfig
    const rowConfig = tableConfig?.rowConfig
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
        const rowHeight = rowConfig?.rowHeight
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
        const columns = [
            ...defaultColumns,
            ...tableConfig.columns.map((col: any) => col.renderColumn),]
        return columns
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
        const rowConfig = table.tableConfig.rowConfig
        const rowHeight = rowConfig?.rowHeight
        return {
            height: rowHeight,
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
        let height = tableConfig.height
        if (typeof height == 'number') {
            height = `${height}px`
        }
        return height
    })
}

export const getOptionsShowFooter = (table: table) => {
    return computed(() => {
        const columns = table.tableConfig.columns
        const showFooter = columns.reduce((res: boolean, item) => {
            if (res == true) {
                return res
            }
            const showFooter: any = item.showFooter!
            if (showFooter === true) {
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
    gridOptions.columnConfig = getOptionsColumnConfig(table) as any
    gridOptions.showOverflow = 'ellipsis'
    gridOptions.height = getOptionsHeight(table) as any
    gridOptions.minHeight = '150px'
    gridOptions.showFooter = getOptionsShowFooter(table) as any
    gridOptions.showHeader = getOptionsShowHeader(table) as any
    gridOptions.border = false
    gridOptions.menuConfig = { enabled: true }
}
export const getOptionsColumnConfig = (table: table) => {
    return computed(() => {
        return {
            useKey: true,
            minWidth: 200
        }
    })
}
export const initComponent = (table: table) => {
    const _this = table
    const _vNode = () => {
        const options = table.gridOptions
        const vxeGrid = resolveComponent('vxe-grid')
        const _class = ['h-full', 'w-full']
        _class.push('grid-border-none')
        const outSizeDiv = getRenderFn('div',
            {
                style: getTableStyle(table).value, class: _class
            },
            [[{
                mounted() {

                }, unmounted() {
                    const dialogMap = table.dialogMap
                    Object.values(dialogMap).forEach(value => {
                        table.destroyDialog(value)
                    })
                    const effectPool = table.effectPool
                    Object.values(effectPool).forEach((effect: any) => {
                        if (effect) {
                            effect()
                        }
                    })
                }
            }]]
        )
        const vxeGridCom = h(vxeGrid, {
            ...options, ref: 'vxeGrid',
            onCellClick: ({ row, column }: any) => {
                _this.setCurRow(row)
                _this.setCurColumn(column)
                const tableConfig = _this.tableConfig
                const onCellClick = tableConfig.onCellClick
                if (typeof onCellClick == 'function') {
                    onCellClick({ row, column } as any)
                }
                let tableState = table.tableState
                if (tableState == 'moreRowEdit') {
                    table.tableData.editData = [...new Set([...table.tableData.editData, row])]
                } else {
                    table.tableData.editData.length && (table.tableData.editData = [])
                }
            },
            onCellMenu: (params: any) => {
                const { row, column, $event } = params
                const position = getMouseEventPosition($event)
                const tableConfig = _this.tableConfig
                const menuKey = table.dialogMap.bodyMenuDialog
                if (menuKey != null) {
                    table.openDialog(menuKey, position)
                }
                const onCellMenu = tableConfig.onCellMenu
                if (typeof onCellMenu == 'function') {
                    onCellMenu({ row, column } as any)
                }
            }
        })
        const vxeGridDiv = getRenderFn(vxeGridCom, {}, [[{
            mounted: (el, node) => {
                table.initColumnFilter()
                const instance = node.instance
                table.pageRef.vxeGrid = instance?.$refs.vxeGrid
            },
            unmounted: () => {
                table.pageRef.vxeGrid = null
            }
        }]])
        const inSizeGrid = outSizeDiv(vxeGridDiv())
        return inSizeGrid
    }
    table.component = _vNode
}


export const initTableConfig = (table: table) => {
    const schema: tableSchema = table.schema as any
    // Object.entries(schema).forEach(([key, value]) => {
    //     table.tableConfig[key] = value
    //     table.tableData.data = schema.data
    // })
    if (schema != null && Object.keys(schema).length > 0) {
        for (const key of Object.keys(schema)) {
            let tableConfig: any = table.tableConfig
            if (key == 'columns') {
                table.effectPool['tablecolumnEffect'] = watchEffect(() => {
                    tableConfig.columns = schema['columns']?.map(col => {
                        return createColumn(col, table)
                    })
                })
                continue
            }
            const _value = schema[key]
            if (_value != null) {
                table.effectPool[`table${key}Effect`] = watchEffect(() => {
                    const tableData = table.tableData
                    const _tableConfig = table.tableConfig as any
                    if (['data', 'columns'].includes(key)) {
                        tableData.data = schema['data'] as any || []
                        tableData.showData = schema['data'] as any || []
                    } else {
                        _tableConfig[key] = schema[key]
                    }
                })
            }
        }
    }
    // 最后才会初始化Component
    initGridOptions(table)
    initColumnFilter(table)
    initBodyMenuDialog(table)
    initHeaderMenuDialog(table)
    initComponent(table)
}


export const initBodyMenuDialog = (table: table) => {
    const tableConfig = table.tableConfig
    const showBodyMenuDialog = tableConfig.showBodyMenuDialog
    if (showBodyMenuDialog == false) {
        return
    }
    const dialogMap = table.dialogMap
    const bodyMenuDialog = dialogMap.bodyMenuDialog
    if (bodyMenuDialog != null) {
        return
    }
    const bodyMenuDialogConfig = table.dialogConfig.bodyMenuDialogConfig
    const dialog = createDialog(bodyMenuDialogConfig.props as any, bodyMenuDialogConfig.context, bodyMenuDialogConfig.dialogName)//使用这个模态框
    table.dialogMap.bodyMenuDialog = (dialog.dialogConfig.dialogPrimaryName)
}

export const initHeaderMenuDialog = (table: table) => {
    const tableConfig = table.tableConfig
    const showHeaderMenuDialog = tableConfig.showHeaderMenuDialog
    if (showHeaderMenuDialog == false) {
        return
    }
    const dialogMap = table.dialogMap
    const headerMenuDialog = dialogMap.headerMenuDialog
    if (headerMenuDialog != null) {
        return
    }
    const headerMenuDialogConfig = table.dialogConfig.headerMenuDialogConfig
    const dialog = createDialog(headerMenuDialogConfig.props as any, headerMenuDialogConfig.context, headerMenuDialogConfig.dialogName)//使用这个模态框
    table.dialogMap.headerMenuDialog = (dialog.dialogConfig.dialogPrimaryName)
}

export const initColumnFilter = (table: table) => {
    // const tableConfig = table.tableConfig
    // const showFilterDialog = tableConfig.showFilterDialog
    // if (showFilterDialog == false) {
    //     return
    // }
    // const dialogMap = table.dialogMap
    // const filterDialog = dialogMap.filterDialog
    // if (filterDialog == null) {
    //     const filterDialogConfig = table.dialogConfig.filterDialogConfig
    //     const dialog = createDialog(filterDialogConfig.props as any, filterDialogConfig.context, filterDialogConfig.dialogName)//使用这个模态框
    //     table.dialogMap.filterDialog = (dialog.dialogConfig.dialogPrimaryName)
    // }
}
