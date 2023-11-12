import { computed, h } from "vue";
import { formitem } from "./formitem";
import { styleBuilder } from "@/utils/utils";
import { getRenderFn } from "./columnFn";
import * as formitemComFn from './formitemComFn'
export const getFormitemSlots = (formitem: formitem) => {
    return computed(() => {
        const slots: any = {}
        const _default = getItemSlotsDefault(formitem).value
        slots.default = _default
        return slots
    })
}

export const getItemSlotsDefault = (formitem: formitem) => {
    return computed(() => {
        return (params: any) => {
            const title = formitem.itemConfig.title
            const titleCom = getRenderFn('div', {})([title])
            const style = styleBuilder.setFull().setFlexRow().getStyle()
            const outSizeDivFn = getRenderFn('div', { style })
            const type = formitem.itemConfig.type as keyof typeof formitemComFn
            let defaulRenderCom: any = h('div', {}, ['default'])
            const renderFn = formitemComFn[type]
            if (typeof renderFn == 'function') {
                defaulRenderCom = renderFn(formitem, params.data)
            }
            const editCom = outSizeDivFn([titleCom, defaulRenderCom])
            return editCom
        }
    })
}


export const getFormitemSpan = (formitem: formitem) => {
    return computed(() => {
        return 6
    })
}
export const getFormItemVisible = (formitem: formitem) => {
    return computed(() => {
        return true
    })
}

export const getFormItemFolding = (formitem: formitem) => {
    return computed(() => {
        return false
    })
}





export const getFormItemField = (formitem: formitem) => {
    return computed(() => {
        return formitem.itemConfig.field
    })
}