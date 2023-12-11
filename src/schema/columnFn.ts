import { ComputedRef, Directive, VNode, computed, h, isReactive, isRef, isVNode, reactive, watchEffect, withDirectives } from "vue"
import { column } from "./column"
import { StyleType } from "@/types/schema"
import { getTableHeaderHeight, getTableRowHeight } from "./tableFn"
import { isUndefined } from 'xe-utils'
import { getIcon, propsConfig, useCenterDiv, useMousePoint, usePropsDiv } from "./icon"
import { getMouseEventPosition, getPercentLength, registerDocumentClickFn } from "@/utils/utils"
import { isString } from "lodash"
import defaultCom from "./tableColumnCom/defaultCom"
import defaultHeaderCom from './tableColumnCom/defalutHeaderCom'
import { Dropdown } from "ant-design-vue"
import columnFilterCom from "./tableColumnCom/columnFilterCom"
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
    return computed(() => {
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
    })
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
        const _default = getSlotDefault(column).value//默认的
        const header = getSlotHeader(column).value//表头的显示
        slots.default = _default
        slots.header = header
        return slots
    })
}

export const getSlotHeader = (_column: column) => {
    return computed(() => {
        const fn = (params: any) => {
            //过滤图标 w4
            return h(defaultHeaderCom, { column: _column })
        }
        return fn
    })
}

export const getSlotHeaderFilterIcon = (_column: column) => {//获取头部的图标
    // const table = _column.table!
    // const docClick = registerDocumentClickFn(() => {
    // }) 
    const filterIconFn = useMousePoint({
        capture: true,
        onClick: (event: MouseEvent) => {
            event.stopPropagation()
            _column.columnConfig.filterPulldownShow = true
        },
    })
    const targetIcon = getIcon(null, "vxe-icon-funnel")
    return h(Dropdown, {
        trigger: ['click'],
        open: _column.columnConfig.filterPulldownShow,
        'onUpdate:open': (value) => {
            _column.columnConfig.filterPulldownShow = value
        }
    }, {
        default: () => {
            return filterIconFn(targetIcon())
        },
        overlay: () => {
            return h('div', { style: { width: "100px", height: '200px', background: "red" } }, [h(columnFilterCom, { column: _column })])
        }
    })
}


export const getSlotHeaderSortIcon = (_column: column) => {
    // const rowHeight = 30
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
    return column.columnConfig.field
}
let typeArr = ['seq', 'checkbox', 'radio', 'expand', 'html']
export const getColumnType = (column: column) => {
    return computed(() => {
        const type: any = column.columnConfig.type
        if (typeArr.includes(type)) {
            return type
        } else {
            return 'html'
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
}

export const initRenderFormitem = (column: column) => {
    const renderFormitem = column.renderFormitem
    renderFormitem.type = computed(() => {
        return column.columnConfig.editType || column.columnConfig.type
    }) as any
    renderFormitem.field = computed(() => {
        return column.columnConfig.field
    }) as any
    renderFormitem.options = computed(() => {
        return []
    }) as any//下拉框的数据绑定
    renderFormitem.baseInfoTable = computed(() => {
        return column.columnConfig.baseInfoTable
    }) as any//baseInfoTable
}

export const initRenderColumn = (column: column) => {
    let renderColumn = column.renderColumn
    // renderColumn.params = column
    renderColumn.slots = getColumnSlot(column)
    renderColumn.visible = getColumnVisiable(column)
    renderColumn.field = getColumnField(column)
    renderColumn.minWidth = 50//最小宽度
    renderColumn.type = getColumnType(column).value as any
    renderColumn.width = getColumnWidth(column) as any
    renderColumn.title = getColumnTitle(column) as any
    renderColumn.align = getColumnAlign(column) as any
    renderColumn.resizable = getColumnResizable(column) as any
}