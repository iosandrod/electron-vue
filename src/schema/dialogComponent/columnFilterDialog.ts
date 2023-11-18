import { StyleType, dialogComponent } from "@/types/schema";
import { getRenderFn } from "../columnFn";
import { table } from "../table";
import { computed, h, reactive, ref, resolveComponent } from "vue";
import { defaultDialog } from "./defaultDialog";
import { VxeButton } from 'vxe-table'
import tableView from "../schemaComponent/tableView";
import columnFilterVue from './columnFilter.vue'
export const columnFilter: dialogComponent = {
    default: (dialog) => {
        const defaultDialogDivFn = defaultDialog.default!(dialog) as any
        const modalData = dialog.dialogConfig.modalData
        const props = modalData.tableConfig
        const show = ref(false)
        // const tableCom = h('div', {}, [h(VxeButton, {
        //     onClick: () => {
        //         show.value = !show.value
        //     }
        // }, ['button']), h(tableView, { ...props, style: { display: show.value == true ? 'flex' : 'none' } })])
        const arr = Array(1000).map((v, i) => i)
        // const tableCom = h('div', {}, [arr.map(v => h('div', {}, [v]))])
        const tableCom = h(columnFilterVue, { name: 'xiaofeng' })
        const node = h(defaultDialogDivFn(tableCom), {
            onClick: (event: MouseEvent) => {
                event.stopPropagation()
            }
        })
        return node
        // return h('div')
    },
    header: (dialog) => {
        return h('div')
    }
}

export default columnFilter
