import { ComputedRef, Directive, Teleport, VNode, computed, h, isReactive, isRef, isVNode, nextTick, reactive, ref, watchEffect, withDirectives } from "vue"
import { column } from "./column"
import { StyleType } from "@/types/schema"
import { getTableHeaderHeight, getTableRowHeight } from "./tableFn"
import { isUndefined } from 'xe-utils'
import { getIcon, propsConfig, useCenterDiv, useMousePoint, usePropsDiv } from "./icon"
import { getFixedPosition, getMouseEventPosition, getPercentLength, getTransformPosition, getTranslate3D, registerDocumentClickFn } from "@/utils/utils"
import { isString } from "lodash"
import defaultCom from "./tableColumnCom/defaultCom"
import defaultHeaderCom from './tableColumnCom/defaultHeaderCom'
import { Dropdown } from "ant-design-vue"
import columnFilterCom from "./tableColumnCom/columnFilterCom"
import { VxeColumnSlots, VxePulldown } from "vxe-table"
import { createTable } from "./table"
import { createFormItem, formitem } from "./formitem"
import { _columns } from "./entityColumn"
// import { system } from "./system"
export const getOutSizeDiv = (column: column, row: any) => {
    const style: StyleType = {//外部div的配置
        width: '100%',
    }
    const inSizeDiv = getInSizeDiv(column, row)
    const value = row[column.renderColumn.field as string]
    return getRenderFn('div', { style: { ...style } })([inSizeDiv([value])])
}
export const getColumnRowHeight = (column: column, row?: any) => {
    const table = column.table!
    return computed(() => {
        const rowHeight = getTableRowHeight(table).value
        return rowHeight
    })
}

export const getColumnHeaderHeight = (column: column) => {
    const table = column.table!
    return computed(() => {
        const rowHeight = getTableHeaderHeight(table).value
        return rowHeight
    })
}

//得到内部的div
export const getInSizeDiv = (column: column, row: any) => {
    const style = {}
    return getRenderFn('div', { style: { ...style } })
}

//directive 是指令注册
export const getRenderFn = (node: string | VNode, props: any, directive?: Array<[Directive]>) => {
    return (nestNode?: any[] | any) => {
        let _nestNode: any = null
        let vnode: any = null
        if (Array.isArray(nestNode)) {
            _nestNode = nestNode
        } else if (isVNode(nestNode)) {
            _nestNode = nestNode
        } else if (isString(nestNode)) {
            _nestNode = [nestNode]
        } else if (nestNode == null) {
            _nestNode = []
        } else if (typeof nestNode == 'object') {
            _nestNode = nestNode
        }
        if (isVNode(node)) {
            // node.children
            vnode = node
        } else {
            vnode = h(node, props, _nestNode)
        }
        if (directive != null) {
            if (Array.isArray(directive)) {
                return withDirectives(vnode, directive)
            }
            return withDirectives(vnode, [[directive]])
        }
        return vnode
    }
}

export const getStringEditDiv = (column: column, row: any) => {
    //字符串编辑div

}

export const getDateTimeEditDiv = (column: column, row: any) => {

}


export const getDateEditDiv = (column: column, row: any) => {

}

export const getTimeEditDiv = (column: column, row: any) => {

}



export const getSlotDefault = (_column: column) => {
    const slots = _column.columnConfig.slots as any
    const slotsDefault = slots?.default
    if (typeof slotsDefault == 'function') {
        return slotsDefault
    }
    const fn = ({ row, rowIndex, column }: any) => {
        const _defaultCom = h(defaultCom, { column: _column, row: row })
        return _defaultCom
    }
    return fn
    // return computed(() => {
    // })
}

export const getColumnSlot = (column: column) => {
    return computed(() => {
        const columnConfig = column.columnConfig
        const type = columnConfig.type
        // 使用默认插槽
        if (type == 'seq') {
            return {
                header: () => {
                    return h('div', {}, [])
                }
            }
        }
        if (type == 'checkbox' || type == 'radio') {
            return {}
        }
        let slots: any = {}
        const _default = getSlotDefault(column)//默认的
        // const _header = getSlotHeader(column)//表头的显示
        slots.default = _default
        slots.header = 'header'
        return slots
    })
}

