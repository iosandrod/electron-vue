import { VNode, computed, h, withDirectives } from "vue"
import { column } from "./column"
import { StyleType } from "@/types/schema"
import { getTableRowHeight } from "./tableFn"
import { isUndefined } from 'xe-utils'
import { getIcon, useMousePoint } from "./icon"
// import { system } from "./system"
export const getOutSizeDiv = (column: column, row: any) => {
    const table = column.table!
    const rowHeight = getTableRowHeight(table)
    const style: StyleType = {//外部div的配置
        width: '100%',
        height: rowHeight
    }
    const inSizeDiv = getInSizeDiv(column, row)
    const value = row[column.renderColumn.field as string]
    return getRenderFn('div', { style: { ...style } })([inSizeDiv([value])])
}


//得到内部的div
export const getInSizeDiv = (column: column, row: any) => {
    const style = {}
    return getRenderFn('div', { style: { ...style } })
}


export const getRenderFn = (node: string | VNode, props: any, directive?: any) => {
    return (nestNode?: any[] | any) => {
        let _nestNode: any[] = []
        if (Array.isArray(nestNode)) {
            _nestNode = [nestNode]
        } else {
            _nestNode = nestNode
        }
        const vnode = h(node, props, nestNode)
        if (directive != null) {
            if (Array.isArray(directive)) {
                return withDirectives(vnode, [...directive])
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
        const columnConfig = _column.columnConfig
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
        if (type == 'seq' || type == 'checkbox' || type == 'radio') {
            return {}
        }
        let slot: any = {}
        const _default = getSlotDefault(column).value
        const header = getSlotHeader(column).value
        slot.default = _default
        slot.header = header
        return slot
    })
}


export const getSlotHeader = (_column: column) => {
    return computed(() => {
        const fn = () => {
            //过滤图标
            const renderColumn = _column.renderColumn
            const title: string = renderColumn.title as string || 'title'
            const filterIcon = useMousePoint({
                onClick: (event) => {
                    console.log('我被点击了')
                }
            })
            const targetIcon = getIcon("vxe-icon-funnel")
            const icon = filterIcon(targetIcon())
            //排序图标
            return h('div', {}, [title, icon])
        }
        return fn
    })
}

export const getSlotHeaderFilterIcon = (column: column) => {//获取头部的图标
    return
}

export const getSlotHeaderSortIcon = (column: column) => {

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