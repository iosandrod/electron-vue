import { Directive, computed, defineComponent, h, nextTick, onMounted, ref, shallowRef, useAttrs, vShow, withDirectives } from "vue";
import { input } from "../input";
import { styleBuilder } from "@/utils/utils";
import { Select } from "ant-design-vue";
import { StyleType } from "@/types/schema";
import * as monaco from 'monaco-editor'
import { VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from "vxe-table";
import { getIcon } from "../icon";
export const codeEditCom = defineComponent({
    props: ['inputInstance'],
    setup(props) {
        const input = props.inputInstance as input
        const codeDiv = ref<HTMLDivElement>()
        const outSizeDiv = ref<HTMLDivElement>()
        let height = 500
        let width = 1200
        return () => {
            const attrs = useAttrs()
            const codeEditCom = withDirectives(h('div', { ref: codeDiv, },), [[{
                mounted(div, node) {
                    const inputValue = input.getBindValue()
                    //@ts-ignore
                    input.pageRef.codeEdit = shallowRef(monaco.editor.create(codeDiv.value, {
                        value: inputValue,
                        overviewRulerBorder: false,
                        language: "javascript",
                        lineNumbers: 'off',
                        minimap: { enabled: false, },
                    },))
                    let codeEdit = input.pageRef.codeEdit
                    codeEdit!.onDidChangeModelContent((value) => {
                        const context = codeEdit?.getValue()
                        if (input.updateData) {
                            input.updateData(context)
                        }
                    })
                    nextTick(() => {
                        codeEdit?.layout({
                            height: height,
                            width: width
                        })

                    })
                },
                unmounted() {
                    input.pageRef.codeEdit?.dispose()
                    //@ts-ignore
                    input.pageRef.codeEdit = null
                }
            }]])
            return withDirectives(h('div', {
                attrs: attrs, ref: outSizeDiv, style: {
                    border: 'solid 1px black',
                    overflow: 'auto'
                } as StyleType
            }, [codeEditCom]), [[{
                mounted: (div) => {
                    const _div: HTMLDivElement = div
                    const size = _div.getBoundingClientRect()
                    const _height = size.height
                    const _width = size.width
                    height = _height - 10
                    width = _width - 10
                }
            }]])
        }
    }
})


export const initRenderCodeEdit = (input: input) => {
    const codeEditRender: any = input.codeEditRender
    const inputConfig = input.inputConfig
    codeEditRender.type = inputConfig.type
    codeEditRender.value = computed(() => {
        return input.inputConfig.modelValue
    })
}

export const codeEditInitComponent = (input: input) => {
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
                    setTimeout(() => {
                        if (isMousedown == false) {
                            itemConfig.isFocus = false
                            const options = _this.inputConfig.options
                            const modelValue = _this.inputConfig.modelValue
                            if (options?.find(row => row.key == modelValue)?.value == null) {
                                const data = _this.getData!()
                                const field = _this.getField!()
                                if (data) {
                                    data[field] = ''
                                }
                            }
                        }
                    }, 0)
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
                // const style = styleBuilder.setFull().getStyle()
                const downCom = h(codeEditCom, { inputInstance: _this, style: { height: '500px', width: "1200px", } as StyleType })
                return withDirectives(h('div', {
                    ref: 'pulldownDiv', style: { height: "500px", width: "1200px" } as StyleType, onMousedown: () => {
                        isMousedown = true
                        setTimeout(() => {
                            isMousedown = false
                        }, 0)//
                    }
                }, [
                    downCom
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
            _polldown]), [[vShow, show.value]])
    }
    _this.component = vNode
}


/* 
 const _this = input
    const show = computed(() => {
        return _this.displayState == 'show'
    })
    const destroy = computed(() => {
        return _this.displayState == 'destroy'
    })
    const vNode = () => {
        if (destroy.value == true) {
            return null
        }
        const codeDiv = ref()
        const selectStyle = styleBuilder.setFullWidth().setFullHeight().getStyle()
        const codeEditCom = withDirectives(h('div', { ref: codeDiv, style: selectStyle },), [[{
            mounted(div, node) {
                //@ts-ignore
                input.pageRef.codeEdit = shallowRef(monaco.editor.create(codeDiv.value, { value: '', language: "javascript" }))
            },
            unmounted() {
                input.pageRef.codeEdit?.dispose()
                //@ts-ignore
                input.pageRef.codeEdit = null
            }
        }]])
        return withDirectives(h('div', { style: { width: "100%", height: '100%' } as StyleType }, [codeEditCom,]), [[vShow, show.value]])
    }
    _this.component = vNode

*/