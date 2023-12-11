import { defineComponent } from 'vue'
import { menu } from '../menu'
import { h } from 'vue'
export default defineComponent({
    props: ['tabInstance'],
    setup(props) {
        const _tab = props.tabInstance as menu
        return _tab.component
        // return () => {
        //     return h('div', ['tab'])
        // }
    }
})