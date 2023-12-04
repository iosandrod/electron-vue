import { computed, h, withCtx, createSlots, defineSlots, slot, shallowRef } from "vue";
import { dialog } from "./dialog";
import { ModalDefaultSlotParams } from 'vxe-table'
import { VxeButton } from "vxe-table";
import { table } from "./table";
import { dialogComponent, position } from "@/types/schema";
import { tranPosition, tranPositionNumber } from "@/utils/utils";
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
            let com: any = null
            const dialogComponent = dialog.dialogComponent
            const dialogName = dialog.dialogName! as keyof typeof dialogComponent
            const defaultCom = dialogComponent[dialogName]?.default
            if (defaultCom != null) {
                const modalData = dialog.dialogConfig.modalData
                com = h(defaultCom, { dialog: dialog, modalData: modalData })
            } else {
                com = h('div', ['default'])
            }
            return com
        }
    })
}

export const getDialogSlotsFooter = (dialog: dialog) => {
    return computed(() => {
        return (params: ModalDefaultSlotParams) => {
            let com: any = null
            const dialogComponent = dialog.dialogComponent
            const dialogName = dialog.dialogName! as keyof typeof dialogComponent
            const _com = dialogComponent[dialogName] as any
            const defaultCom = _com?.footer
            if (defaultCom != null) {
                const modalData = dialog.dialogConfig.modalData
                com = h(defaultCom, { dialog: dialog, modalData: modalData })
            } else {
                com = h('div', ['footer'])
            }
            return com
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



export const getDialogDestroyOnClose = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        return dialogConfig.destroyOnClose
    })
}

export const getDialogLockView = (dialog: dialog) => {
    return computed(() => {
        return dialog.dialogConfig.lockView
    })
}

export const getDialogPosition = (dialog: dialog) => {
    return computed(() => {
        const dialogConfig = dialog.dialogConfig
        const position = dialogConfig.position
        if (typeof position == 'string') {
            return position
        }
        const _position = tranPosition(position as position)
        return _position
    })
}

export const getDialogOnShow = (dialog: dialog) => {
    return computed(() => {
        return (params: any) => {
            const $modal = params.$modal
            dialog.modalInstance = ($modal)
            const onShow = dialog.dialogConfig.onShow
            if (typeof onShow == 'function') {
                onShow(params)
            }
        }
    })
}

export const getDialogOnHide = (dialog: dialog) => {
    return computed(() => {
        const fn = (params: any) => {
            dialog.modalInstance = null as any
            const onHide = dialog.dialogConfig.onHide
            if (typeof onHide == 'function') {
                onHide(params)
            }
            // const dialogConfig = dialog.dialogConfig
            // dialogConfig.modelValue = false
            // dialog.dialogConfig.hasOpen = true
        }
        return fn
    },
    )
}

// export const getDialog
