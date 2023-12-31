import { computed, getCurrentInstance, h, isReactive, nextTick, onMounted, reactive, ref, resolveComponent, vShow, watch, watchEffect, withDirectives } from "vue";
import { table } from "./table";
import { StyleType, filterConfig, position, tabItemConfig, tableSchema } from "@/types/schema";
import { column, createColumn } from "./column";
import { VxeGridProps, VxeGridEventProps, VxeGrid, VxeColumnProps, VxeColumnSlotTypes, VxeSelect, VxeButton, VxeGridEmits, VxeGridEvents } from "vxe-table";
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
import checkboxCom from "./tableColumnCom/checkboxCom";
import { createInput } from "./input";
import { getIcon } from "./icon";
import { createTab } from "./tab";

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




//leader

//手下
//掌管  
//部门
//大学生
//未成年




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



export const initGridOptions = (table: table) => {
    const _this = table
    const gridOptions = table.gridOptions as VxeGridProps & VxeGridEventProps
    // table.tableConfig.columns
    gridOptions.columns = computed(() => {
        const tableConfig = table.tableConfig
        // const checkboxConfig = tableConfig.checkboxConfig 
        const checkBoxColumn = tableConfig.showCheckBoxColumn == true ? { type: 'checkbox', width: 50, field: 'checkboxField', align: 'center', resizable: false, } as VxeColumnProps : null
        const seqColumn = tableConfig.showSeqColumn == true ? { type: "seq", width: 100, align: 'center', resizable: false } as VxeColumnProps : null
        const defaultColumns = [seqColumn, checkBoxColumn].filter(col => col != null)
        if (tableConfig.isTree == true) {
            if (checkBoxColumn) {
                checkBoxColumn.treeNode = true
                //@ts-ignore 
                checkBoxColumn.slots = { checkbox: "checkbox" }
                checkBoxColumn.width = 300
                checkBoxColumn.align = 'left'
                checkBoxColumn.params = table
            }
            return [...defaultColumns]
        }
        const columns = [
            ...defaultColumns,
            ...tableConfig.columns.map((col: any) => { return { ...col.renderColumn } }),]
        return columns
    }) as any
    //@ts-ignore 
    gridOptions.scrollX = {//先写死吧
        enabled: true,
        gt: 10,
        oSize: 10,
    }
    gridOptions.treeConfig = computed(() => {
        let isTree = table.tableConfig.isTree
        if (!isTree) {
            return null
        }
        const parentId = table.tableConfig.treeParentId || 'parentId'
        const rowField = table.tableConfig.treeRowField || 'id'
        const transform = table.tableConfig.treeTransform
        const obj = { parentId, rowField, transform, iconOpen: 'vxe-icon-square-minus', iconClose: 'vxe-icon-square-plus', accordion: true, line: true, }
        return obj
    }) as any
    // getOptionsScrollX(table) as any
    gridOptions.scrollY = {
        enabled: true,
        mode: 'default',
        gt: 0,
        oSize: 0,
    }
    // getOptionsScrollY(table) as any
    gridOptions.rowConfig = computed(() => {
        const rowConfig = table.tableConfig.rowConfig
        const rowHeight = rowConfig?.rowHeight
        return {
            height: rowHeight,
            isHover: true,
            useKey: false
        }
    }) as any
    gridOptions.columnConfig = computed(() => {
        return {
            useKey: false,
            minWidth: 100
        }
    }) as any
    gridOptions.rowClassName = computed(() => {
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
    }) as any
    gridOptions.cellClassName = computed(() => {
        return ({ row, column }: any) => {
            const curRow = table.tableData.curRow
            const curColumn = table.tableData.curColumn
            if (row == curRow && column?.field == curColumn?.columnConfig?.field && column?.field != null) {
                return ['rowSelect', 'cellDefaultClass']
            }
            return ['cellDefaultClass']
        }
    }) as any
    // gridOptions.filterConfig = getOptionsFilterConfig(table) as any
    gridOptions.checkboxConfig = computed(() => {
        const tableConfig = table.tableConfig
        let checkboxConfig = { ...tableConfig.checkboxConfig }
        if (tableConfig.isTree == true) {
            checkboxConfig.range = false
        }
        let checkLabelField = table.tableConfig.checkLabelField
        if (Boolean(checkLabelField) != false) {
            checkboxConfig.labelField = checkLabelField
        }
        let hiddenCheckbox = table.tableConfig.hiddenCheckbox
        if (hiddenCheckbox == true) {
            // checkboxConfig.visibleMethod = () => {
            //     return false
            // } 
        }
        return checkboxConfig
    }) as any
    gridOptions.showOverflow = 'ellipsis'
    gridOptions.showHeaderOverflow = 'ellipsis'
    gridOptions.height = computed(() => {
        const tableConfig = table.tableConfig

        let height = tableConfig.height
        if (typeof height == 'number') {
            height = `${height}px`
        }
        return height
    }) as any
    // gridOptions.height = '400px'
    gridOptions.minHeight = '150px'
    gridOptions.headerAlign = 'center'
    gridOptions.showFooter = computed(() => {
        const columns = table.tableConfig.columns
        const showFooter = columns.reduce((res: boolean, item) => {
            if (res == true) {
                return res
            }
            const showFooter: any = item.columnConfig.showFooter
            if (showFooter === true) {
                return true
            }
            return res
        }, false)
        return showFooter
    }) as any
    gridOptions.showHeader = computed(() => {
        return table.tableConfig.showHeader
    }) as any
    gridOptions.headerRowStyle = {
        height: `${table.tableConfig.headerConfig?.rowHeight}px`
    }
    gridOptions.stripe = true
    gridOptions.border = true
    gridOptions.menuConfig = { enabled: true }
    gridOptions.onCellClick = async (value) => {
        // _this.curRowChange()
        const row = value.row
        const column = value.column?.params
        await _this.curRowChange({ row: row, column: column })
        //cellCloick
        const tableConfig = _this.tableConfig
        const onCellClick = tableConfig.onCellClick
        if (typeof onCellClick == 'function') {
            onCellClick(value as any)//cell点击事件
        }
    }

    gridOptions.onCellDblclick = async (value) => {
        const row = value.row
        const column = value.column?.params
        await _this.dbCurRowChange({ row: row, column: column })
    }
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
    const globalInputShow = computed(() => {
        return table.tableConfig.globalWhereShow
    })
    const _vNode = () => {
        const options = table.gridOptions
        if (destroy.value == true) {
            return null
        }
        const outSizeDiv = getRenderFn('div',
            {
                class: ['grid-border-none'],
                style: { height: '100%', width: '100%', position: 'relative', display: "flex", flexDirection: 'column' } as StyleType
            },
            [[{
                mounted(div) {
                    table.autoRefreshData()
                }, unmounted() {
                    table.tableConfig.globalWhere = ''
                    const effectPool = table.effectPool
                    effectPool['refreDataEffect']()
                }
            }]]
        )
        const vxeGridCom = withDirectives(h(VxeGrid, {
            ...options, ref: 'xeinstacne',
            // onCellClick: ({ row, column }: any) => {
            //     // _this.curRowChange()
            //     _this.setCurRow(row)
            //     _this.setCurColumn(column)
            //     const tableConfig = _this.tableConfig
            //     const onCellClick = tableConfig.onCellClick
            //     if (typeof onCellClick == 'function') {
            //         onCellClick({ row, column } as any)
            //     }

            // },
            // onCellDblclick: ({ row, column }) => {
            //     console.log('cellDbClick')
            // },
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
            //这里都是checkboxChange的东西
            onCheckboxChange: (value) => {
                const row = value.row
                const records = value.records
                _this.checkboxChange(row, records)
                // const checkChange = table.tableConfig.onCheckboxChange as any
                // if (typeof checkChange == 'function') {
                //     const row = value.row
                //     const records = value.records
                //     checkChange(row, records)//哪一行改变了
                // }
            },
            onCheckboxRangeEnd: (value) => {
                // const row = value.row
                const records = value.records
                _this.checkboxChange(records, records)
                // const checkChange = table.tableConfig.onCheckboxChange as any
                // if (typeof checkChange == 'function') {
                //     const row = value.records
                //     checkChange(row, row)
                // }
            },
            onCheckboxAll: (value) => {
                const records = value.records
                _this.checkboxChange(records, records)
            }
        }, {
            /* 
                这里是插槽
            */
            header: (params: any) => {
                return h(defaultHeaderCom, { column: params.column.params })
            },
            showValue: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                return h(showValueCom, { column: params.column.params, row: params.row, })
            },
            checkbox: (params: any) => {
                return h(checkboxCom, { indeterminate: params.indeterminate, column: params.column, checked: params.checked, row: params.row })
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
            float: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            int: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
                const column = params.column.params as column
                const renderFormitem = column.renderFormitem
                const field = column.columnConfig.field
                return h(inputView, { renderFormitem, field: field, data: params.row, key: column.columnConfig.editType, table: column.table, column: column })
            },
            decimal: (params: VxeColumnSlotTypes.DefaultSlotParams) => {
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
                table.pageRef!.vxeGrid = node.instance?.$refs.xeinstacne as any

            },
            unmounted: () => {
                table.pageRef.vxeGrid = null as any
            },
        }]])
        const _bodyMenu = table.tableConfig.showBodyMenuDialog == true ? h(contextMenuView, { contextMenuInstance: table.pageRef.bodyContext }) : null
        const _headerMenu = table.tableConfig.showHeaderMenuDialog == true ? h(contextMenuView, { contextMenuInstance: table.pageRef.headerContext }) : null
        const inputInstance = table.pageRef.globalInput
        const inputBtn1 = withDirectives(h(VxeButton, {
            onClick: () => {
                console.log('search')
            }
        }, () => { return getIcon({}, 'vxe-icon-search')() }), [[vShow, table.tableConfig.globalWhereSearchShow], [{
            mounted: (el, binding) => {
            },
            updated: (el, binding) => {
            }
        }, table.tableConfig.globalWhereSearchShow]])

        //vxe-icon-close
        const inputBtn2 = withDirectives(h(VxeButton, {
            onClick: () => {
                table.tableConfig.globalWhere = ''
                table.closeGlobalWhere()
            }
        }, () => { return getIcon({}, 'vxe-icon-close')() }), [[vShow, table.tableConfig.globalWhereCloseShow]])
        const inputDiv = withDirectives(
            h('div', { class: ['flex flex-row'], style: { width: '100%' } }, [h(inputView, {
                inputInstance: inputInstance, style: {
                    // width: "50%"
                    flex: 1
                }
            },),
                inputBtn1,
                inputBtn2
            ])
            , [[vShow,
                globalInputShow.value
            ]])
        const vxeGridDiv = h('div', { style: { flex: '1' } }, [vxeGridCom])
        const inSizeGrid = outSizeDiv([
            inputDiv,
            vxeGridDiv,
            _bodyMenu,
            _headerMenu,
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
    const _this = table
    if (schema != null && Object.keys(schema).length > 0) {
        const _tableConfig = table.tableConfig as any
        const tableData = table.tableData
        const effectPool = _this.effectPool
        const permission: any = _this.tablePermission
        for (const key of Object.keys(schema)) {
            if (key == 'columns') {
                //这种就不需要了呀
                continue
            }
            if (/^can/i.test(key)) {//使用权限
                effectPool[`table${key}Effect`] = watchEffect(() => {
                    permission[key] = schema[key]
                })
                continue
            }
            if (key == 'data') {
                effectPool['tabledataEffect'] = watchEffect(() => {
                    const _data = schema['data'] || []
                    tableData.data = _data
                    tableData.showData = _data
                    nextTick(() => {
                        _data.forEach(row => {
                            let _str = ''
                            table.tableConfig.columns.forEach((col) => {
                                const _col: column = col as any
                                let str = _col.formatJsonRow(row)
                                if (str == '') {
                                    return
                                }
                                _str = `${_str}^^^${str}`
                            })
                            row['vHtml'] = _str
                        })
                    })
                })
                continue
            }
            const _value = schema[key]
            if (_value != null) {
                table.effectPool[`table${key}Effect`] = watchEffect(() => {
                    _tableConfig[key] = schema[key]
                })
            }
        }
    }
}


export const initTableColumn = (table: table) => {
    const schema = table.schema
    const tableConfig = table.tableConfig
    //@ts-ignore
    const _columns = schema['columns'] || []
    tableConfig.columns = _columns?.map(col => {
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
    initTableGlobalWhere(table)
    initGridOptions(table)
    initRenderFilterColTable(table)
    initRenderFilterTable(table)
    initComponent(table)
}
export const initTableGlobalWhere = (table: table) => {
    // const renderInput=table.
    const renderWhereInput = table.renderWhereInput
    renderWhereInput.type = 'text'
    renderWhereInput.clearable = true
    renderWhereInput.onChange = ({ value }: any) => {
        table.tableConfig.globalWhere = value
        console.log(table.tableConfig.globalWhere, 'testWhere')
    }
    renderWhereInput.modelValue = computed(() => {
        return table.tableConfig.globalWhere
    }) as any
    const inputInstance = createInput(renderWhereInput)
    table.pageRef.globalInput = inputInstance
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
        title: "条件类型",
        options: [
            { label: "大于", value: ">" },
            { label: "等于", value: '=' },
            { label: "小于", value: "<" },
            { label: "包含", value: "%" },
            { label: "大于等于", value: ">=" },
            { label: "小于等于", value: "<=" },
            { label: "为空", value: "null" },
            { label: "非空", value: "not null" },

        ],
        onChange: (value) => {
            console.log(value)
        }
    }, {
        type: "string",
        editType: "string",
        field: "value",
        title: "值"//条件的值
    }]
    const filterColTable = createTable(renderFilterColTable)
    filterColTable.tableState = 'fullEdit'
    table.pageRef.filterColTable = filterColTable as any
}

export const initRenderFilterTable = (table: table) => {
    if (table?.tableConfig.showHeaderFilter == false) {
        return
    }
    const renderFilterTable = table.renderFilterTable
    renderFilterTable.columns = [{
        // field: "value",
        // title: "值",
        field: 'value',
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
    renderFilterTable.globalWhereShow = true
    renderFilterTable.showBodyMenuDialog = false
    renderFilterTable.showHeaderMenuDialog = false
    renderFilterTable.globalWhereCloseShow = false
    renderFilterTable.globalWhereSearchShow = false
    // //@ts-ignore
    renderFilterTable.onCheckboxChange = (row, record) => {
        const _record = record//is Array
        const curFilterColumn = table.tableData.curFilterColumn
        const field = curFilterColumn?.columnConfig.field
        const _valueArr = _record.map((row: any) => row['value'])
        const filterConfig = table.tableConfig.filterConfig?.find(config => config.field == field)
        filterConfig!.filterData = _valueArr
    }
    const _table = createTable(renderFilterTable)
    //@ts-ignore
    table.pageRef.filterTable = _table
    // // const renderFilterCalTable = table.renderFilterCalTable
    // // const _table1 = createTable(renderFilterCalTable)
    // //@ts-ignore
    // // table.pageRef.filterCalTable = _table1
    const tabInstance = createTab({
        //@ts-ignore 
        tabItems: [
            { instance: _table, key: "array", tab: "值过滤", renderKey: "array", renderComName: "instanceView" },
            { instance: table.pageRef.filterColTable, key: "cal", tab: "值过滤", renderKey: "cal", renderComName: "instanceView" },
        ] as tabItemConfig[]
    })
    table.pageRef.tabInstance = tabInstance

}

export const initTableMenu = (table: table) => {
    //只初始化一次
    initHeaderMenu(table)
    initBodyMenu(table)
}



export const initHeaderMenu = (table: table) => {
    if (table.pageRef.headerContext != null) {
        return
    }
    const menuConfig = table.menuConfig
    const headerList = menuConfig.headerMenu.list
    const headerContext = createContextMenu({ list: headerList })
    headerContext.getTable = () => {
        return table
    }
    table.pageRef.headerContext = headerContext
}

export const initBodyMenu = (table: table) => {
    if (table.pageRef.bodyContext != null) {
        return
    }
    const menuConfig = table.menuConfig
    const bodyList = menuConfig.bodyMenu.list
    const bodyContext = createContextMenu({ list: bodyList })
    bodyContext.getTable = () => { return table }
    table.pageRef.bodyContext = bodyContext
}