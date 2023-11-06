import { VNode, defineComponent, h, onMounted, resolveComponent } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps } from 'vxe-table'
import { createDialog } from "../dialog"
export default defineComponent({
    props: ['type', 'dialogName'] as Array<keyof VxeModalProps | 'dialogName'>,
    setup(props, context) {
        const dialog: any = createDialog(props, context, props.dialogName)
        return dialog.component
    },
})
