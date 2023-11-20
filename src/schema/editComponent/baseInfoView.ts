import { Directive, isProxy, computed, defineComponent, h, reactive, withDirectives, watchEffect, toRef, onUnmounted } from 'vue'
import { getOutSizeEditDiv } from '../formitemComFn'
import { styleBuilder } from '@/utils/utils'
import { getIcon } from '../icon'
import { VxeButton, VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from 'vxe-table'
import { pickKey, tableConfig } from '@/types/schema'
import tableView from '../schemaComponent/tableView'
import { formitem } from '../formitem'
export default defineComponent({
    props: ['formitem', 'baseInfoItem', 'form', 'data'],
    setup(props, context) {
        const _data = computed(() => {
            return props.data
        })
        const formitem = props.formitem
        // // const outSizeDivFn = getOutSizeEditDiv(formitem)
        const suffStyle = styleBuilder.setMousePoint().getStyle()
        let isClick = false
        let isMousedown = false
        const itemConfig = formitem.itemConfig
        const field = itemConfig.field

        const showValue = computed(() => {
            return 'showValue'
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
        // formitem.effectPool['polldownEffect'] = watchEffect(() => {
        //     const polldown = formitem.pageRef['polldown'] as VxePulldownInstance
        //     if (polldown == null) {
        //         return
        //     }
        //     if (formitem.itemConfig.isFocus == true) {
        //         polldown.showPanel()
        //     } else {
        //         polldown.hidePanel()
        //     }
        // })
        onUnmounted(() => {
            // formitem.effectPool['polldownEffect']()
        })

        const tableConfig = reactive({
            showCheckBoxColumn: false,
            height: "300px",
            data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
            { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            ], columns: [
                { field: 'name', title: '', width: 100, showHeader: true }, {
                    showFilter: false, showSort: false,
                    showHeader: false,
                    field: 'operator', title: "操作", width: 100, slots: {
                        default: (column: any) => {
                            return h('div', {}, [h(VxeButton, {
                                onClick: () => {
                                }
                            }, () => {
                                return h('div', {}, ['123'])
                            })])
                        }
                    }
                }],
            showHeader: true,
            resizable: false,
            showHeaderFilter: false,
            showHeaderSort: false,
        }) as pickKey<tableConfig>
        return () => {
            const suffixIcon = getIcon({
                style: suffStyle,
                onClick: (event: MouseEvent) => {
                    // isClick = true
                    // setTimeout(() => {
                    //     isClick = false
                    // }, 0);
                    event.stopPropagation()
                },
                onMousedown: (event: MouseEvent) => {
                    // isMousedown = true
                    // setTimeout(() => {
                    //     formitem.focus()
                    //     isMousedown = false
                    // }, 0);
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
                    ref: 'vxeinput',
                    onBlur: () => {
                        // setTimeout(() => {

                        //     if (isClick == false && isMousedown == false) {
                        //         itemConfig.isFocus = false
                        //     }
                        // }, 0);
                    }
                }, {
                suffix: () => {
                    return suffixIcon
                }
            })
                ,
                [[{
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
                }]])
            // return inputCom
            const pullShow = computed({
                set(value) {
                    formitem.itemConfig.isFocus = value
                },
                get() {
                    return formitem.itemConfig.isFocus as boolean
                }
            })
            return withDirectives(h(VxePulldown, {
                transfer: true,
                modelValue: pullShow.value as boolean,
                ['onUpdate:modelValue']: (value1: any) => {
                    pullShow.value = value1
                },
                // onClick: (event: MouseEvent) => {
                //     isClick = true
                //     setTimeout(() => {
                //         isClick = false
                //     }, 0);
                //     event.stopPropagation()
                // },
                // onMousedown: (event: MouseEvent) => {
                //     isMousedown = true
                //     setTimeout(() => {
                //         formitem.focus()
                //         isMousedown = false
                //     }, 0);
                //     event.stopPropagation()
                // },
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
                    formitem.pageRef['polldown'] = polldown
                }, unmounted: (div, node) => {
                    formitem.pageRef['polldown'] = null
                }
            }]])
        }
    },
})