import { computed, h } from "vue";
import { formitem } from "./formitem";
import { styleBuilder } from "@/utils/utils";
import { getRenderFn } from "./columnFn";
import * as formitemComFn from './formitemComFn'
import { editPool } from "./formitemComFn";
import { VxeInput } from "vxe-table";
import { StyleType } from "@/types/schema";
import inputView from "./schemaComponent/inputView";
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
            const title = formitem.itemConfig.title//title
            const titleCom = getRenderFn('div', {
                style: {
                    width: '30%',
                    height: "100%",
                    display: 'flex',
                    alignItems: "center",
                    overflow: "hidden"
                } as StyleType
            })([title])
            let editCom = getItemSlotsDefautlEditCom(formitem, params.data, titleCom)
            return editCom
        }
    })
}

export const getItemSlotsDefautlEditCom = (formitem: formitem, data?: any, titleCom?: any) => {
    const style = styleBuilder.setFull().setFlexRow().getStyle()
    const outSizeDivFn = getRenderFn('div', { style })
    // const type = formitem.itemConfig.type as keyof typeof editPool
    // let defaultRenderCom: any = h('div', {}, ['default'])
    // const renderFn = editPool[type]
    // if (typeof renderFn == 'function') {
    //     defaultRenderCom = renderFn(formitem, data)
    // }
    const inputInstance = formitem.pageRef.inputInstance
    let defaultRenderCom = h(inputView, { inputInstance: inputInstance })
    const editCom = outSizeDivFn([titleCom, defaultRenderCom])
    return editCom
}


export const getFormitemSpan = (formitem: formitem) => {
    return computed(() => {
        return formitem.itemConfig.span || 6
    })
}
export const getFormItemVisible = (formitem: formitem) => {
    return computed(() => {
        return formitem.itemConfig.visible
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