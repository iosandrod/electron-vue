import { defineComponent } from 'vue'
import { menu } from '../menu'

export default defineComponent({
    props: ['menu'],
    setup(props) {
        const _menu = props.menu as menu
        return _menu.component
    }
})