import { ComputedRef, Directive, Teleport, VNode, computed, h, isReactive, isRef, isVNode, nextTick, reactive, ref, watchEffect, withDirectives } from "vue"
import { column } from "./column"
import { StyleType } from "@/types/schema"
import { getTableHeaderHeight, getTableRowHeight } from "./tableFn"
import { isUndefined } from 'xe-utils'
import { getIcon, propsConfig, useCenterDiv, useMousePoint, usePropsDiv } from "./icon"
import { getFixedPosition, getMouseEventPosition, getPercentLength, getTransformPosition, getTranslate3D, registerDocumentClickFn } from "@/utils/utils"
import { isString } from "lodash"
import defaultCom from "./tableColumnCom/defaultCom"
import defaultHeaderCom from './tableColumnCom/defalutHeaderCom'
import { Dropdown } from "ant-design-vue"
import columnFilterCom from "./tableColumnCom/columnFilterCom"
import { VxePulldown } from "vxe-table"
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
        // let formitem = _column.formItemMap.get(row)
        // if (formitem == null) {
        //     _column.formItemMap.set(row, createFormItem(_column.renderFormitem, null))
        // }
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
        const _header = getSlotHeader(column)//表头的显示
        slots.default = _default
        slots.header = _header
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
        trigger: ['click'],
        // destroyOnClose: true,
        modelValue: _column.columnConfig.filterPulldownShow,
        ['onUpdate:modelValue']: (value: boolean) => {
            const table = _column.table
            // const scroll = table?.pageRef.vxeGrid?.getScroll()
            _column.columnConfig.filterPulldownShow = value
            nextTick(() => {
                if (value == true) {
                    const filterPosition = _column.columnConfig.filterPosition
                    //@ts-ignore
                    const pObj = getFixedPosition(divRef.value, { left: filterPosition.mouseLeft, top: filterPosition.mouseTop })
                    //把具体数据过去过去
                    let showData = _column.table?.tableData.showData//展示的数据
                    _column.table!.pageRef.filterTable!.tableData.data = [...new Set(showData!.map(row => {
                        let field = _column.columnConfig.field
                        return row[field!]
                    }).filter(row => row !== null && row !== undefined))].map(row => { return { value: row } })
                    const left = pObj.left
                    _column.columnConfig.filterLeft = left
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
    initFormitem(column)
}
export const initFormitem = (column: column) => {
    let _item = createFormItem(column.renderFormitem, null)
    column.pageRef.formitem = _item
    //@ts-ignore
    _item.table = column.table!
}

export const initRenderFormitem = (column: column) => {
    const renderFormitem = column.renderFormitem
    // renderFormitem.modelValue = computed(() => {
    //     return '123'
    // }) as any
    const columnConfig = column.columnConfig
    renderFormitem.type = computed(() => {
        return column.columnConfig.editType || column.columnConfig.type
    }) as any
    renderFormitem.onChange = (value: any) => {
        const _onChange = columnConfig.onChange
        if (typeof _onChange == 'function') {
            _onChange(value)
        }
    }
    renderFormitem.field = computed(() => {
        return column.columnConfig.field
    }) as any
    renderFormitem.options = computed(() => {
        return columnConfig.options || []
    }) as any//下拉框的数据绑定
    renderFormitem.baseInfoTable = computed(() => {
        return column.columnConfig.baseInfoTable
    }) as any//baseInfoTable
}

export const initRenderColumn = (column: column) => {
    let renderColumn = column.renderColumn
    renderColumn.params = column
    renderColumn.headerAlign = 'center'
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