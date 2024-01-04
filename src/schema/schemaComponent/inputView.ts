import { isProxy, computed, defineComponent, watch, onUnmounted, watchEffect, h, ref, toRef, onMounted, nextTick, reactive } from 'vue'
import { createInput, input } from '../input'
import { inputConfig } from '@/types/schema'
import { table } from '../table'
import defaultCom from '../tableColumnCom/defaultCom'
export default defineComponent({
    props: ['type', 'column', 'table', 'renderFormitem', 'inputInstance', 'data', 'field', 'onChange', 'options', 'modelValue'] as Array<'inputInstance' | 'column' | 'field' | 'data' | 'renderFormitem' | 'table' | keyof inputConfig>,
    setup(props) {
        // let inputInstance = props.inputInstance
        const _data = computed(() => {
            return props.data
        })
        let inputInstance: input = null as any
        const renderFormitem = props.renderFormitem || {}
        if (props.inputInstance != null) {
            inputInstance = props.inputInstance
        } else {
            let createConfig = {} as any
            let _props: any = props
            Object.keys(props).forEach(key => {
                if (key == 'renderFormitem') {
                    return
                }
                if (key == 'type') {
                    //不要去改变component节点
                    createConfig.type = _props[key] || renderFormitem[key]
                    return
                }
                createConfig[key] = computed(() => {
                    if (_props[key] != null) {
                        return _props[key]
                    }
                    return renderFormitem[key]
                })
            })
            createConfig.modelValue = computed(() => {
                return props.data[props.field]
            })
            inputInstance = createInput(createConfig) as any
        }
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
                            itemChange({ value: value, form: form, inputInstance: inputInstance })
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
        return { input: inputInstance, tableState, table, data: _data, column: props.column }
    },
    render() {
        const component = this.input.component
        const tableState = this.tableState
        if (tableState == null) {
            return component()
        }
        if (tableState == 'fullEdit') {
            return component()
        }
        const column = this.column
        const showValue = h(defaultCom, { row: this.data, column: column, merge: false })
        if (tableState == 'moreRowEdit') {
            let table = this.table as table
            let editData = table.tableData.editData
            if (editData.includes(this.data)) {
                return component()
            } else {
                return showValue
            }
        } else if (tableState == 'singleRowEdit') {
            let table = this.table
            let curRow = table.tableData.curRow
            if (this.data == curRow) {
                return component()
            } else {
                return showValue
            }
        }
        return showValue
    }
})