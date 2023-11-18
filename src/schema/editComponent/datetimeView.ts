import { computed, defineComponent, h } from 'vue'
import { formitem } from '../formitem'
import { DatePicker, DatePickerProps } from 'ant-design-vue'
import { PanelMode } from 'ant-design-vue/es/vc-picker/interface'

export default defineComponent({
    props: ['formitem', 'form', 'data'],
    setup(props, context) {
        const formitem: formitem = props.formitem
        const itemConfig = formitem.itemConfig
        const _data = computed(() => {
            return props.data
        })
        const field = itemConfig.field
        const bindValue = computed({
            set(value) {
                _data.value[field!] = value
            },
            get() {
                return _data.value[itemConfig.field!] as any
            }
        })
        const datePickerRender = computed(() => {
            const mode = itemConfig.type
            const datePicker: DatePickerProps = {
                value: bindValue.value as any,
                mode: mode as PanelMode
            }
            return datePicker
        })
        return () => {
            const pickCom = h(DatePicker, { ...datePickerRender.value as any, style: {} })
            return h('div', {}, [pickCom])
        }
    }
})