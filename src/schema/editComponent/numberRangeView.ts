import { Directive, computed, defineComponent, h, ref, withDirectives } from 'vue'
import { getOutSizeEditDiv } from '../formitemComFn'
import { formitem } from '../formitem'
import { VxeInput, VxeInputInstance } from 'vxe-table'
export default defineComponent({
    props: ['formitem', 'form', 'data'],
    setup(props, context) {
        const formitem: formitem = props.formitem
        const itemConfig = formitem.itemConfig
        const field = itemConfig.field!
        const _data = computed(() => {
            return props.data
        })
        const valueArr = computed({
            get() {
                let arr = _data.value[field]
                if (!Array.isArray(arr)) {
                    arr = []
                }
                return arr
            },
            set(value) {
                _data.value[field] = value
            }
        }) as any
        const value1 = computed({
            set: (value) => {
                const arr = valueArr.value
                arr[0] = value
                valueArr.value = arr
            },
            get: () => {
                const arr = valueArr.value
                return arr[0]
            }
        })
        const value2 = computed({
            set: (value) => {
                const arr = valueArr.value
                arr[1] = value
                valueArr.value = arr
            },
            get: () => {
                const arr = valueArr.value
                return arr[1]
            }
        })
        const input1 = ref<VxeInputInstance>(null as any)
        const input2 = ref<VxeInputInstance>(null as any)
        return () => {
            const diretive: Directive = {
                mounted(div, vnode) {
                    formitem.pageRef['edititem1'] = input1.value
                    formitem.pageRef['edititem2'] = input2.value
                },
                unmounted() {
                    formitem.pageRef['edititem1'] = null
                    formitem.pageRef['edititem2'] = null
                }
            }
            const inputCom1 = (h(VxeInput,
                {
                    modelValue: value1.value, onChange: ({ value: _value }: any) => {
                        value1.value = _value
                    },
                    onFocus: () => {
                    },
                    ref: input1
                })
            )
            const inputCom2 = (h(VxeInput,
                {
                    modelValue: value2.value, onChange: ({ value: _value }: any) => {
                        value2.value = _value
                    },
                    onFocus: () => {
                    },
                    ref: input2
                })
            )
            return withDirectives(h('div', [inputCom1, inputCom2]), [[diretive]])
        }
    }
})

