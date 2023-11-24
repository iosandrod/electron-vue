import { computed, defineComponent, h } from 'vue'
import { formitem } from '../formitem'
import { DatePicker, DatePickerProps } from 'ant-design-vue'
import { VxeInput, VxeInputProps } from 'vxe-table'
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
                const value = '2020-06-12 15:00:15'
                // const value = _data.value[itemConfig.field!] as any
                return value
            }
        })
        const datePickerRender = computed(() => {
            const mode = itemConfig.type
            const datePicker: VxeInputProps = {
                modelValue: bindValue.value as any,
                type: mode as any,
                transfer: true,
            }
            return datePicker
        })
        return () => {
            const pickCom = h(VxeInput, { ...datePickerRender.value as any, style: {} })
            return h('div', {}, [pickCom])
        }
    }
})