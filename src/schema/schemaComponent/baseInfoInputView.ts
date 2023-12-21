import { computed, defineComponent, watch, onUnmounted, watchEffect, h } from 'vue'
import { createInput, input } from '../input'
import { inputConfig } from '@/types/schema'
export default defineComponent({
    props: ['type', 'renderFormitem', 'inputInstance', 'data', 'field', 'onChange', 'options', 'modelValue'] as Array<'inputInstance' | 'field' | 'data' | 'renderFormitem' | keyof inputConfig>,
    setup(props) {
        let inputInstance: input = null as any
        const renderFormitem = props.renderFormitem || {}
        if (props.inputInstance != null) {
            inputInstance = props.inputInstance
        } else {
            inputInstance = createInput({
                ...props
                ,
                ...renderFormitem,
                modelValue: computed(() => {
                    return props.data[props.field]
                })
            })
        }
        inputInstance.getData = () => {
            return props.data
        }
        inputInstance.getField = () => {
            return props.field
        }
        return inputInstance.component
    },
    // render() {
    //     const component = this.input.component
    //     return h('div', { style: { height: '100%', width: '100%' } }, [component()])
    // }
    // render() {
    //     return this.inputInstance.component()
    // }
})