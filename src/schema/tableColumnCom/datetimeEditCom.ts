import { computed, defineComponent, h } from 'vue'
import { column } from '../column'
import { StyleType } from '@/types/schema'
import { getInSizeDiv, getOutSizeDiv } from '../columnFn'
import { getRenderFn } from '../columnFn'
export default defineComponent({
    props: ['column', 'row'],
    setup(props, context) {
        //行与列
        const column = computed(() => {
            return props.column as column
        })
        const row: any = computed(() => {
            return props.row!
        })
        const showValue = computed(() => {
            const table = column.value.table
            const field = column.value.columnConfig.field as string
            const _value = row.value[field]
            return _value
        })
        return () => {
            const outSizeDiv = getOutSizeDiv(column.value, row)
            return outSizeDiv
        }
    }
})


// export const getOutSizeDiv = (column: column, row: any) => {
//     const style: StyleType = {//外部div的配置
//         width: '100%',
//     }
//     const inSizeDiv = getInSizeDiv(column, row)
//     const value = row[column.renderColumn.field as string]
//     return getRenderFn('div', { style: { ...style } })([inSizeDiv([value])])
// }