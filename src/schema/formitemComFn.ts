import { Directive, computed, getCurrentInstance, h, nextTick, reactive, ref, resolveComponent, toRef, watchEffect, withDirectives } from "vue";
import { formitem } from "./formitem";
import { getRenderFn } from "./columnFn";
import { styleBuilder } from "@/utils/utils";
import { VxeButton, VxeGridDefines, VxeGridProps, VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance, VxeTableProps } from 'vxe-table'
import { getIcon } from "./icon";
import tableView from "./schemaComponent/tableView";
import { pickKey, tableConfig } from "@/types/schema";
const getOutSizeDiv = (formitem: formitem) => {
    const style = styleBuilder.setFull().getStyle()
    const renderFn = getRenderFn('div', { style })
    return renderFn
}


export const select = (formitem: formitem, data?: any) => {
    const outsizeDivFn = getOutSizeDiv(formitem)
    return outsizeDivFn(['select'])
}


export const string = (formitem: formitem, data?: any) => {
    const outSizeDivFn = getOutSizeDiv(formitem)
    const field = formitem.itemConfig.field!
    const _data = data || {}
    const diretive: Directive = {
        mounted(div, vnode) {
            const instance = vnode.instance
            const $refs = instance?.$refs!
            const vxeinput = $refs['vxeinput']
            formitem.pageRef['edititem'] = vxeinput
        },
        unmounted() {
            formitem.pageRef['edititem'] = null
        }
    }
    const value = computed({
        get() {
            return _data[field]
        },
        set(value) {
            _data[field] = value
        }
    }) as any
    const inputCom = withDirectives(h(VxeInput,
        {
            modelValue: value.value, onChange: ({ value: value1 }: any) => {
                value.value = value1
            },
            onFocus: () => {
            },
            ref: 'vxeinput'
        })
        , [[diretive]])
    return outSizeDivFn([inputCom])
}

export const baseInfo = (formitem: formitem, data?: any) => {
    const outSizeDivFn = getOutSizeDiv(formitem)
    const itemConfig = formitem.itemConfig
    const field = formitem.itemConfig.field!
    const _data = data || {}

    const diretive: Directive = {
        mounted(div, vnode) {
            const instance = vnode.instance
            const $refs = instance?.$refs!
            const vxeinput = $refs['vxeinput'] as VxeInputInstance
            formitem.pageRef['edititem'] = vxeinput
            formitem.editMethod.focus = () => {
                formitem.itemConfig.isFocus = true
                vxeinput.focus()//使其活得焦点
            }
        },
        unmounted() {
            formitem.pageRef['edititem'] = null
        }
    }
    const showValue = computed(() => {
        return 'showValue'
    })
    const value = computed({
        get() {
            const isFocus = itemConfig.isFocus
            if (isFocus == true) {
                return _data[field]
            }
            return showValue.value
        },
        set(value) {
            _data[field] = value
        }
    }) as any
    const suffStyle = styleBuilder.setMousePoint().getStyle()
    let isClick = false
    let isMousedown = false
    const suffixIcon = getIcon({
        style: suffStyle,
        onClick: (event) => {
            isClick = true
            setTimeout(() => {
                isClick = false
            }, 0);
            event.stopPropagation()
        },
        onMousedown: (event: MouseEvent) => {
            isMousedown = true
            setTimeout(() => {
                formitem.focus()
                isMousedown = false
            }, 0);
            event.stopPropagation()
        }
    }, 'vxe-icon-search')()
    formitem.effectPool['polldowmEffect'] = watchEffect(() => {
        const polldown = formitem.pageRef['polldown'] as VxePulldownInstance
        if (polldown == null) {
            return
        }
        if (formitem.itemConfig.isFocus == true) {
            polldown.showPanel()
        } else {
            polldown.hidePanel()
        }
    })
    const inputCom = withDirectives(h(VxeInput,
        {
            modelValue: value.value, onChange: ({ value: value1 }: any) => {
                value.value = value1
            },
            placeholder: '',
            onFocus: () => {
                itemConfig.isFocus = true
            },
            ref: 'vxeinput',
            onBlur: () => {
                if (isClick == false && isMousedown == false) {
                    itemConfig.isFocus = false
                }
            }
        }, {
        suffix: () => {
            return suffixIcon
        }
    })
        , [[diretive]])
    const tableConfig = reactive({
        showCheckBoxColumn: false,
        data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        ], columns: [
            { field: 'name', title: '', width: 100, showHeader: true }, {
                showFilter: false, showSort: false,
                showHeader: false,
                field: 'operator', title: "操作", width: 100, slots: {
                    default: (column) => {
                        return h('div', {}, [h(VxeButton, {
                            onClick: () => {
                                console.log('click')
                            }
                        }, ['button'])])
                    }
                }
            }],
        showHeader: true,
        resizable: false,
        showHeaderFilter: false,
    }) as pickKey<tableConfig>

    const pollDown = withDirectives(h(VxePulldown, {
        onClick: (event: MouseEvent) => {
            isClick = true
            setTimeout(() => {
                isClick = false
            }, 0);
            event.stopPropagation()
        },
        onMousedown: (event: MouseEvent) => {
            isMousedown = true
            setTimeout(() => {
                formitem.focus()
                isMousedown = false
            }, 0);
            event.stopPropagation()
        },
        ref: 'polldown'
    }, {
        default: (params: any) => {
            return inputCom
        },
        dropdown: (params: any) => {
            return h(tableView, tableConfig,)
        },
    },), [[{
        mounted: (div, node) => {
            const instance = node.instance
            const $refs = instance?.$refs
            const polldown = $refs?.polldown
            console.log($refs, 'testPolldown')
            formitem.pageRef['polldown'] = polldown
        }, unmounted: (div, node) => {
            formitem.pageRef['polldown'] = null
        }
    }]])
    return outSizeDivFn([pollDown])
}
