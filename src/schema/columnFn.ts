import { ComputedRef, Directive, VNode, computed, h, isReactive, isRef, isVNode, reactive, withDirectives } from "vue"
import { column } from "./column"
import { StyleType } from "@/types/schema"
import { getTableHeaderHeight, getTableRowHeight } from "./tableFn"
import { isUndefined } from 'xe-utils'
import { getIcon, propsConfig, useCenterDiv, useMousePoint, usePropsDiv } from "./icon"
import { getMouseEventPosition, getPercentLength, registerDocumentClickFn } from "@/utils/utils"
import { isString } from "lodash"
// import { system } from "./system"
export const getOutSizeDiv = (column: column, row: any) => {
    const table = column.table!
    const rowHeight = getTableRowHeight(table).value
    const style: StyleType = {//外部div的配置
        width: '100%',
        height: rowHeight
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
        const vnode = h(node, props, _nestNode)
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

}

export const getDateTimeEditDiv = (column: column, row: any) => {

}


export const getDateEditDiv = (column: column, row: any) => {

}

export const getTimeEditDiv = (column: column, row: any) => {

}



export const getSlotDefault = (_column: column) => {
    return computed(() => {
        const fn = ({ row, rowIndex, column }: any) => {
            const outSizeDiv = getOutSizeDiv(_column, row)//外部的div
            return outSizeDiv
        }
        return fn
    })
}

export const getColumnSlot = (column: column) => {
    return computed(() => {
        const columnConfig = column.columnConfig
        const type = columnConfig.type
        //使用默认插槽
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
        const _default = getSlotDefault(column).value//默认的
        const header = getSlotHeader(column).value//表头的显示
        slots.default = _default
        slots.header = header
        slots.content = () => {
            return h('div', {}, ['123'])
        }
        return slots
    })
}
export const getSlotFilter = (column: column) => {
    return computed(() => {
        const fn = () => {
            return h('div', {}, ['123123'])
        }
        return fn
    })
}

export const getSlotHeader = (_column: column) => {
    return computed(() => {
        const fn = () => {
            //过滤图标
            const showHeader = _column.columnConfig.showHeader
            if (showHeader == false) {
                return
            }
            const headerHeight = getColumnRowHeight(_column).value
            const style: StyleType = {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: headerHeight,
            }
            const outSizeDiv = usePropsDiv({ style })
            const renderColumn = _column.renderColumn
            const title: string = renderColumn.title as string || 'title'
            const _filterIcon = _column.columnConfig.showFilter == true ? getSlotHeaderFilterIcon(_column) : null
            const sortIcon = _column.columnConfig.showSort == true ? getSlotHeaderSortIcon(_column) : null
            //排序图标
            return outSizeDiv([title, _filterIcon, sortIcon])
        }
        return fn
    })
}

export const getSlotHeaderFilterIcon = (_column: column) => {//获取头部的图标
    const table = _column.table!
    const docClick = registerDocumentClickFn(() => {
        table.closeColumnFilter()
    })
    const filterIconFn = useMousePoint({
        capture: true,
        onClick: (event: MouseEvent) => {
            event.stopPropagation()
            const position = getMouseEventPosition(event)
            const table = _column.table!
            table.openColumnFilter(_column.renderColumn?.field as string, position)//打开过滤器
        },
        directive: [[docClick]]
    })
    const targetIcon = getIcon(null, "vxe-icon-funnel")
    return filterIconFn(targetIcon())
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
        const schema = column.schema//外部的schema
        let visible = schema?.visible
        if (isUndefined(visible)) {
            visible = true
        }
        return visible
    })
}

export const getColumnField = (column: column) => {
    return computed<any>(() => {
        const columnConfig = column.columnConfig
        return columnConfig.field
    })
}

export const getColumnType = (column: column) => {
    return computed<string>(() => {
        const columnConfig = column.columnConfig
        return columnConfig.type as string
    })
}

export const getColumnWidth = (column: column) => {
    return computed(() => {
        const system = getColumnSystem(column).value!
        const schema = column.columnConfig
        const defaultColumnConfig = system.defaultColumnConfig
        const defaultWidth = defaultColumnConfig.width
        const width = schema.width || defaultWidth
        return width
    })
}

export const getColumnSystem = (column: column) => {
    return computed(() => {
        const system = column.table?.system
        return system
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