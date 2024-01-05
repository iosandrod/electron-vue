import { Directive, computed, defineComponent, h, nextTick, onMounted, ref, shallowRef, useAttrs, vShow, withDirectives } from "vue";
import { input } from "../input";
import { styleBuilder } from "@/utils/utils";
import { Select } from "ant-design-vue";
import { StyleType } from "@/types/schema";
import * as monaco from 'monaco-editor'
import { VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from "vxe-table";
import { getIcon } from "../icon";
import { createForm } from "../form";
import instanceView from "../schemaComponent/instanceView";
import { inputComItems } from "./inputCom";



export const initRenderForm = (input: input) => {
    const _this = input
    const inputConfig = input.inputConfig
    inputConfig.clearable = false
    // const renderForm = input.renderForm
    const renderForm = input.inputConfig.formConfig || {} as any
    renderForm.data = computed(() => {
        try {
            const value = input.getBindValue()
            const _value = JSON.parse(value)//这个是JSON数据结构
            return _value
        } catch (error) {
            return {}
        }
    })
    const _form = createForm(renderForm)
    //@ts-ignore
    _this.pageRef.formRef = _form
}

export const formInitComponent = (input: input) => {
    const _this = input
    const formitem = _this
    const renderInput = _this.renderInput
    const itemConfig = _this.inputConfig
    const vxeinput = ref<VxeInputInstance>(null as any)
    const show = computed(() => {
        return _this.displayState == 'show'
    })
    const destroy = computed(() => {
        return _this.displayState == 'destroy'
    })
    const vNode = () => {
        const _this = input
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

                },
                ref: vxeinput
            }, {
            suffix: () => {
                const suffStyle = styleBuilder.setMousePoint().getStyle()
                return getIcon({
                    style: suffStyle,
                    onClick: (event: MouseEvent) => {
                        const system = _this.system
                        system.addGlobalDialog('instanceView', { instance: _this.pageRef.formRef, height: 600, width: 1200, modelValue: true })
                    },
                    onMousedown: (event: MouseEvent) => {
                        event.stopPropagation()
                    }
                }, 'vxe-icon-edit')()
            }
        })
            , [[diretive]])

        return withDirectives(h('div', { style: { width: '100%', height: '100%' } }, [
            inputCom]), [[vShow, show.value]])
    }
    _this.component = vNode
}
