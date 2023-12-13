import { VNode, defineComponent, h, onMounted, resolveComponent } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps } from 'vxe-table'
import { createDialog } from "../dialog"
export default defineComponent({
    props: ['type', 'dialogName', 'dialogInstance'] as Array<keyof VxeModalProps | 'dialogName' | 'dialogInstance'>,
    setup(props, context) {
        let dialogInstance = props.dialogInstance
        const dialogName = props.dialogName
        if (dialogInstance == null) {
            dialogInstance = createDialog(dialogName, props)
        }
        return { dialog: dialogInstance }
    },
    render() {
        let component = this.dialog.component
        return component()
    }
})
