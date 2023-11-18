import { computed, defineComponent, h } from 'vue'
import { column } from '../column'
import { getOutSizeDiv } from '../columnFn'
import { StyleType } from '@/types/schema'
import { getRenderFn } from '../columnFn'
export default defineComponent({
    props: ['column', 'row'],
    setup(props, context) {
        //行与列
        const column = computed(() => {
            return props.column as column
        })
        const row = computed(() => {
            return props.row! as any
        })
        const showValue = computed(() => {
            const field = column.value.renderColumn.field!
            const value = row.value[field as string]
            return value
        })
        return () => {
            const style: StyleType = {//外部div的配置
                width: '100%',
            }
            return getRenderFn('div', { style: { ...style } })([showValue.value])
        }
    }
})
