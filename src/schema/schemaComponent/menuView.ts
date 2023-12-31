import { defineComponent } from 'vue'
import { menu } from '../menu'

export default defineComponent({
    props: ['menuInstance'],
    setup(props) {
        const _menu = props.menuInstance as menu
        return _menu.component
    }
})