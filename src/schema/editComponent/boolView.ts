import { Directive, computed, defineComponent, h, withDirectives } from 'vue'
import { getOutSizeEditDiv } from '../formitemComFn'
import { formitem } from '../formitem'
import { Switch, SwitchProps } from 'ant-design-vue'
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
        const renderSwitch = computed(() => {
            const obj: SwitchProps = {
                checkedValue: true,
                unCheckedValue: false,
                checked: value.value,
                onChange: (value1) => {
                    value.value = value1
                }
            }
            return obj
        })
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
            const switchCom = withDirectives(h(Switch,
                {
                    ...renderSwitch.value
                })
                , [[diretive]])
            return switchCom
        }
    }
})

