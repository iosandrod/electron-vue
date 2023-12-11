import { computed, getCurrentInstance, h, isReactive, nextTick, ref, resolveComponent, vShow, watch, watchEffect, withDirectives } from "vue";
import { table } from "./table";
import { StyleType, position, tableSchema } from "@/types/schema";
import { column, createColumn } from "./column";
import { VxeGridProps, VxeGrid, VxeColumnProps } from "vxe-table";
import { getRenderFn } from "./columnFn";
import { getDialogPosition } from "./dialogFn";
import { getMouseEventPosition } from "@/utils/utils";
import { createDialog } from "./dialog";
import tableBodyMenu from "./tableColumnCom/tableBodyMenu";
import tableHeaderMenu from "./tableColumnCom/tableHeaderMenu";
import { createContextMenu } from "./businessTable/contextMenu";
import contextMenuView from "./schemaComponent/contextMenuView";


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
        const rowConfig = table.tableConfig.rowConfig
        const rowHeight = rowConfig?.rowHeight || 30
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
        const limitSize = table.tableConfig.limitSize
        // const _data1 = _data.slice(0, limitSize)
        const _data1 = _data.slice(0)
        table.tableData.showData = _data1
        return _data1
    })
}

export const getOptionsColumns = (table: table) => {
    return computed(() => {
        const tableConfig = table.tableConfig
        const checkBoxColumn = tableConfig.showCheckBoxColumn == true ? { type: 'checkbox', width: 50, field: 'checkboxField', align: 'center', resizable: false } as VxeColumnProps : null
        const seqColumn = tableConfig.showSeqColumn == true ? { type: "seq", width: 100, align: 'center', resizable: false } as VxeColumnProps : null
        const defaultColumns = [seqColumn, checkBoxColumn].filter(col => col != null)
        const columns = [
            ...defaultColumns,
            ...tableConfig.columns.map((col: any) => col.renderColumn),]
        return columns
    })
}
//leader

//手下
//掌管  
//部门
//大学生
//未成年


export const getOptionsTreeConfig = (table: table) => {
    return computed(() => {
        return null
    })
}


export const getOptionsScrollX = (table: table) => {
    return computed(() => {
        return {
            enabled: true,
            mode: 'default',
            gt: 0
        }
    })
}
/* 
 scrollY: {
                enabled: true,
                mode: 'default',
                gt: 200
            },
            //横向滚动
            scrollX: {
                enabled: true,
                mode: 'default',
                gt: 50
            },
*/
export const getOptionsScrollY = (table: table) => {
    return computed(() => {
        return {
            enabled: true,
            mode: 'wheel',
            gt: 0
        }
    })
}

