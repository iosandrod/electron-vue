import { tableData, tableInfo, tableinfo1 } from "@/api/data";
import { columnConfig, fixedType, sortType } from "@/types/schema";
import { basicEntity } from "./businessTable/basicEntity";
import { mainEntity } from "./businessTable/mainEntity";
import { columnObj } from "./entityColumnTran";


const mapFnType = {
    String: ['string', 'text', 'select', 'float', 'number', 'decimal', 'int'],
    Boolean: ['bool', 'byte']
}
export class entityColumn {
    getEntity?: () => basicEntity
    editType: string = ''
    scope?: boolean = false
    field: string = ''
    type?: string = ''
    require: boolean = false
    orderNo?: number = 100
    align = 'left'
    sortable?: boolean = true
    editOrderNo?: number
    sort: null | sortType = null
    width: number = 200
    fixed?: fixedType = null
    tableName?: string = ''
    editColSize?: number
    visible: boolean = true
    headerSlot: any = null
    title: string = ''
    editTitle: string = ''
    searchType: string = ''
    sBindField: string = ''
    options: any[] = []
    renderFun?: string | null = null
    bind?: string = ''
    reportType: string = ''
    cellClassName?: (() => void) | null = null
    cDefaultValue: ((value?: mainEntity | basicEntity) => any) | string | number = ''
    baseInfoTable?: { tableName: string, mayKey: string, mapKeys: Array<{ [key: string]: string }> }
    initColumn(column: any) {
        const _this: any = this
        let _column = column
        columnObj.forEach((v: any) => {
            _this[v.key] = v.transFn.call(this, _column[v.targetKey], _column, this)
        })
    }
    formatJsonData(value: any, type: any = 'string') {
        let mapType = {
            string: '',
            array: [],
            object: {},
            number: 0
        }
        try {
            if (value == null) {
                //@ts-ignore
                return mapType[type]
            }
            return JSON.parse(value)
        } catch (error) {
            //@ts-ignore
            return mapType[type]
        }
    }
    formatFunData(value: any, type: string, defaultValue = false) {
        let _type =
            Object.entries(mapFnType).find(([key, value]) => {
                return value.includes(type)
            })?.[0] || `String`
        let fn = null
        let testNumber = Number(value)
        let isNumber = true
        if (isNaN(testNumber)) {
            isNumber = false
        }
        try {
            let _fn = new Function(`return ${value}`).call(null)
            fn = _fn
            if (isNumber) {
                fn = value
            }
        } catch (error) {
            try {
                let _fn1 = null
                if (_type == 'String') {
                    _fn1 = new Function(`return (new ${_type}('${value}'))+''`).call(null)
                } else {
                    _fn1 = new Function(`return new ${_type}('${value}')`).call(null)
                }
                fn = _fn1
            } catch (error) {
                fn = null
            }
        }
        if (typeof fn != 'function' && this.editType == 'select' && defaultValue) {
            return value
        }
        return fn
    }
    changeEditType(type: string = 'string') {
        const _this: any = this
        _this.editType = type
    }
    toSearchWhere(row: any) {

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