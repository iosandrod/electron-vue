import { VNode, defineComponent, h, onMounted, resolveComponent } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps } from 'vxe-table'
import { createPopup } from "../popup"
import { QPopupProxyProps } from "quasar"
// import { createDialog } from "../dialog"
export default defineComponent({
    props: ['type', 'onHide', 'modelValue', 'onShow'] as Array<keyof QPopupProxyProps | 'dialogName'>,
    setup(props, context) {
        const dialog: any = createPopup(props, context)
        return dialog.component
    },
})
