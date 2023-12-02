import { computed, defineComponent, h } from 'vue'
import { basicEntity } from '../businessTable/basicEntity'
import { StyleType } from '@/types/schema'
import { entityButton } from '../entityButton'
import buttonView from './buttonView'


export default defineComponent({
    props: ['entity', 'buttons'],
    setup(props, context) {
        // const entity = props.entity as basicEntity
        const buttons = computed(() => {
            return props.buttons as entityButton[]
        })
        return () => {
            return h('div', { style: {} as StyleType }, buttons.value.map(btn => {
                const component = btn.component!()
                return component
            }))
        }
    }
})