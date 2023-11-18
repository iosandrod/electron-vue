import { VNode, defineComponent, h, onMounted, resolveComponent, computed } from "vue"
import { VxeTableProps, VxeGridProps, VxeGrid, Grid, VxeModalProps } from 'vxe-table'
import { Select, SelectProps, SelectOption, SelectOptGroup } from "ant-design-vue"
import { createSelect } from "../selectEdit"
import { styleBuilder } from "@/utils/utils"
import { formitem } from "../formitem"
export default defineComponent({
    props: ['formitem', 'baseInfoItem', 'form', 'data'],
    setup(props) {
        const _data = computed(() => {
            return props.data
        })
        const formitem: formitem = props.formitem
        const itemConfig = formitem.itemConfig
        const selectStyle = styleBuilder.setFullWidth().setFullHeight().getStyle()
        const options = computed(() => {
            let data = itemConfig.options || []
            return data
        })
        const bindValue = computed({
            set(value) {
                _data.value[itemConfig.field!] = value
            },
            get() {
                let value = _data.value[itemConfig.field!]
                if (options.value.map((v: any) => v.value).includes(value)) {
                    return value
                }
                return ''
            }
        })
        const selectRender = computed<SelectProps>(() => {
            const obj: SelectProps = {
                allowClear: true,
                filterOption: (input: string, option: any) => {
                    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                },
                options: options.value,
                showSearch: true,
                onChange: (value => {
                    bindValue.value = value
                }),
                onFocus: () => {
                    console.log('focus')
                },
                value: bindValue.value as string
            }
            return obj
        })
        return () => {
            const selectCom = h(Select, { ...selectRender.value, style: selectStyle }, {
                option: (params: any) => {
                    const { value, label } = params
                    const style = styleBuilder.setFlexBetween().setFull().getStyle()
                    return h('div', { style }, [h('div', {}, label), h('div', {}, value)])
                },
            })
            return selectCom
        }
    },
})
