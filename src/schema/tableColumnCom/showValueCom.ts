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
        const _column = column.value
        const table = column.value.table
        const showValue = computed(() => {
            const globalWhere = table?.tableConfig.globalWhere!
            const field = _column.columnConfig.field!
            let value = row.value[field]
            if (value == null) {
                value = ''
            }
            const _value = `${value}`.replace(globalWhere, (str) => {
                return `<span class='global-where-color'>${str}</span>`
            })
            return _value
        })
        const tableConfig = table?.tableConfig!
        const tableData = table?.tableData!
        const mergeDiv = computed(() => {
            let style: any = {
                width: '100%',
                height: '100%'
            }
            let mergeConfig = tableConfig.mergeConfig!
            let field = column.value.columnConfig.field!
            let curRow = tableData.curRow
            const _row = row.value
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
            let defaultCom: any = null
            const defaultComFn = getRenderFn('div', { style: { wdith: '100%', height: "100%", background: "" } as StyleType })
            const mergeComFnStyle = mergeDiv.value//合并的行节点
            const mergeComFn = getRenderFn('div', { style: mergeComFnStyle })
            const showDiv = h('div', { innerHTML: showValue.value })
            defaultCom = defaultComFn([mergeComFn([showDiv])])
            return defaultCom
        })
        return {
            renderCom: renderCom
        }
    },
    render() {
        return this.renderCom
    }
})
