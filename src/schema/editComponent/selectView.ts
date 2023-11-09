import { VNode, defineComponent, h, onMounted, resolveComponent } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps } from 'vxe-table'
import { SelectProps } from "ant-design-vue"
import { createSelect } from "../selectEdit"
export default defineComponent({
    props: [] as Array<keyof SelectProps>,
    setup(props) {
        const select: any = createSelect(props)
        return select.component
    },
})
