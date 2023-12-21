import { Directive, computed, h, ref, vShow, withDirectives } from "vue";
import { input } from "../input";
import { styleBuilder } from "@/utils/utils";
import { Select } from "ant-design-vue";
import { VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from "vxe-table";
import { getIcon } from "../icon";
import tableView from "../schemaComponent/tableView";
import { createTable } from "../table";

export const baseInfoInit = (input: input) => {
    const _this = input
    const inputConfig = _this.inputConfig//统一使用inputConfig
    const renderInput = _this.renderInput//始终有个输入框
    renderInput.modelValue = computed({
        set: (value: any) => {
            renderInput.modelValue = value
        },
        get: () => {
            const _modelValue = inputConfig.modelValue
            const isFocus = inputConfig.isFocus
            if (isFocus == true) {
                return _modelValue
            }
            const options = inputConfig.options || []
            const showValue = options.find(opt => {
                return opt.key == _modelValue
            })?.value
            if (showValue !== null) {
                return showValue
            }
            return _modelValue
        }
    }) as any
    _this.initBaseInfoTable()
    _this.baseInfoInitComponent()
}

export const baseInfoInitComponent = (input: input) => {
    const _this = input
    const formitem = _this
    const renderInput = _this.renderInput
    const itemConfig = _this.inputConfig
    const polldown = ref<VxePulldownInstance>(null as any)
    const vxeinput = ref<VxeInputInstance>(null as any)
    const pullShow = computed({
        set(value) {
            formitem.inputConfig.isFocus = value as any
        },
        get() {
            return formitem.inputConfig.isFocus as boolean
        }
    })
    const show = computed(() => {
        return _this.displayState == 'show'
    })
    const destroy = computed(() => {
        return _this.displayState == 'destroy'
    })
    const baseInfoData = computed(() => {
        let data = formitem.inputConfig?.baseInfoTable?.tableData || []
        return data
    })
    const tableRef = _this.system.baseInfoTableMap['t_SdOrder']
    const vNode = () => {
        const _this = input
        let isMousedown = false
        if (destroy.value) {
            return null
        }
        const diretive: Directive = {
            mounted(div: any, vnode: any) {
                formitem.pageRef['edititem'] = vxeinput.value
                formitem.focus = () => {
                    if (vxeinput.value.focus) {
                        vxeinput.value.focus()
                    }
                }
            },
            unmounted() {
                formitem.pageRef['edititem'] = null
                // console.log('unMounted')
                //@ts-ignore
                formitem.focus = null
            }
        }
        const inputCom = withDirectives(h(VxeInput,
            {
                ...renderInput, onChange: ({ value: value1 }: any) => {
                    const data = _this.getData!()
                    const field = _this.getField!()
                    data[field] = value1
                },
                onFocus: () => {
                    itemConfig.isFocus = true
                },
                onBlur: () => {
                    if (isMousedown == false) {
                        itemConfig.isFocus = false
                        const options = _this.inputConfig.options
                        const modelValue = _this.inputConfig.modelValue
                        if (options?.find(row => row.key == modelValue)?.value == null) {
                            const data = _this.getData!()
                            const field = _this.getField!()
                            data[field] = ''
                        }
                    }
                },
                ref: vxeinput
            }, {
            suffix: () => {
                const suffStyle = styleBuilder.setMousePoint().getStyle()
                return getIcon({
                    style: suffStyle,
                    onClick: (event: MouseEvent) => {
                        event.stopPropagation()
                    },
                    onMousedown: (event: MouseEvent) => {
                        event.stopPropagation()
                    }
                }, 'vxe-icon-search')()
            }
        })
            , [[diretive]])
        const _polldown = withDirectives(h(VxePulldown, {
            transfer: true,
            destroyOnClose: true,
            style: { width: '100%' },
            modelValue: pullShow.value as boolean,
            ['onUpdate:modelValue']: (value1: any) => {
                pullShow.value = value1
            },
            onClick: (event: MouseEvent) => {
                formitem.focus && formitem.focus()
            },
            onMousedown: (event: MouseEvent) => {

            },
            ref: polldown
        }, {
            default: (params: any) => {
                return inputCom
            },
            dropdown: (params: any) => {
                const style = styleBuilder.setFull()
                return withDirectives(h('div', {
                    ref: 'pulldownDiv', style: style, onMousedown: () => {
                        isMousedown = true
                        setTimeout(() => {
                            isMousedown = false
                            formitem.focus && formitem.focus()
                        }, 0)//
                    }
                }, [
                    h(tableView, { tableInstance: tableRef })
                ]), [[{
                    mounted(div, node) {
                    },
                    unmounted() {
                    }
                }]])
            },
        },), [[{
            mounted: (div, node) => {
                const _polldown = polldown.value
                formitem.pageRef['polldown'] = _polldown
            }, unmounted: (div, node) => {
                formitem.pageRef['polldown'] = null
            }
        }]])
        return withDirectives(h('div', { style: { width: '100%', height: '100%' } }, [
            // inputCom,
            _polldown]), [[vShow, show.value]])
    }
    _this.component = vNode
}

export const initBaseInfoTable = (input: input) => {
    const _this = input
    const tableConfig = {
        columns: [{ field: "test", title: "测试值" }],
        data: [{
            test: "xiaofeng"
        }]
    }
    const tableRef = createTable(tableConfig)
    _this.pageRef.tableRef = tableRef
}