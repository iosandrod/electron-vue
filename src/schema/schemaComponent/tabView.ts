import { defineComponent } from 'vue'
import { menu } from '../menu'

export default defineComponent({
    props: ['tabInstance'],
    setup(props) {
        const _tab = props.tabInstance as menu
        return _tab.component
    }
})