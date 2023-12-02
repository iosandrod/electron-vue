import { tableData, tableInfo, tableinfo1 } from "@/api/data";
import { columnConfig } from "@/types/schema";

const alignType = {
    left: ['string'],
    right: ['number', 'int', 'decimal', 'float'],
    center: ['date', 'bool', 'datetime', 'date', 'time', 'guid', 'img', 'byte', 'checkbox', 'switch']
}
const mapFnType = {
    String: ['string', 'text', 'select', 'float', 'number', 'decimal', 'int'],
    Boolean: ['bool', 'byte']
}
const fixedObj = {
    right: ['number', 'float', 'decimal'],
    cneter: [''],
    left: ['string', 'text']
}
class Translate {
    key?: any
    targetKey?: any
    transFn?: (value: any, column: any) => any
    constructor(
        key: any,
        targetKey: any,
        transFn = function (targetValue: any, column?: any, entityColumn?: any) {
            return targetValue
        }
    ) {
        this.key = key
        this.targetKey = targetKey
        this.transFn = transFn
    }
}
const columnObj = [
    new Translate('editType', 'editType'),
    new Translate('visible', 'isDisplay', function (targetValue, column) {
        if (column.isExtend == true) {
            return true
        }
        return targetValue == 1 ? true : false
    }),
    new Translate('field', 'columnName', function (targetValue) {
        return String(targetValue.slice(0))
    }),
    new Translate('title', 'columnCnName', function (targetValue, column, entityColumn) {
        let value = targetValue
        if (value == null || value == '') {
            value = entityColumn.field
        }
        entityColumn.originTitle = value
        return value
    }),
    new Translate('tableName', 'tableName', function (targetValue) {
        return targetValue
    }),
    new Translate('type', 'columnType', function (targetValue) {
        if (targetValue == null || targetValue === '') {
            return 'string'
        }
        let type = targetValue.toLocaleLowerCase()
        return type
    }),
    new Translate('extendConfig', 'reportType', function (targetValue, column, entityColumn) {
        let _value = targetValue
        let obj = entityColumn.formatJsonData(_value, 'object')
        return obj
    }),
    new Translate('orderNo', 'orderNo'),
    new Translate('width', 'columnWidth', function (targetValue) {
        let value = targetValue || 200
        return value
    }),
    new Translate('CellFormat', 'columnformat', function (targetValue) {
        if (targetValue == null) {
            return 'iRoundNorQty'
        }
        return targetValue
    }),
    new Translate('hidden', 'isDisplay', function (targetValue) {
        return targetValue == '1' ? false : true
    }),
    new Translate('required', 'isRequired', function (targetValue) {
        return targetValue == '1' ? true : false
    }),
    new Translate('align', 'align', function (targetValue, column, entityColumn) {
        let _alignType = targetValue
        if (_alignType == null) {
            _alignType =
                Object.entries(alignType).find(([key, value]: any) => {
                    return value.includes(entityColumn.type)
                })?.[0] || 'left'
        }
        return _alignType
    }),
    new Translate('sortable', 'sortable', function (targetValue) {
        return targetValue == 1 ? true : false
    }),
    new Translate('sort', 'cSort', function (targetValue) {
        let _value = targetValue
        if (!['asc', 'desc'].includes(_value)) {
            return null
        }
        return _value
    }),
    new Translate('fixed', 'cFixed', function (targetValue) {
        let value = targetValue
        if (value != 'left' && value != 'right') {
            return null
        }
        return targetValue
    }),
    //headerSlot
    new Translate('headerSlot', 'headerSlot'),
    new Translate('editType', 'editType'),//编辑的类型
    new Translate('bindField', 'sBindField'),
    new Translate('cDefaultValue', 'cDefaultValue', function (targetValue, column, entityColumn) {
        if (targetValue != null) {
            return entityColumn.formatFunData(targetValue, column.columnType.toLocaleLowerCase(), true)
        }
        return ''
    }),
    new Translate('renderFun', 'renderFun', function (targetValue, column) {
        if (targetValue) {//渲染函数
            // let   fn = formatStrFun(targetValue)
            // return fn
            return null
        }
        return null
    }),
    new Translate('bind', 'dropNo', function (targetValue, column) {
        let _targetValue = targetValue
        if (Boolean(_targetValue) == false) {
            return null
        }
        let value = {
            key: targetValue,
            data: [],
            type: column.columnType
        }
        return value
    }),
    new Translate('reportType', 'reportType'),
    new Translate('cellClassName', 'cellStyleType', function (targetValue, column, entityColumn) {
        if (targetValue) {
            let fun = entityColumn.formatFunData(targetValue)
            return fun
        }
        return null
    }),
    new Translate('isSummaryCol', 'isSummaryCol', function (targetValue) {
        let _value = targetValue
        if (targetValue == 0) {
            _value = '0'
        }
        if (targetValue === true) {
            _value = '1'
        }
        if (!['1', '2', '3', '4'].includes(targetValue + '')) {
            _value = '0'
        }
        return _value
    }),
    new Translate('serverType', 'script', function (targetValue) {
        let _targetValue = targetValue
        if (_targetValue == null || _targetValue === '') {
            return null
        }
        return targetValue
    }),
    new Translate('isColumnData', 'isColumnData', function (targetValue) {
        let _value = targetValue
        if (_value == null) {
            _value = '1'
        }
        return _value
    }),
    new Translate('extendMethod', 'normalColor', function (targetValue, column, entityColumn) {
        let _value = entityColumn.formatJsonData(targetValue)
        if (!Array.isArray(_value)) {
            return []
        }
        _value = _value.map(row => {
            let {
                functionName,
                functionCode
            } = row
            let targetFn = entityColumn.formatFunData(functionCode)
            row.functionCode = targetFn
            return row
        })
        _value.forEach((row: any) => { })
        return []
    }),
    new Translate('renderSlot', 'pagination', function (targetValue) {
        let _value = null
        if (Boolean(targetValue) === false) {
            return
        }
        // try {
        //     let _value1 = JSON.parse(targetValue)
        //     console.log(_value1, '我是渲染的真实DOM')
        //     let template = _value1.template
        //     let setup = _value1.setup
        //     let realCom = tableUtil.formatExtendBox({
        //         template,
        //         setup
        //     })
        //     console.log(realCom, 'testRealCom')
        //     if (realCom == null) {
        //         return null
        //     }
        //     _value = shallowRef(realCom)
        //     this.defaultSlot = 'operatorDefaultCom'
        //     this.editSlot = 'operatorDefaultCom'
        // } catch (error) {
        //     console.error(error)
        // }
        return _value
    }),
    new Translate('formatFn', 'cRelateColumn', function (targetValue, column, entityColumn) {
        let _value = targetValue
        let _fn = entityColumn.formatFunData(_value)
        if (typeof _fn == 'function') {
            return _fn
        }
        return null
    }),
    new Translate('isExtend', 'isExtend'),
    new Translate('sBindField', 'sBindField')
]
export class entityColumn {
    editType: string = ''
    field: string = ''
    initColumn(column: any) {
        const _this: any = this
        let _column = column
        columnObj.forEach((v: any) => {
            _this[v.key] = v.transFn.call(this, _column[v.targetKey], _column, this)
        })
    }
    formatJsonData() {
    }
    formatFunData() { }
    changeEditType(type: string = 'string') {
        const _this: any = this
        _this.editType = type
    }
}

const columns = tableInfo.tableColumns
const columns1 = tableinfo1.tableColumns

export const _columns = () => {

    return columns.map(col => {
        const _col = new entityColumn()
        _col.initColumn(col)
        return _col
    })
}


export const _columns1 = () => {
    return columns1.map(col => {
        const _col = new entityColumn()
        _col.initColumn(col)
        return _col
    })
}