import { StyleType, dialogComponent } from "@/types/schema";
import { getRenderFn } from "../columnFn";
import { table } from "../table";
import { computed, h, reactive, resolveComponent } from "vue";
import { defaultDialog } from "./defaultDialog";
import tableView from "../schemaComponent/tableView";




export const columnFilter: dialogComponent = {
    default: (dialog) => {
        const defaultDialogDivFn = defaultDialog.default!(dialog) as any
        const modalData = dialog.dialogConfig.modalData
        const loadData = computed(() => {
            return modalData.loadData || []
        })
        const loadColumns = computed(() => {
            return modalData.loadColumns || []
        })
        const props = reactive({ data: loadData.value, columns: loadColumns.value })
        // const tableCom = h('div', {}, ['123'])
        const _talbeView = resolveComponent('table-view')
        const tableCom = h(_talbeView, props)
        const node = defaultDialogDivFn(tableCom)
        // console.log(node, 'testNode')
        console.log(tableCom)
        // return tableCom
        return node
    },
    header: (dialog) => {
        return h('div')
    }
}

export default columnFilter
