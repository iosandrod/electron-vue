import { computed, getCurrentInstance, h, isReactive, nextTick, onMounted, reactive, ref, resolveComponent, vShow, watch, watchEffect, withDirectives } from "vue";
import { table } from "./table";
import { StyleType, filterConfig, position, tableSchema } from "@/types/schema";
import { column, createColumn } from "./column";
import { VxeGridProps, VxeGrid, VxeColumnProps, VxeColumnSlotTypes, VxeSelect } from "vxe-table";
import { getRenderFn } from "./columnFn";
import { getDialogPosition } from "./dialogFn";
import { getMouseEventPosition, styleBuilder } from "@/utils/utils";
import { createDialog } from "./dialog";
import { createContextMenu } from "./businessTable/contextMenu";
import contextMenuView from "./schemaComponent/contextMenuView";
import { createTable } from "./table"
import { createFormItem } from "./formitem";
import defaultHeaderCom from "./tableColumnCom/defaultHeaderCom";
import showValueCom from "./tableColumnCom/showValueCom";
import inputView from "./schemaComponent/inputView";
import { Select, TableColumn } from "ant-design-vue";
import baseInfoInputView from "./schemaComponent/baseInfoInputView";

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
        let showData = table.tableData.data
        const filterConfig = table.tableConfig.filterConfig!
        let arrayFilterConfig = filterConfig.filter(item => item.filterType == 'array')
        const _data = showData.filter((row: any, i, arr) => {
            let state = true
            for (const config of arrayFilterConfig) {
                let field = config.field!
                let filterArr = config.filterData || []
                if (filterArr.length == 0 || state == false) {
                    continue
                }
                let _value: any = row[field]
                //@ts-ignore
                if (!filterArr.includes(_value)) {
                    state = false
                }
            }
            return state
        })
        //使用loadData获取好像更好一些
        const _data1 = _data.slice(0)
        table.tableData.showData = _data1
        // nextTick(async () => {
        //     const vxeGrid = table.pageRef.vxeGrid
        //     vxeGrid?.reloadData(_data).then(res => {
        //         const scrollConfig = table.scrollConfig
        //         const scrollTop = scrollConfig.scrollTop
        //         const scrollLeft = scrollConfig.scrollLeft
        //         vxeGrid.scrollTo(scrollLeft, scrollTop)
        //     })
        // })
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
            ...tableConfig.columns.map((col: any) => { return { ...col.renderColumn } }),]
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
            gt: 10,
            oSize: 5,
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
            if (row == curRow && column?.field == curColumn?.columnConfig?.field && column?.field != null) {
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
    // table.tableConfig.columns
    gridOptions.columns = getOptionsColumns(table) as any
    // gridOptions.renderData = getOptionsData(table) as any
    //@ts-ignore 
    gridOptions.data = getOptionsData(table) as any
    // gridOptions.treeConfig = getOptionsTreeConfig(table) as any
    gridOptions.scrollX = {//先写死吧
        enabled: true,
        gt: 10,
        oSize: 5,
    }
    // getOptionsScrollX(table) as any
    gridOptions.scrollY = {
        enabled: true,
        mode: 'default',
        gt: 0,
        oSize: 0,
    }
    // getOptionsScrollY(table) as any
    gridOptions.rowConfig = getOptionsRowConfig(table) as any
    gridOptions.columnConfig = getOptionsColumnConfig(table) as any
    gridOptions.rowClassName = getOptionsRowClassName(table) as any
    gridOptions.cellClassName = getOptionsCellClassName(table) as any
    gridOptions.filterConfig = getOptionsFilterConfig(table) as any
    gridOptions.checkboxConfig = getOptionsCheckboxConfig(table) as any
    gridOptions.showOverflow = 'ellipsis'
    gridOptions.showHeaderOverflow = 'ellipsis'
    gridOptions.height = getOptionsHeight(table) as any
    gridOptions.minHeight = '150px'
    gridOptions.headerAlign = 'center'
    gridOptions.showFooter = getOptionsShowFooter(table) as any
    gridOptions.showHeader = getOptionsShowHeader(table) as any
    gridOptions.headerRowStyle = {
        height: `${table.tableConfig.headerConfig?.rowHeight}px`
    }
    gridOptions.stripe = true
    gridOptions.border = true
    gridOptions.menuConfig = { enabled: true }
}
export const getOptionsColumnConfig = (table: table) => {
    return computed(() => {
        return {
            useKey: false,
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
    //别用闭包，搞死人
    const _vNode = () => {
        const options = table.gridOptions
        if (destroy.value == true) {
            return null
        }
        const outSizeDiv = getRenderFn('div',
            {
                class: ['grid-border-none'],
                style: { height: '100%', width: '100%', position: 'relative' } as StyleType
            },
            [[{
                mounted(div) {
                    const effectPool = table.effectPool
                    if (Object.keys(effectPool).length == 0) {
                        initSchema(table)
                    }
                    table.autoRefreshData()
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
                const _event: MouseEvent = $event
                _event.preventDefault()
                const tableConfig = _this.tableConfig
                table.openBodyMenu($event)
                const onCellMenu = tableConfig.onCellMenu
                if (typeof onCellMenu == 'function') {
                    onCellMenu({ row, column } as any)
                }
            },
            onCheckboxChange: (value) => {
                const checkChange = table.tableConfig.onCheckboxChange as any
                if (typeof checkChange == 'function') {
                    const row = value.row
                    const records = value.records
                    checkChange(row, records)//哪一行改变了
                }
            },
            onCheckboxRangeEnd: (value) => {
                const checkChange = table.tableConfig.onCheckboxChange as any
                if (typeof checkChange == 'function') {
                    const row = value.records
                    checkChange(row, row)
                }
            },
            onCheckboxAll: (value) => {
                const checkChange = table.tableConfig.onCheckboxChange as any
                if (typeof checkChange == 'function') {
                    const row = value.records
                    checkChange(row, row)
                }
            }
        }, {
            /* 
                这里是插槽
            */
            header: (params: any) => {
                return h(defaultHeaderCom, { column: params.column.params })
            },
            showValue: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                // return h('div')
                return h(showValueCom, { column: params.column.params, row: params.row })
            },
            select: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            string: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            baseInfo: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            date: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            datetime: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            time: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            number: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            wangEditor: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            rowEdit: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const getRowEditType = column.columnConfig.getRowEditType as any
                const _type = getRowEditType(params.row, column)
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: _type, table: column.table, type: _type })
            },
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
        const _bodyMenu = table.tableConfig.showBodyMenuDialog == true ? h(contextMenuView, { contextMenuInstance: table.pageRef.bodyContext }) : null
        const _headerMenu = table.tableConfig.showHeaderMenuDialog == true ? h(contextMenuView, { contextMenuInstance: table.pageRef.headerContext }) : null
        const inputDiv = h('div', { style: { height: '100px', width: "100px", background: 'red', position: 'absolute', } as StyleType })
        const inSizeGrid = outSizeDiv([vxeGridCom,
            _bodyMenu,
            _headerMenu,
            // inputDiv
        ])
        const _inSizeGrid = withDirectives(inSizeGrid, [[vShow, show.value]])
        return _inSizeGrid
    }
    table.component = _vNode
}

export const initSchema = (table: table) => {
    const schema: tableSchema = table.schema as any
    let showHeaderFilter = schema.showHeaderFilter
    if (showHeaderFilter === false) {
        table.tableConfig.showHeaderFilter = false
    }
    const tableConfig: any = table.tableConfig
    if (schema != null && Object.keys(schema).length > 0) {
        for (const key of Object.keys(schema)) {
            let tableConfig: any = table.tableConfig
            if (key == 'columns') {
                //这种就不需要了呀
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
        // tableConfig.columns = schema['columns']?.map(col => {
        //     if (col instanceof column) {
        //         return col
        //     }
        //     return createColumn(col, table)
        // })
    }
}
export const initTableColumn = (table: table) => {
    const schema = table.schema
    const tableConfig = table.tableConfig
    //@ts-ignore
    tableConfig.columns = schema['columns']?.map(col => {
        if (col instanceof column) {
            return col
        }
        return createColumn(col, table)
    })
    tableConfig.filterConfig = tableConfig.columns.map(col => {
        let field = col.columnConfig?.field!
        let obj: filterConfig = {
            field: field,
            filterType: "array",
            filterData: [],
            calCondition: []
        }
        return obj
    })
}
export const initTableConfig = (table: table) => {
    initSchema(table)
    initTableColumn(table)
    // 最后才会初始化Component
    initTableMenu(table)
    initGridOptions(table)
    initRenderFilterTable(table)
    initRenderFilterColTable(table)
    initComponent(table)
}

export const initRenderFilterColTable = (table: table) => {
    const renderFilterColTable = table.renderFilterColTable
    if (table?.tableConfig.showHeaderFilter == false) {
        return
    }
    renderFilterColTable.showHeaderFilter = false
    renderFilterColTable.showSeqColumn = false
    renderFilterColTable.showHeaderFilter = false
    renderFilterColTable.showBodyMenuDialog = false
    renderFilterColTable.showHeaderMenuDialog = false
    renderFilterColTable.columns = [{
        //@ts-ignore
        type: 'string',
        field: "operator",
        editType: "select",
        options: [
            { label: "大于", value: ">" },
            { label: "等于", value: '=' },
            { label: "小于", value: "<" },
            { label: "包含", value: "%" }
        ],
        onChange: (value) => {
            console.log(value)
        }
    }]
    const filterColTable = createTable(renderFilterColTable)
    filterColTable.tableState = 'fullEdit'
    table.pageRef.filterColTable = filterColTable
}

export const initRenderFilterTable = (table: table) => {
    if (table?.tableConfig.showHeaderFilter == false) {
        return
    }
    const renderFilterTable = table.renderFilterTable
    renderFilterTable.columns = [{
        field: "value",
        title: "值",
        width: 150
    }]
    renderFilterTable.showSeqColumn = false
    renderFilterTable.showHeaderFilter = false
    renderFilterTable.headerConfig = {
        rowHeight: 25
    }
    renderFilterTable.rowConfig = {
        height: 25,
        isHover: true,
        rowHeight: 25
    }
    renderFilterTable.showBodyMenuDialog = false
    renderFilterTable.showHeaderMenuDialog = false
    //@ts-ignore
    renderFilterTable.onCheckboxChange = (row, record) => {
        const _record = record//is Array
        const curFilterColumn = table.tableData.curFilterColumn
        const field = curFilterColumn?.columnConfig.field
        const _valueArr = _record.map((row: any) => row['value'])
        const filterConfig = table.tableConfig.filterConfig?.find(config => config.field == field)
        filterConfig!.filterData = _valueArr
    }
    const _table = createTable(renderFilterTable)
    table.pageRef.filterTable = _table
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



