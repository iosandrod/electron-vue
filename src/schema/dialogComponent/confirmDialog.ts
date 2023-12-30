import { computed, defineComponent, h } from 'vue'
import { dialog } from '../dialog'
import { VxeButton } from 'vxe-table'
import { message } from 'ant-design-vue'




export const confirm_init = (dialog: dialog) => {
    const _this = dialog
    confirm_header_init(_this)
    confirm_default_init(_this)
    confirm_footer_init(_this)
}


export const confirm_header_init = (dialog: dialog) => {
}

export const confirm_default_init = (dialog: dialog) => {
    const dialogConfig = dialog.dialogConfig
    const message = computed(() => {
        return dialogConfig.message as string
    })
    const vNode = () => {
        // return h('div', [message.value])
        return h('div', message.value)
    }
    dialog.defaultComponent = vNode
}

export const confirm_footer_init = (dialog: dialog) => {
    const buttons = computed(() => {
        const _buttons = dialog.dialogConfig.buttons || []
        return _buttons
    })
    const vNode = () => {
        return h('div', {}, buttons.value.map(btn => {
            return h(VxeButton, {
                onClick: async () => {
                    const btnFun = btn.btnFun as Function
                    if (typeof btnFun == 'function') {
                        await btnFun(dialog)
                    } else {
                        message.error('未找到执行函数')
                    }
                }
            }, () => h('div', [btn.text || '']))
        }))
    }
    dialog.footerComponent = vNode
}