import { computed, h, ref, shallowRef, vShow, withDirectives } from "vue";
import { input } from "../input";
import { styleBuilder } from "@/utils/utils";
import { Select } from "ant-design-vue";
import { StyleType } from "@/types/schema";
import * as monaco from 'monaco-editor'
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
}