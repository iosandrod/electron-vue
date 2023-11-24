import { computed, defineComponent, h, defineExpose } from 'vue'
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
        let formitem = createFormItem(column.value.renderFormitem, null)
        formitem.table = column.value.table as any
        if (column.value.columnConfig.editType == null) {
            formitem = null as any
        }//如果没有编辑类型,那么置空
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
        const editDisable = computed(() => {
            return false
        })
        const renderCom = computed(() => {
            const _canEdit = canEdit.value
            const _editDisable = editDisable.value
            let editCom: any = null
            if (_canEdit == true && _editDisable == false) {//表可编辑+行可编辑
                if (formitem == null) {
                    return getRenderFn('div', { style: { wdith: '100%' } })([showValue.value])
                }
                let editState = column.value.table?.tableState
                if (editState == 'singleRowEdit') {
                    let _row = row.value
                    let curRow = column.value.table?.tableData.curRow
                    if (_row === curRow) {
                        editCom = getItemSlotsDefautlEditCom(formitem, row.value, null)
                    } else {
                        editCom = getRenderFn('div', { style: { wdith: '100%' } })([showValue.value])
                    }
                } else if (editState == 'fullEdit') {
                    editCom = getItemSlotsDefautlEditCom(formitem, row.value, null)
                } else if (editState == 'moreRowEdit') {
                    let _row = row.value
                    let editData = column.value.table?.tableData.editData
                    if (editData?.includes(_row)) {
                        editCom = getItemSlotsDefautlEditCom(formitem, row.value, null)
                    } else {
                        editCom = getRenderFn('div', { style: { wdith: '100%' } })([showValue.value])
                    }
                } else {
                    editCom = getRenderFn('div', { style: { wdith: '100%' } })([showValue.value])
                }
                return editCom
            }
            const style = {
                width: '100%'
            }
            return getRenderFn('div', { style: { ...style } })([showValue.value])
        })
        // defineExpose({
        //     formitem: formitem
        // })
        return () => {
            return renderCom.value
        }
        // return { formitem: formitem, renderCom: renderCom }
    },
    render() {
        // return this.renderCom
    }
})
