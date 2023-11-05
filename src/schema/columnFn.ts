import { computed, h } from "vue"
import { column } from "./column"
import { StyleType } from "@/types/schema"
import { getTableRowHeight } from "./tableFn"
import { isUndefined } from 'xe-utils'
import { system } from "./system"
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


export const getInSizeDiv = (column: column, row: any) => {//得到内部的div
    const style = {}
    return getRenderFn('div', { style: { ...style } })
}


export const getRenderFn = (node: string, props: any) => {
    return (nestNode: any[]) => {
        return h(node, props, nestNode)
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



export const getSlotDefault = (column: column) => {
    return computed(() => {
        const columnConfig = column.columnConfig
        const type = columnConfig.type as string
        const fn = ({ row, rowIndex, column }: any) => {
            const outSizeDiv = getOutSizeDiv(column, row)
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
        const edit = getSlotEdit(column).value
        const header = getSlotHeader(column).value
        slot.default = _default
        slot.edit = edit
        slot.header = header
        return slot
    })
}

export const getSlotEdit = (column: column) => {
    return computed(() => {

    })
}

export const getSlotHeader = (_column: column) => {
    return computed(() => {
        const fn = () => {
            return h('div', {}, ['123'])
        }
        return fn
    })
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