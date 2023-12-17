import { Directive, computed, h, reactive, ref, withDirectives } from "vue";
import { input } from "../input";
import { system, systemInstance } from "../system";
import { formitem } from "../formitem";
import { form } from "../form";
import { VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from "vxe-table";
import { styleBuilder } from "@/utils/utils";
import { getIcon } from "../icon";
import tableView from "../schemaComponent/tableView";
import { createTable } from "../table";


export class baseInfo extends input {
    getFormItem?: () => formitem
    getForm?: () => form
    constructor(schema: any, system: system) {
        super(schema, system)
    }
    initInput() {
        super.initInput()//
        this.initBaseInfoTable()
    }
    initRenderInput() {
        super.initRenderInput()
        const inputConfig = this.inputConfig//统一使用inputConfig
        const renderInput = this.renderInput//始终有个输入框
        renderInput.modelValue = computed(() => {
            const _modelValue = inputConfig.modelValue
            const isFocus = inputConfig.isFocus
            if (isFocus == true) {
                return _modelValue
            }
            const options = inputConfig.options || [{
                key: 'test',
                value: "展示的值"
            }, {
                key: 'test1',
                value: "展示的1值"
            }]
            const showValue = options.find(opt => {
                return opt.key == _modelValue
            })?.value
            if (showValue !== null) {
                return showValue
            }
            return _modelValue
        }) as any
    }
    initBaseInfoTable() {
        const tableConfig = {
            columns: [{ field: "test", title: "测试值" }],
            data: [{
                test: "xiaofeng"
            }]
        }
        const tableRef = createTable(tableConfig)
        this.pageRef.tableRef = tableRef
    }
    initComponent() {
        const formitem = this
        const renderInput = this.renderInput
        const itemConfig = this.inputConfig
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
        const baseInfoData = computed(() => {
            let data = formitem.inputConfig?.baseInfoTable?.tableData || []
            return data
        })
        const tableRef = this.system.baseInfoTableMap['t_SdOrder']
        let vNode = () => {
            const _this = this
            let isMousedown = false
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
                        // h(tableView, { tableInstance: formitem.pageRef.tableRef })
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
            return h('div', { style: { width: '100%', height: '100%' } }, [
                // inputCom,
                _polldown])
        }
        // let vNode = () => {
        //     return h('div', ['123'])
        // }
        this.component = vNode
    }
}

export const createBaseInfo = (schema: any) => {
    const _string1 = reactive(new baseInfo(schema, systemInstance))
    _string1.initInput()
    return _string1
}