import { Directive, computed, h, ref, useAttrs, vShow, withDirectives } from "vue";
import { input } from "../input";
import { styleBuilder } from "@/utils/utils";
import { Select } from "ant-design-vue";
import { VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from "vxe-table";
import { getIcon } from "../icon";
import tableView from "../schemaComponent/tableView";
import { createTable } from "../table";
import { StyleType } from "@/types/schema";
export const stringInit = (input: input) => {
    const _this = input
    _this.initComponent()
}

export const initComponent = (input: input) => {
    const _this = input
    const show = computed(() => {
        return _this.displayState == 'show'
    })
    const destroy = computed(() => {
        return _this.displayState == 'destroy'
    })
    const vNode = (props?: any) => {
        const renderInput = _this.renderInput
        if (destroy.value == true) {
            return null
        }
        const attrs = useAttrs()!
        let updateFn = attrs['onUpdate:modelValue']
        if (typeof updateFn !== 'function') {
            updateFn = () => { }
        }
        const inputCom = h(VxeInput, { ...renderInput, style: { width: '100%' } })
        const com = withDirectives(
            h('div', { style: { height: "100%", width: '100%' } as StyleType, attrs: attrs }, [inputCom])
            , [[vShow, show.value]]
        )
        return com
    }
    _this.component = vNode
}

export const stringInitComponent = (input: input) => {
    return
}