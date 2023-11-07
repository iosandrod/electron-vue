import { StyleType, dialogComponent } from "@/types/schema";
import { getRenderFn } from "../columnFn";
import { table } from "../table";
import { computed, h } from "vue";
import { defaultDialog } from "./defaultDialog";
// export const getColumnFilterDialog = (table: table) => {
//     const style: StyleType = {
//         background: 'red'
//     }
//     const _class = ['h-full', 'w-full']
//     const outSizeDivFn = getRenderFn('div', { class: _class, style: style })
//     return outSizeDivFn(['123'])
// }




export const columnFilter: dialogComponent = {
    default: (dialog) => {
        const defaultDialogDivFn = defaultDialog.default!(dialog)
        // const columnFilterDiv = h()
        return h('div', {}, ['default'])
    },
    header: (dialog) => {
        return h('div')
    }
}

export default columnFilter
