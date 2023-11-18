import { computed, defineComponent, h } from 'vue'
import { column } from '../column'
import { getOutSizeDiv } from '../columnFn'
import { StyleType, tableState } from '@/types/schema'
import { getRenderFn } from '../columnFn'
import { editPool } from '../formitemComFn'
import { createFormItem } from '../formitem'
import { table } from '../table'
import { getItemSlotsDefautlEditCom } from '../formitemFn'
export default defineComponent({
    props: ['column', 'row'],
    setup(props, context) {
        //行与列
        const column = computed(() => {
            return props.column as column
        })
        const row = computed(() => {
            return props.row! as any
        })
        const formitem = createFormItem(column.value.renderFormitem, null)
        formitem.table = column.value.table as any
        const showValue = computed(() => {
            const field = column.value.renderColumn.field!
            const value = row.value[field as string]
            return value
        })
        const canEdit = computed(() => {
            let _editState: tableState = column.value.table?.tableState as any
            if (['fullEdit', 'moreRowEdit', 'singleRowEdit'].includes(_editState)) {
                return true
            }
            return false
        })
        const renderCom = computed(() => {
            const _canEdit = canEdit.value
            let editCom: any = null
            if (_canEdit == true) {
                editCom = getItemSlotsDefautlEditCom(formitem, row.value, null)
                return editCom
            }
            const style = {
                width: '100%'
            }
            return getRenderFn('div', { style: { ...style } })([showValue.value])
        })
        return () => {
            return renderCom.value
        }
    }
})
