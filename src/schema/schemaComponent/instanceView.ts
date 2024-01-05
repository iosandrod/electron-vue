import { computed, defineComponent, nextTick, onMounted, onUnmounted, toRaw, watchEffect } from 'vue'
import { menu } from '../menu'
import { TabsProps } from 'ant-design-vue'
import { h } from 'vue'
import { tabsProps } from 'ant-design-vue/es/tabs/src/Tabs'
import { createTab, tab } from '../tab'
import { input } from '../input'
import { table } from '../table'
export default defineComponent({
    props: ['instance', 'data', 'table'] as Array<keyof TabsProps | 'table' | 'instance' | 'data' | 'field' | 'tabInstance' | 'tabItems'>,
    setup(props) {
        const instance = props.instance
        let com: any = instance?.component
        if (com == null) {
            com = () => {
                return h('div', {})
            }
        }
        if (toRaw(instance) instanceof input) {
            let inputInstance = instance
            inputInstance.getData = () => {
                return props.data
            }
            if (props.field) {
                inputInstance.getField = () => {
                    return props.field
                }
            }
            inputInstance.getTable = () => {
                return props.table
            }
            let effectFn: any = null
            let field = inputInstance.inputConfig.field!
            onMounted(() => {
                effectFn = watchEffect(() => {
                    try {
                        const data: any = props.data || {}
                        let value = data[field!]
                        nextTick(() => {
                            const itemChange = inputInstance.inputConfig.itemChange
                            if (typeof itemChange == 'function') {
                                let form = null
                                if (inputInstance.getForm) {
                                    form = inputInstance.getForm()
                                }
                                itemChange({ value: value, form: form, inputInstance: inputInstance, data: props.data })
                            }
                        })
                    } catch (error) {
                        console.error(`itemChange事件触发失败,字段为${field}`)
                    }
                })
            })
            onUnmounted(() => {
                effectFn()
                effectFn = null
            })
            let type = props.type
            if (type != null) {
                inputInstance.inputConfig.type = type
                inputInstance.runInitMethod(type)
            }
            const table = props.table as table//看是否是table
            const tableState = computed(() => {
                return table?.tableState
            })
        }
        // return com
        return { instance: props.instance }
    },
    render() {
        const component = this.instance?.component
        if (component == null) {
            return h('div', {})
        }
        return this.instance.component()
    },
})