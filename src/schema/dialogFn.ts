import { computed, h } from "vue";
import { dialog } from "./dialog";
import { ModalDefaultSlotParams } from 'vxe-table'
export const getDialogType = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.type
    })
}

export const getDialogMaskCloseAble = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.maskClosable
    })
}

export const getDialogSlots = (dialog: dialog) => {
    return computed(() => {
        const slots: any = {}
        slots.header = getDialogSlotsHeader(dialog).value
        slots.default = getDialogSlotsDefault(dialog).value
        slots.footer = getDialogSlotsFooter(dialog).value
        return slots
    })
}

export const getDialogSlotsHeader = (dialog: dialog) => {
    return computed(() => {
        return (params: ModalDefaultSlotParams) => {
            return h('div', {}, ['header'])
        }
    })
}

export const getDialogSlotsDefault = (dialog: dialog) => {
    return computed(() => {
        return (params: ModalDefaultSlotParams) => {
            return h("div", {}, ['default'])
        }
    })
}

export const getDialogSlotsFooter = (dialog: dialog) => {
    return computed(() => {
        return (params: ModalDefaultSlotParams) => {
            return h('div', {}, ['footer'])
        }
    })
}