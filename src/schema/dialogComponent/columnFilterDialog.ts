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
        const props = modalData.tableConfig
        const _talbeView = resolveComponent('table-view')
        const tableCom = h(_talbeView, props)
        const node = h(defaultDialogDivFn(tableCom), {
            onClick: (event: MouseEvent) => {
                event.stopPropagation()
            }
        })
        return node
    },
    header: (dialog) => {
        return h('div')
    }
}

export default columnFilter
