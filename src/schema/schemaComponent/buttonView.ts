import { VNode, defineComponent, h, onMounted, resolveComponent, useSlots } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps, VxeButtonProps, VxeButton } from 'vxe-table'
import { button, createButton } from "../button"
export default defineComponent({
    props: ['type', 'size', 'round', 'buttonInstance'] as Array<keyof VxeButtonProps & { buttonInstance?: any }>,
    setup(props: any, context) {
        let button: any = null
        if (props.buttonInstance != null) {
            button = props.buttonInstance
        } else {
            button = createButton(props)
        }
        return { button: button as button }
    },
    render() {
        return this.button.component!()
        // let component = this.button.component
        // let _com = component!()
        // return _com()
        // const button = this.button
        // const renderButton = this.button.renderButton
        // if (button.displayState == 'destroy') {
        //     return h('div')
        // }
        // const slots = renderButton?.slots! || {} as any
        // return h(VxeButton, renderButton, {
        //     default: slots?.default,
        //     icon: slots?.icon,
        //     dropdowns: slots?.dropdowns
        // })
    }
})
