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
        const tableConfig = table?.tableConfig!
        const tableData = table?.tableData!
        const mergeDiv = computed(() => {
            // const mergeConfig = tableConfig.mergeConfig!//合并配置
            // let _canEdit = canEdit.value
            // let style = {
            //     height: '100%',
            //     width: '100%'
            // } as StyleType
            // if (_canEdit == true) {
            //     return style
            // }
            // if (mergeConfig && mergeConfig.length == 0) {
            //     return style
            // }
            // const _row = row.value
            // let field = column.value.columnConfig.field!
            // const targetConfig = mergeConfig.find(config => {
            //     let rowArr = config.rowArr!
            //     let colArr = config.colArr!
            //     if (rowArr.includes(_row) && colArr.includes(field)) {
            //         return true
            //     }
            // })
            // if (targetConfig == null) {
            //     return style
            // }
            // let rowArr = targetConfig.rowArr
            // let length = rowArr?.length!
            // let rowHeight = table?.tableConfig.rowConfig?.rowHeight!
            // let totalHeight = rowHeight * length
            // let rowIndex = rowArr?.findIndex(item => item == _row)!
            // let marginTop = rowIndex * rowHeight//marginTop的东西
            // let paddingTop = Math.abs((length / 2 - rowIndex) * rowHeight)
            // let curRow = tableData.curRow
            // let curColumnField = tableData.curColumn?.columnConfig.field
            // Object.assign(style, {
            //     marginTop: `-${marginTop}px`,
            //     height: `${totalHeight}px`,
            //     background: 'white',
            //     paddingTop: `${paddingTop}px`,
            //     position: "absolute",
            //     border: 'solid 1px RGB(232, 234, 236)',
            //     width: '100%'
            // } as StyleType)
            // if (rowIndex == 0) {
            //     style.zIndex = 1
            // }
            // if (rowArr?.includes(curRow)) {
            //     if (curColumnField == field) {
            //         style.background = 'RGB(139, 199, 200)'
            //     } else {
            //         style.background = 'RGB(139, 199, 255)'
            //     }
            // }
            // return style
            let style: any = {
                width: '100%',
                height: '100%'
            }
            let mergeConfig = tableConfig.mergeConfig!
            let field = column.value.columnConfig.field!
            let curRow = tableData.curRow
            const _row = row.value
            let _canEdit = canEdit.value
            if (_canEdit) {
                return style
            }
            let targetConfig = mergeConfig[field]
            if (targetConfig == null) {
                return style
            }
            let rowArrs = targetConfig.rowArr
            let rowArr = rowArrs.find(rows => {
                if (rows.includes(row.value)) {
                    return true
                }
            })
            console.log(rowArr, 'testArr')
            if (rowArr == null) {
                return style
            }
            let length = rowArr?.length!
            let rowHeight = table?.tableConfig.rowConfig?.rowHeight!
            let totalHeight = rowHeight * length
            let rowIndex = rowArr?.findIndex(item => item == _row)!
            let marginTop = rowIndex * rowHeight//marginTop的东西
            let paddingTop = Math.abs((length / 2 - rowIndex) * rowHeight)
            let curColumnField = tableData.curColumn?.columnConfig.field
            Object.assign(style, {
                marginTop: `-${marginTop}px`,
                height: `${totalHeight}px`,
                background: 'white',
                paddingTop: `${paddingTop}px`,
                position: "absolute",
                border: 'solid 1px RGB(232, 234, 236)',
                width: '100%'
            } as StyleType)
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
            return style
        })

        const renderCom = computed(() => {
            const _canEdit = canEdit.value
            const _editDisable = editDisable.value
            let editCom: any = null
            let defaultCom: any = null
            const defaultComFn = getRenderFn('div', { style: { wdith: '100%', height: "100%", background: "" } as StyleType })
            const mergeComFnStyle = mergeDiv.value//合并的行节点
            const mergeComFn = getRenderFn('div', { style: mergeComFnStyle })
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
