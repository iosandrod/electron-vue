import { StyleType } from "@/types/schema"
import _ from "lodash"
import { isNumber, isString } from "xe-utils"

export class StyleBuilder {
    templateStyle: StyleType = {
    }
    constructor() { }
    setFlexCenter() {
        const templateStyle = this.templateStyle
        templateStyle.display = 'flex'
        templateStyle.flexDirection = 'row'
        templateStyle.justifyContent = 'cneter'
        templateStyle.alignItems = 'center'
        return this
    }
    setFullHeight() {
        const templateStyle = this.templateStyle
        templateStyle.height = '100%'
        return this
    }
    setFullWidth() {
        const templateStyle = this.templateStyle
        templateStyle.width = '100%'
        return this
    }
    setWidth(width: number | string | null) {
        let _width: any = null
        if (isString(width)) {
            _width = width
        } else if (isNumber(width)) {
            _width = `${width}px`
        }
        const templateStyle = this.templateStyle
        templateStyle.width = _width
        return this
    }
    setFull() {
        return this.setFullHeight().setFullWidth()
    }
    setFlexRow() {
        const templateStyle = this.templateStyle
        templateStyle.display = 'flex'
        templateStyle.flexDirection = 'row'
        return this
    }
    setFlexColumn() {
        const templateStyle = this.templateStyle
        templateStyle.display = 'flex'
        templateStyle.flexDirection = 'column'
        return this
    }
    getStyle() {
        const style = this.templateStyle
        this.templateStyle = {}
        return style
    }
    mergeStyle(style: any) {
        if (style == null) {
            return this
        }
        const _style = Object.entries(style).reduce((res: any, [key, value]) => {
            let _key = key.split('-').map((key1, i) => {
                if (i == 0) {
                    return key1
                }
                return `${key1.slice(0, 1).toUpperCase()}${key1.slice(1)}`
            }).join('')
            res[_key] = value
            return res
        }, {})
        let templateStyle = this.templateStyle
        _.merge(templateStyle, _style)
        return this
    }
}

