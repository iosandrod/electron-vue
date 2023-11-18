import { computed, defineComponent, h } from 'vue'
import { column } from '../column'

export default defineComponent({
    props: ['column', 'row'],
    setup(props, context) {
        //行与列
        const column = computed(() => {
            return props.column as column
        })
        const row: any = computed(() => {
            return props.row
        })
        return () => {
            return h('123')
        }
    }
})