import { computed, h, withCtx, createSlots, defineSlots, slot } from "vue";
import { dialog } from "./dialog";
import { ModalDefaultSlotParams } from 'vxe-table'
import { VxeButton } from "vxe-table";
import { table } from "./table";
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
            return h('div', {}, [h(VxeButton, {
                onClick: () => {
                    const modalData = dialog.dialogConfig.modalData
                    console.log(dialog, 'testDialog')
                    const table: table = modalData.table
                    table.filterFirstData()
                    dialog.close()
                },
            }, {
                default: () => {
                    return h('div', {}, ['button'])
                }
            })])
        }
    })
}
export const getDialogPrimaryId = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        const id = dialogConfig.dialogPrimaryName
        return id
    })
}


export const getDialogShowFooter = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        const showFooter = dialogConfig.showFooter
        return showFooter
    })
}


export const getDialogHeight = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.height
    })
}
export const getDialogWidth = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.width
    })
}

export const getDialogResize = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.resize
    })

}

export const getDialogMinWidth = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.minWidth
    })
}

export const getDialogMinHeight = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.minHeight
    })
}


export const getDialogMinMask = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.mask
    })
}

export const getDialogMaskClosable = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.maskClosable
    })
}

export const getDialogModelValue = (dialog: dialog) => {
    return computed({
        get: () => {
            const dialogConfig = dialog.dialogConfig
            return dialogConfig.modelValue
        },
        set: (value) => {
            dialog.dialogConfig.modelValue = value
        }
    })
}

export const getDialogOnHide = (dialog: dialog) => {
    return computed({
        get: () => {
            const fn = (params: any) => {
                const dialogConfig = dialog.dialogConfig
                dialogConfig.modelValue = false
                dialog.dialogConfig.hasOpen = true
                const $modal = params.$modal
                console.log($modal)
            }
            return fn
        },
        set: () => {

        }
    })
}

export const getDialogDestroyOnClose = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.destroyOnClose
    })
}