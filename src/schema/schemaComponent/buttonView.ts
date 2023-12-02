import { VNode, defineComponent, h, onMounted, resolveComponent, useSlots } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps, VxeButtonProps } from 'vxe-table'
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
    }
})
