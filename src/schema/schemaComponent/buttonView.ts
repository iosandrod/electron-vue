import { VNode, defineComponent, h, onMounted, resolveComponent, useSlots } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps, VxeButtonProps } from 'vxe-table'
import { createButton } from "../button"
export default defineComponent({
    props: ['type', 'size', 'round'] as Array<keyof VxeButtonProps>,
    setup(props, context) {
        const button: any = createButton(props, context,)
        return button.component
    },
})
