import { Directive, computed, defineComponent, h, withDirectives } from 'vue'
import { getOutSizeEditDiv } from '../formitemComFn'
import { formitem } from '../formitem'
import { VxeInput } from 'vxe-table'
export default defineComponent({
    props: ['formitem', 'form', 'data'],
    setup(props, context) {
        const formitem: formitem = props.formitem
        const itemConfig = formitem.itemConfig
        const field = itemConfig.field!
        const _data = computed(() => {
            return props.data
        })
        const value = computed({
            get() {
                return _data.value[field]
            },
            set(value) {
                _data.value[field] = value
            }
        }) as any
        return () => {
            const diretive: Directive = {
                mounted(div, vnode) {
                    const instance = vnode.instance
                    const $refs = instance?.$refs!
                    const vxeinput = $refs['vxeinput']
                    formitem.pageRef['edititem'] = vxeinput
                },
                unmounted() {
                    formitem.pageRef['edititem'] = null
                }
            }
            const inputCom = withDirectives(h(VxeInput,
                {
                    type: "number",
                    modelValue: value.value, onChange: ({ value: value1 }: any) => {
                        value.value = value1
                    },
                    onFocus: () => {
                    },
                    ref: 'vxeinput'
                })
                , [[diretive]])
            return inputCom
        }
    }
})

