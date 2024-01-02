import { computed, defineComponent } from 'vue'
import { dialog } from '../dialog'

export default defineComponent({
    props: ['dialog', 'modalData'],
    setup(props, context) {
        const dialog = props.dialog as dialog
        return dialog.footerComponent
    }
})