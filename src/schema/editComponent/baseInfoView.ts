import { Directive, isProxy, computed, defineComponent, h, reactive, withDirectives, watchEffect, toRef, onUnmounted, ref, nextTick } from 'vue'
import { getOutSizeEditDiv } from '../formitemComFn'
import { styleBuilder } from '@/utils/utils'
import { getIcon } from '../icon'
import { VxeButton, VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from 'vxe-table'
import { StyleType, pickKey, tableConfig } from '@/types/schema'
import tableView from '../schemaComponent/tableView'
import { formitem } from '../formitem'
import { column } from '../column'
import { createTable } from '../table'
export default defineComponent({
    props: ['formitem', 'baseInfoItem', 'form', 'data'],
    setup(props, context) {
        const _data = computed(() => {
            return props.data
        })
        const formitem: formitem = props.formitem
        const suffStyle = styleBuilder.setMousePoint().getStyle()
        const itemConfig = formitem.itemConfig
        const field = itemConfig.field!
        const baseInfoData = computed(() => {
            let data = formitem.itemConfig.baseInfoTable?.tableData || []
            return data
        })
        const showValue = computed(() => {
            const field = formitem.itemConfig.field!
            const value = _data.value[field]
            let showValue: any = baseInfoData.value.find(v => v.value == value)?.label
            if (showValue == null) {
                showValue = value
            }
            return showValue
        })
        const value = computed({
            get() {
                const isFocus = itemConfig.isFocus
                if (isFocus == true) {
                    return _data.value[field]
                }
                return showValue.value
            },
            set(value) {
                _data.value[field] = value
            }
        }) as any
        onUnmounted(() => {
            // formitem.effectPool['polldownEffect']()
        })
        let isMousedown = false
        const tableConfig = reactive({
            showCheckBoxColumn: false,
            onCellClick: () => {
                console.log('clickFn')
            },
            height: "300px",
            data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
            { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            ], columns: [
                { field: 'name', title: '', width: 100, showHeader: true },
                {
                    showFilter: false, showSort: false,
                    showHeader: false,
                    field: 'operator', title: "操作", width: 100, slots: {
                        default: (column: any) => {
                            return h('div', {}, [h(VxeButton, {
                                onClick: () => {
                                }
                            }, () => {
                                return h('div', {}, ['选择'])
                            })])
                        }
                    }
                }
            ],
            showHeader: true,
            resizable: false,
            showHeaderFilter: false,
            showHeaderSort: false,
        }) as pickKey<tableConfig>
        const pulldownTable = createTable(tableConfig)
        const pullShow = computed({
            set(value) {
                formitem.itemConfig.isFocus = value as any
            },
            get() {
                return formitem.itemConfig.isFocus as boolean
            }
        })
        const vxeinput = ref<any>(null)
        const polldown = ref<any>(null)
        return () => {
            const suffixIcon = getIcon({
                style: suffStyle,
                onClick: (event: MouseEvent) => {
                    event.stopPropagation()
                },
                onMousedown: (event: MouseEvent) => {
                    event.stopPropagation()
                }
            }, 'vxe-icon-search')()
            const inputCom = withDirectives(h(VxeInput,
                {
                    modelValue: value.value, onChange: ({ value: value1 }: any) => {
                        value.value = value1
                    },
                    placeholder: '',
                    onFocus: () => {
                        itemConfig.isFocus = true
                    },
                    style: { width: '100%' } as StyleType,
                    ref: vxeinput,
                    onBlur: () => {
                        if (isMousedown == false) {
                            formitem.itemConfig.isFocus = false
                        }
                    }
                }, {
                suffix: () => {
                    return suffixIcon
                }
            })
                ,
                [[{
                    mounted(div, vnode) {
                        formitem.pageRef['edititem'] = vxeinput.value
                        formitem.editMethod.focus = () => {
                            formitem.itemConfig.isFocus = true
                            vxeinput.value.focus()//使其活得焦点
                        }
                    },
                    unmounted() {
                        formitem.pageRef['edititem'] = null
                    }
                }]])
            return withDirectives(h(VxePulldown, {
                transfer: true,
                style: { width: '100%' },
                modelValue: pullShow.value as boolean,
                ['onUpdate:modelValue']: (value1: any) => {
                    pullShow.value = value1
                },
                onClick: (event: MouseEvent) => {

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
                                formitem.focus()
                            }, 0)//
                        }
                    }, [
                        h(tableView, { tableInstance: pulldownTable },)
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
        }
    },
})