export const getSlotHeader = (_column: column) => {
    const fn = (params: any) => {
        //过滤图标 w4
        return h(defaultHeaderCom, { column: _column })
    }
    return fn
    // return computed(() => {
    // })
}

export const getSlotHeaderFilterIcon = (_column: column) => {//获取头部的图标
    const divRef = ref(null)
    const filterIconFn = useMousePoint({
        capture: true,
        onClick: (event: MouseEvent) => {
            _column.table!.tableData.curFilterColumn = _column
            const _position = getMouseEventPosition(event)
            const position1 = _column.columnConfig.filterPosition!
            //@ts-ignore
            position1.mouseLeft = _position.left
            //@ts-ignore
            position1.mouseTop = _position.top
            event.stopPropagation()
            nextTick(() => {
                _column.columnConfig.filterPulldownShow = true
            })
        },
    })
    const targetIcon = getIcon(null, "vxe-icon-funnel")
    return h(VxePulldown, {
        transfer: true,
        destroyOnClose: true,
        modelValue: _column.columnConfig.filterPulldownShow,
        ['onUpdate:modelValue']: (value: boolean) => {
            _column.columnConfig.filterPulldownShow = value
            nextTick(() => {
                if (value == true) {
                    const filterPosition = _column.columnConfig.filterPosition
                    //@ts-ignore
                    const pObj = getFixedPosition(divRef.value, { left: filterPosition.mouseLeft, top: filterPosition.mouseTop })
                    //把具体数据过去过去 
                    let showData = _column.table?.tableData.showData//展示的数据
                    const curData = [...new Set(showData!.map(row => {
                        let field = _column.columnConfig.field
                        return row[field!]
                    }).filter(row => row !== null && row !== undefined))].map(row => { return { value: row } })
                    const left = pObj.left
                    _column.columnConfig.filterLeft = left
                    _column.table!.pageRef.filterTable!.setTableData(curData)
                }
            })
        }
    }, {
        default: () => {
            return filterIconFn(targetIcon())
        },
        dropdown: () => {
            return withDirectives(
                h('div', {
                    ref: divRef, style: {
                        left: `${_column.columnConfig.filterLeft!}px`,
                        width: "200px", height: '330px', background: "RGB(248, 248, 249)",
                        position: "fixed"
                    } as StyleType
                }, [h(columnFilterCom, { column: _column })]),
                [[{
                    mounted(el, node) {
                    }
                }]]
            )

        }
    })
}


export const getSlotHeaderSortIcon = (_column: column) => {
    const rowHeight = getColumnHeaderHeight(_column).value
    const pRowheight = getPercentLength(rowHeight, 0.7)
    const heightDiv = usePropsDiv({ style: { height: pRowheight, display: "flex", alignItems: 'center' } })
    const upIcon = useCenterDiv({ style: { cursor: "pointer", height: "50%" }, onClick: () => { console.log('click') } })(getIcon({}, 'vxe-icon-caret-up')())
    const downIcon = useCenterDiv({ style: { cursor: "pointer", height: "50%" }, onClick: () => { console.log('click') } })(getIcon({}, 'vxe-icon-caret-down')())
    const style = { display: "flex", flexDirection: 'column', height: '100%' }
    const innerDiv = getRenderFn('div', ({ style: style }))([upIcon, downIcon])
    return heightDiv(innerDiv)
}


export const getColumnVisiable = (column: column) => {
    return computed(() => {
        const visible = column.columnConfig.visible
        if (visible === false) {
            return false
        }
        return true
    })
}

export const getColumnField = (column: column) => {
    return column.columnConfig.field
}
let typeArr = ['seq', 'checkbox', 'radio', 'expand', 'html']
export const getColumnType = (column: column) => {
    return computed(() => {
        const type: any = column.columnConfig.type
        if (typeArr.includes(type)) {
            return type
        } else {
            return 'seq'
        }
        // return column.columnConfig.type!
    })
}

export const getColumnWidth = (column: column) => {
    return computed(() => {
        const width = column.columnConfig.width
        return width
    })
}



