import { Directive, computed, getCurrentInstance, h, reactive, ref, resolveComponent, toRef, watchEffect, withDirectives } from "vue";
import { formitem } from "./formitem";
import { getRenderFn } from "./columnFn";
import { styleBuilder } from "@/utils/utils";
import { VxeInput } from 'vxe-table'
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
    const bindData = reactive({
        modelValue: value,
        onChange() {
            console.log(_data)
        }
    })
    const inputCom = withDirectives(h(VxeInput, bindData
        //     {
        //     modelValue: value.value, onChange: (value: any) => {
        //         value.value = value
        //     },
        //     onFocus: () => {
        //     },
        //     ref: 'vxeinput'
        // }
    )
        , [[diretive]])
    return outSizeDivFn([inputCom])
}