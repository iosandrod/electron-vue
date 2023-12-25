import { defineComponent, h } from 'vue'
import { contextMenu } from '../businessTable/contextMenu'

export default defineComponent({//
    props: ['contextMenuInstance'],
    setup(props) {
        const _menu = props.contextMenuInstance as contextMenu
        // return { menu: _menu }
        return _menu.component
    },
    // render() {
    //     return this.menu?.component!() || h('div', ['123'])
    // }
})