export const getColumnTitle = (column: column) => {
    return computed(() => {
        const columnConfig = column.columnConfig
        const title = columnConfig.title
        return title
    })
}


export const getSortColmmnIcons = (props: propsConfig = {}, column: column) => {
    const upIcon = useMousePoint({ style: { height: '50%' } })(getIcon({ onClick: () => { } }, 'vxe-icon-caret-up')())
    const downIcon = useMousePoint({ style: { height: "50%" } })(getIcon({ onClick: () => { } }, 'vxe-icon-caret-down')())
    const rowHeight = getColumnHeaderHeight(column).value
    const style = { ...props.style, display: "flex", flexDirection: 'column', height: rowHeight }
    return getRenderFn('div', ({ ...props, style: style }))([upIcon, downIcon])
}



export const getColumnAlign = (column: column) => {
    return computed(() => {
        return column.columnConfig.align
    })
}

export const getColumnResizable = (column: column) => {
    return computed(() => {
        const table = column.table
        const tableConfig = table?.tableConfig
        const resizable = tableConfig?.columnConfig?.resizable
        const columnConfig = column.columnConfig
        if (resizable == true) {
            return columnConfig.resizable
        }
        return false
    })
}

export const initColumnConfig = (column: column) => {
    const schema = column.schema!
    const effectPool = column.effectPool
    let columnConfig = column.columnConfig as any
    for (const key of Object.keys(schema)) {
        const value = schema[key]
        if (value != null) {
            effectPool[`column${key}Effect`] = watchEffect(() => {
                columnConfig[key] = schema[key]
            })
        }
    }
    initRenderColumn(column)
    initRenderFormitem(column)
    // initFormitem(column)
}


export const initRenderFormitem = (column: column) => {
    const renderFormitem = column.renderFormitem
    const columnConfig = column.columnConfig
    // renderFormitem.type = computed(() => {
    //     let type = column.columnConfig.editType
    //     return type
    // }) as any
    renderFormitem.type = column.columnConfig.editType
    renderFormitem.onChange = (value: any) => {
        const _onChange = columnConfig.onChange
        if (typeof _onChange == 'function') {
            _onChange(value)
        }
    }
    renderFormitem.field = column.columnConfig.field
    // renderFormitem.field = computed(() => {
    //     return column.columnConfig.field
    // }) as any

    renderFormitem.options = computed(() => {
        return columnConfig.options
    }) as any//下拉框的数据绑定
    renderFormitem.baseInfoTable = computed(() => {
        return column.columnConfig.baseInfoTable
    }) as any//baseInfoTable
}

export const initRenderColumn = (column: column) => {
    const table = column.table
    let renderColumn = column.renderColumn
    renderColumn.params = column
    renderColumn.headerAlign = 'center'
    // renderColumn.slots = getColumnSlot(column)
    renderColumn.slots = computed(() => {
        let slots = {} as any
        slots.header = 'header'
        let tableState = table?.tableState!
        if (['fullEdit', 'moreRowEdit', 'singleRowEdit'].includes(tableState)) {
            const editType = column.columnConfig.editType
            if (Boolean(editType) == false) {
                slots.default = 'showValue'
            } else {
                slots.default = editType
            }
            if (typeof column.columnConfig.getRowEditType == 'function') {
                slots.default = 'rowEdit'
            }
        } else {
            slots.default = 'showValue'
        }
        return slots
    }) as any
    renderColumn.visible = getColumnVisiable(column)
    renderColumn.field = getColumnField(column)
    renderColumn.minWidth = 50//最小宽度
    renderColumn.type = getColumnType(column).value as any
    renderColumn.width = getColumnWidth(column) as any
    renderColumn.title = getColumnTitle(column) as any
    renderColumn.align = getColumnAlign(column) as any
    renderColumn.resizable = getColumnResizable(column) as any
    renderColumn.treeNode = computed(() => {
        const isTree = table?.tableConfig.isTree
        if (isTree) {
            const field = table.tableConfig.treeRowField
            if (field == column.columnConfig.field) {
                return true
            }
        }
        return false
    }) as any
}