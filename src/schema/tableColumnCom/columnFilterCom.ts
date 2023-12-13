import { computed, defineComponent, h } from "vue";
import { column } from "../column";
import { StyleType } from "@/types/schema";

export default defineComponent({
    props: ['column', 'data'],
    setup(props, context) {
        const column = computed(() => {
            return props.column as column
        })
        const table = computed(() => {
            return column.value.table
        })//表格
        const checkboxValue = computed({
            get() { },
            set() { }
        })
        let field = column.value.columnConfig.field!
        const checkboxOptions = computed(() => {
            const _column = column.value
            const columnConfig = _column.columnConfig//列配置
            return columnConfig.filterOptions
        })
        const showData = computed(() => {
            const getTableShowData = column.value.getTableShowData
            let data = getTableShowData()
            let _data = data.map(row => {
                return row[field]
            })
            return _data
        })
        return () => {
            return h('div', { style: { display: "flex", flexDirection: 'column' } as StyleType }, showData.value)
        }
    }
})