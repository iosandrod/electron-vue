import { watch, computed, defineComponent, ref, h, defineExpose, reactive, watchEffect, nextTick, onUnmounted, onMounted } from 'vue'
import { column } from '../column'
import { getOutSizeDiv } from '../columnFn'
import { StyleType, tableState } from '@/types/schema'
import { getRenderFn } from '../columnFn'
import { editPool } from '../formitemComFn'
import { createFormItem, formitem } from '../formitem'
import { table } from '../table'
// import { getItemSlotsDefautlEditCom } from '../formitemFn'
import { _columns } from '../entityColumn'
import formitemView from '../editComponent/formitemView'
import inputView from '../schemaComponent/inputView'
import { input } from '../input'
import { VxeCheckbox } from 'vxe-table'
import { useMousePoint } from '../icon'
export default defineComponent({
    props: ['column', 'row', 'merge', 'checked', 'disable', 'indeterminate'],
    setup(props, context) {
        //行与列
        const isMerge = props.merge
        const column = computed(() => {
            return props.column as any
        })
        const row = computed(() => {
            return props.row! as any
        })
        const _column = column.value
        const table = _column.params as table
        const field = _column.field
        const labelField = table.tableConfig.checkLabelField!
        const showValue = computed(() => {
            const value = row.value[labelField]
            return value
        })
        const modelValue = computed(() => {
            return props.checked
        })
        return () => {
            let defaultCom: any = null
            const defaultComFn = getRenderFn('div', { style: { wdith: '100%', height: "100%", background: "" } as StyleType })
            const mergeComFn = useMousePoint({ style: { justifyContent: "left" } })
            defaultCom = defaultComFn([mergeComFn([showValue.value])])
            const hiddenCheckbox = table.tableConfig.hiddenCheckbox
            if (hiddenCheckbox == true) {
                return defaultCom
            }
            const checkCom = h(VxeCheckbox, {
                indeterminate: props.indeterminate,
                modelValue: modelValue.value,
                onChange: ({ value }) => {
                    table.toggleCheckboxRow(row.value)
                }
            })
            return checkCom
        }
    },
})
