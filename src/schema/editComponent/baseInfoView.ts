import { Directive, computed, defineComponent, h, ref, withDirectives } from 'vue'
import { getOutSizeEditDiv } from '../formitemComFn'
import { formitem } from '../formitem'
import { VxeInput, VxePulldown } from 'vxe-table'
import { getIcon } from '../icon'
import { styleBuilder } from '@/utils/utils'
import tableView from '../schemaComponent/tableView'
export default defineComponent({
    props: ['formitem', 'form', 'data'],
    setup(props, context) {
        const formitem: formitem = props.formitem
        const itemConfig = formitem.itemConfig
        const field = itemConfig.field!
        const _data = computed(() => {
            return props.data
        })
        const baseInfoData = computed(() => {
            let data = formitem.itemConfig.baseInfoTable?.tableData || []
            return data
        })
        const showValue = computed(() => {
            const field = formitem.itemConfig.field!
            const value = _data.value[field]
            let showValue: any = baseInfoData.value.find((v: any) => v.value == value)?.label
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
            let isMousedown = false
            const diretive: Directive = {
                mounted(div, vnode) {
                    const instance = vnode.instance
                    const $refs = instance?.$refs!
                    const vxeinput = $refs['vxeinput']
                    formitem.pageRef['edititem'] = vxeinput
                    console.log(formitem.pageRef)
                },
                unmounted() {
                    formitem.pageRef['edititem'] = null
                }
            }
            const inputCom = withDirectives(h(VxeInput,
                {
                    modelValue: showValue.value, onChange: ({ value: value1 }: any) => {
                        value.value = value1
                    },
                    onFocus: () => {
                        itemConfig.isFocus = true
                    },
                    onBlur: () => {
                        if (isMousedown == false) {
                            itemConfig.isFocus = false
                        }
                    },
                    ref: 'vxeinput'
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
                        // h('div', Array(1000).fill(1))
                        h(tableView, { tableInstance: formitem.pageRef.tableRef })
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
    }
})

