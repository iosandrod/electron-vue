import { defineComponent } from 'vue'
import { input } from '../input'

export default defineComponent({
    props: ['inputInstance'],
    setup(props) {
        const _input = props.inputInstance as input
        return _input.component
    }
})