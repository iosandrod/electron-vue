import { computed, defineComponent, h } from "vue";
import { column } from "../column";

export default defineComponent({
    props: ['column'],
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
        const checkboxOptions = computed(() => {
            const _column = column.value
            const columnConfig = _column.columnConfig//列配置
            return columnConfig.filterOptions
        })
        return () => {
            return h('div', ['123'])
        }
    }
})