export const getOptionsRowConfig = (table: table) => {
    return computed(() => {
        const rowConfig = table.tableConfig.rowConfig
        const rowHeight = rowConfig?.rowHeight
        return {
            height: rowHeight,
            isHover: true,
            useKey: false
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
            if (row == curRow && column.field == curColumn?.columnConfig.field && column?.field != null) {
                return ['rowSelect', 'cellDefaultClass']
            }
            return ['cellDefaultClass']
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
    // gridOptions.columns = table.tableConfig.columns
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
    gridOptions.showHeaderOverflow = 'ellipsis'
    gridOptions.height = getOptionsHeight(table) as any
    gridOptions.minHeight = '150px'
    gridOptions.showFooter = getOptionsShowFooter(table) as any
    gridOptions.showHeader = getOptionsShowHeader(table) as any
    gridOptions.stripe = true
    gridOptions.border = true
    gridOptions.menuConfig = { enabled: true }
}
export const getOptionsColumnConfig = (table: table) => {
    return computed(() => {
        return {
            useKey: true,
            minWidth: 100
        }
    })
}
export const initComponent = (table: table) => {
    const _this = table
    const show = computed(() => {
        return table.displayState == 'show'
    })
    const destroy = computed(() => {
        return table.displayState == 'destroy'
    })
    const bodyMenu = computed(() => {
        let com: any = null
        if (table.tableConfig.showBodyMenuDialog == true) {
            // com = table.pageRef.bodyContext!.component!()
            com = h(contextMenuView, { contextMenuInstance: table.pageRef.bodyContext })
        } else {
            com = null
        }
        return com
    })
    const headerMenu = computed(() => {
        let com: any = null
        if (table.tableConfig.showHeaderMenuDialog == true) {
            // com = table.pageRef.bodyContext!.component!()
            com = h(contextMenuView, { contextMenuInstance: table.pageRef.headerContext })
        } else {
            com = null
        }
        return com
    })
    const _vNode = () => {
        const options = table.gridOptions
        const _class = ['h-full', 'w-full']
        _class.push('grid-border-none')
        if (destroy.value == true) {
            return null
        }
        const outSizeDiv = getRenderFn('div',
            {
                tabIndex: '0',
                class: _class,
            },
            [[{
                mounted(div) {
                    const effectPool = table.effectPool
                    if (Object.keys(effectPool).length == 0) {
                        initSchema(table)
                    }
                }, unmounted() {
                    const dialogMap = table.dialogMap
                    Object.values(dialogMap).forEach(value => {
                        table.destroyDialog(value)
                    })
                    const effectPool = table.effectPool
                    Object.entries(effectPool).forEach(([key, effect]: any) => {
                        if (effect) {
                            effect()
                            delete effectPool[key]
                        }
                    })

                }
            }]]
        )
        const xeinstacne = ref(null)
        const vxeGridCom = withDirectives(h(VxeGrid, {
            ...options, ref: xeinstacne,
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
            onScroll: (params: any) => {
                const { scrollTop, scrollWidth, bodyWidth, bodyHeight, scrollLeft } = params
                table.scrollConfig.scrollTop = scrollTop
                table.scrollConfig.scrollWidth = scrollWidth
                table.scrollConfig.bodyHeight = bodyHeight
                table.scrollConfig.bodyWidth = bodyWidth
                table.scrollConfig.scrollLeft = scrollLeft
            },
            onCellMenu: (params: any) => {
                const { row, column, $event } = params
                // console.log(table.pageRef)
                // const position = getMouseEventPosition($event)
                const tableConfig = _this.tableConfig
                table.openBodyMenu($event)
                const onCellMenu = tableConfig.onCellMenu
                if (typeof onCellMenu == 'function') {
                    onCellMenu({ row, column } as any)
                }
            }
        }), [[{
            mounted: (el, node) => {
                table.pageRef.vxeGrid = xeinstacne.value as any
                const scrollConfig = table.scrollConfig
                table.scrollToPosition(scrollConfig.scrollLeft, scrollConfig.scrollTop)
            },
            unmounted: () => {
                table.pageRef.vxeGrid = null as any
            },
        }]])
        // const _bodyMenu = table.tableConfig.showBodyMenuDialog == true ? h(tableBodyMenu, { table: table }) : null
        // const _headerMenu = table.tableConfig.showHeaderMenuDialog == true ? h(tableHeaderMenu, { table: table }) : null
        // const _bodyMenu = table.tableConfig.showBodyMenuDialog == true ? h(contextMenuView, { contextMenuInstance: table.pageRef.bodyContext }) : null
        // const _headerMenu = table.tableConfig.showHeaderMenuDialog == true ? h(contextMenuView, { contextMenuInstance: table.pageRef.headerContext }) : null
        let _bodyMenu = bodyMenu.value
        let _headerMenu = headerMenu.value
        const inSizeGrid = outSizeDiv([vxeGridCom,
            _bodyMenu,
            _headerMenu
        ])
        const _inSizeGrid = withDirectives(inSizeGrid, [[vShow, show.value]])
        return _inSizeGrid
    }
    table.component = _vNode
}

export const initSchema = (table: table) => {
    const schema: tableSchema = table.schema as any
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
                    if (['data',].includes(key)) {
                        tableData.data = schema['data'] as any || []
                        tableData.showData = schema['data'] as any || []
                    } else {
                        _tableConfig[key] = schema[key]
                    }
                })
            }
        }
    }
}

export const initTableConfig = (table: table) => {
    initSchema(table)
    // 最后才会初始化Component
    initTableMenu(table)
    initGridOptions(table)
    initComponent(table)
}
export const initTableMenu = (table: table) => {
    //只初始化一次
    if (table.pageRef.bodyContext != null || table.pageRef.headerContext != null) {
        return
    }
    const menuConfig = table.menuConfig
    const headerList = menuConfig.headerMenu.list
    const bodyList = menuConfig.bodyMenu.list
    const headerContext = createContextMenu({ list: headerList })
    const bodyContext = createContextMenu({ list: bodyList })
    table.pageRef.headerContext = headerContext
    table.pageRef.bodyContext = bodyContext
}



