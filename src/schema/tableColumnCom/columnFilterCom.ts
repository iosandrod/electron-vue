import { computed, defineComponent, h, nextTick } from "vue";
import { column } from "../column";
import { StyleType } from "@/types/schema";
import { CheckboxGroup, VxeCheckbox } from "vxe-table";
import tableView from "../schemaComponent/tableView";

export default defineComponent({
    props: ['column', 'data'],
    setup(props, context) {
        const column = computed(() => {
            return props.column as column
        })
        const table = computed(() => {
            return column.value.table
        })//表格
        let field = column.value.columnConfig.field!
        let filterConfig = table.value?.tableConfig.filterConfig?.find(row => {
            return row.field == field
        })
        if (filterConfig == null) {
            table.value?.tableConfig.filterConfig?.push({
                field: field,
                filterType: "array",
                filterData: []
            })
            filterConfig = table.value?.tableConfig.filterConfig?.find(row => {
                return row.field == field
            })
        }

        const tableRef = column.value.table!.pageRef.filterTable
        return () => {
            return h('div', { style: { height: '100%', width: '100%' } as StyleType }, [h(tableView, { tableInstance: tableRef })])
        }
    }
})