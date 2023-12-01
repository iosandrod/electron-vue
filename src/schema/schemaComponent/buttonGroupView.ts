import { defineComponent } from 'vue'
import { basicEntity } from '../businessTable/basicEntity'


export default defineComponent({
    props: ['entity', 'buttons'],
    setup(props, context) {
        const entity = props.entity as basicEntity
        return
    }
})