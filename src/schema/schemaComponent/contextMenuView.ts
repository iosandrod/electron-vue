import { defineComponent } from 'vue'
import { contextMenu } from '../businessTable/contextMenu'

export default defineComponent({
    props: ['contextMenuInstance'],
    setup(props) {
        const _menu = props.contextMenuInstance as contextMenu
        return _menu.component
    }
})