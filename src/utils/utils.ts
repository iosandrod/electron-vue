import { getRenderFn } from '@/schema/columnFn'
import { propsConfig } from '@/schema/icon'
import { StyleType, position } from '@/types/schema'
import { isNumber } from 'lodash'
import { Directive } from 'vue'
import XEUtils, * as vxUtils from 'xe-utils'
import { StyleBuilder } from './styleBuilder'
import json5 from 'json5'
import _ from 'lodash'
export const getMouseEventPosition = ($event: MouseEvent) => {
    // const left = $event.offsetX
    const left = $event.clientX
    const top = $event.clientY
    return { left, top }
}

export const getFullDiv = (props: propsConfig = {}) => {
    const _class = ['h-full', 'w-full']
    return getRenderFn('div', { class: _class, ...props })
}

export const getWFullDiv = (props: propsConfig = {}) => {
    const _class = ['w-full']
    return getRenderFn('div', { class: _class, ...props })
}

export const tranPositionNumber = (position: position) => {
    let left: any = position.left
    let top: any = position.top
    if (vxUtils.isString(left)) {
        left = Number(`${left}`.replace('px', ''))
    } else if (isNumber(left)) {
        if (left < 1 && left > -1) {
            const _left = document.body.clientWidth * left
            left = _left
        }
    }
    if (vxUtils.isString(top)) {
        top = Number(`${top}`.replace('px', ''))
    } else if (isNumber(top)) {
        if (top < 1 && top > -1) {
            const _top = document.body.clientHeight * top
            top = _top
        }
    }
    return { left, top }
}


export const tranPosition = (position: position) => {
    let left: any = position.left
    let top: any = position.top
    if (vxUtils.isString(left)) {
        left = left
    } else if (isNumber(left)) {
        if (left < 1 && left > -1) {
            const _left = document.body.clientWidth * left
            left = `${_left}px`
        } else {
            left = `${left}px`
        }
    }
    if (vxUtils.isString(top)) {
        top = top
    } else if (isNumber(top)) {
        if (top < 1 && top > -1) {
            const _top = document.body.clientHeight * top
            top = `${_top}px`
        } else {
            top = `${top}px`
        }
    }
    return { left, top }
}


export const registerDocumentClickFn = (fn: Function) => {
    const fn1 = () => {
        fn()
    }
    return {
        mounted: () => {
            document.addEventListener('click', fn1)
        },
        unmounted: () => {
            document.removeEventListener('click', fn1)
        }
    } as Directive
}

export const resiterDocumentMousedownFn = (fn: Function) => {
    const fn1 = () => {
        fn()
    }
    return {
        mounted: () => {
            document.addEventListener('mousedown', fn1)
        },
        unmounted: () => {
            document.removeEventListener('mousedown', fn1)
        }
    } as Directive
}

export const getDialogMaskHidden = (fn: Function) => {
    const fn1 = (params: any) => {
        const $modal = params.$modal
        const box = $modal.getBox()
        if (box != null) {
            box.addEventListener('click', (event: MouseEvent) => {
                event.stopPropagation()
            })
        }
        fn(params)
    }
    return fn1
}


export const getPercentLength = (length: string | number, percnet: number) => {
    let _length: any = length
    if (typeof length == 'string') {
        let len = length.replace(/[px|rpx]/gi, '')
        let nLen = `${Number(len) * percnet}px`
        _length = nLen
    }
    if (typeof length == 'number') {
        let _num = `${length * percnet}px`
        _length = _num
    }
    return _length
}
export const styleBuilder = new StyleBuilder()



export const formatTableInfo = async (tableInfo: any) => {
    try {
        tableInfo = tableInfo || {}
        let { xTableInfo, xTreeMenuData, xVueOption, xExtend, cTemplate } = tableInfo || {}
        xTableInfo = xTableInfo || '{}'
        xTreeMenuData = xTreeMenuData || '{}'
        xVueOption = xVueOption || '[]'
        cTemplate = cTemplate || '{}'
        let _vueOption = formatJsonData(xVueOption, 'array')
        _vueOption?.forEach((box: any) => {
            // let { template, setup } = box
            // let realCom = tableUtil.formatExtendBox({ template, setup })
            // box.realCom = realCom
            //额外弹框
        })
        let _tableInfo = formatJsonData(xTableInfo, 'object')
        let _xExtend = []
        try {
            let obj = xExtend || '[]'
            let _obj = JSON.parse(obj)
            let _obj1 = formatTableExtend(_obj)
            _xExtend = _obj1
        } catch (error) {
            console.log(xExtend)
            console.log(error, 'xExtend解析出错')
            _xExtend = []
        }
        let _xTreeMenuData = formatJsonData(xTreeMenuData, 'object')
        let _cTemplate = formatJsonData(cTemplate, 'object')
        const _tableInfo1 = json5.parse(json5.stringify(tableInfo))
        let result = Object.assign(_tableInfo1, {
            xTableInfo: _.merge(_tableInfo, { tableNameAs: tableInfo.cMainTableAs }),
            table: _.merge(_tableInfo, { tableNameAs: tableInfo.cMainTableAs }),
            treeMenuData: _xTreeMenuData,
            vueOption: _vueOption,
            xExtend: _xExtend,
            tableButtons: _cTemplate
        })
        return result
    } catch (error) {
        console.error(error, 'testError')
        console.log('vue数据解析出错')
        return Promise.reject('xTableInfo的JSON数据解析出错')
    }
}

export const formatJsonData = (jsonStr: any, type: any) => {
    let obj = { array: [], object: {}, string: '' } as any
    let data = JSON.parse(JSON.stringify(obj[type]))
    try {
        let _data = json5.parse(jsonStr)
        data = _data
    } catch (error) {
        console.log(jsonStr, error)
    }
    if (!Array.isArray(data) && type == 'array') {
        return []
    }
    return data
}

export const formatTableExtend = (xExtend: any[] = []) => {
    let _xExtend = xExtend
        .map((row: any) => {
            try {
                // let functionName = row.functionName 
                let _function = formatFunction(row.function)
                row.function = _function
            } catch (error) { }
            return row
        })
        .filter((_row) => {
            let _function = _row.function
            if (typeof _function !== 'function') {
                return false
            }
            let functionType = _row.functionType
            if (!['main', 'extend'].includes(functionType)) {
                return false
            }
            return true
        })
    return _xExtend
}

export const formatFunction = (str: any) => {
    let fn = null
    try {
        let _fn = new Function(`return ${str}`)
        _fn = _fn.call(null)
        if (typeof _fn == 'function') {
            fn = _fn
        }
    } catch (error) {
        console.log(str, 'testFn')
        console.error(error)
    }
    return fn
}