import { computed, defineComponent, h, defineExpose } from 'vue'
import { column } from '../column'
import { getOutSizeDiv } from '../columnFn'
import { StyleType, tableState } from '@/types/schema'
import { getRenderFn } from '../columnFn'
import { editPool } from '../formitemComFn'
import { createFormItem } from '../formitem'
import { table } from '../table'
import { getItemSlotsDefautlEditCom } from '../formitemFn'
import { _columns } from '../entityColumn'
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
        const table = column.value.table
        const mergeDiv = computed(() => {
            const mergeConfig = table?.tableConfig.mergeConfig!//合并配置
            if (mergeConfig && mergeConfig.length == 0) {
                return getRenderFn('div', { class: ['h-full w-full'] })
            }
            const _row = row.value
            let field = column.value.columnConfig.field!
            const targetConfig = mergeConfig.find(config => {
                let rowArr = config.rowArr!
                let colArr = config.colArr!
                if (rowArr.includes(_row) && colArr.includes(field)) {
                    return true
                }
            })
            if (targetConfig == null) {
                return getRenderFn('div', { class: ['h-full w-full'] })
            }
            let rowArr = targetConfig.rowArr
            let length = rowArr?.length!
            let rowHeight = table?.tableConfig.rowConfig?.rowHeight!
            let totalHeight = rowHeight * length
            let rowIndex = rowArr?.findIndex(item => item == _row)!
            let marginTop = rowIndex * rowHeight//marginTop的东西
            let paddingTop = Math.abs((length / 2 - rowIndex) * rowHeight)
            let curRow = table?.tableData.curRow
            let curColumnField = table?.tableData.curColumn?.columnConfig.field
            let style = {
                marginTop: `-${marginTop}px`,
                height: `${totalHeight}px`,
                background: 'white',
                paddingTop: `${paddingTop}px`,
                position: "absolute",
                border: 'solid 1px RGB(232, 234, 236)'
            } as StyleType
            if (rowIndex == 0) {
                style.zIndex = 1
            }
            if (rowArr?.includes(curRow)) {
                if (curColumnField == field) {
                    style.background = 'RGB(139, 199, 200)'
                } else {
                    style.background = 'RGB(139, 199, 255)'
                }
            }
            return getRenderFn('div', { class: ['w-full'], style: style })
            // const _column = column.value//
            // const field = _column.columnConfig.field//获取配置
            // let mergeRow = mergeConfig.find(config => {
            //     return config.row == _row && config.field == field
            // })
            // if (mergeRow == null) {
            // return getRenderFn('div', { class: ['h-full w-full'] })
            // h('div', { class: ['h-full w-full'] })//没有合并的列配置
            // }
            // const rowHeight = table?.tableConfig.rowConfig?.rowHeight!
            // const colSpan = mergeRow.colSpan!
            // const totalHeight = rowHeight * colSpan
            // const style = {
            //     height: `${totalHeight}px`,
            //     position: "absolute",
            //     background: "red"
            // } as StyleType
            // return h('div', { style: style, class: ['w-full'] },)
        })
        const renderCom = computed(() => {
            const _canEdit = canEdit.value
            const _editDisable = editDisable.value
            let editCom: any = null
            let defaultCom: any = null
            const defaultComFn = getRenderFn('div', { style: { wdith: '100%', height: "100%", background: "" } as StyleType })
            const mergeComFn = mergeDiv.value!//合并的行节点
            defaultCom = defaultComFn([mergeComFn([showValue.value])])
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
                        editCom = defaultCom//默认的合并
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

            return defaultCom
        })
        return { formitem: formitem, renderCom: renderCom }
    },
    render() {
        return this.renderCom
    }
})
