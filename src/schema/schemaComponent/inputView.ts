import { computed, defineComponent, watch, onUnmounted, watchEffect } from 'vue'
import { input } from '../input'

export default defineComponent({
    props: ['inputInstance', 'data', 'field'],
    setup(props) {
        const _input = computed<input>(() => {
            return props.inputInstance as input
        })
        if (props.data != null) {
            _input.value.getData = () => {
                return props.data
            }
        }
        onUnmounted(() => {
            _input.value.getData = null
        })
        return { inputInstance: _input }
    },
    render() {
        return this.inputInstance.component()
    }
})