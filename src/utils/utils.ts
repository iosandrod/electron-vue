import { getRenderFn } from '@/schema/columnFn'
import { propsConfig } from '@/schema/icon'
import { position } from '@/types/schema'
import { isNumber } from 'lodash'
import { Directive } from 'vue'
import XEUtils, * as vxUtils from 'xe-utils'
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