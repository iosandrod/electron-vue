import { computed, defineComponent, h } from 'vue'
import { dialog } from '../dialog'
import { VxeButton } from 'vxe-table'
const obj: any = {

}

obj.default = defineComponent({
    props: ['dialog'],
    setup(props, context) {
        const dialog = props.dialog//弹出框
    }
})

obj.header = defineComponent({
    props: ['dialog'],
    setup(props, context) {
        const dialog = props.dialog
    }
})

obj.footer = defineComponent({
    props: ['dialog'],
    setup(props, context) {
        const dialog = props.dialog as dialog
        const buttons = computed(() => {
            const _buttons = dialog.dialogConfig.buttons || []
            return _buttons
        })
        return { buttons }
    },
    render() {
        const buttons = this.buttons
        return h('div', {}, buttons.map(btn => {
            return h(VxeButton, {
                onClick: () => {
                    console.log('click')
                }
            })
        }))
    }
})


//