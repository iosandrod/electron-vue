import { h, nextTick, onMounted, ref, Directive, withDirectives } from "vue"
import { getRenderFn } from "./columnFn"
import { StyleType } from "@/types/schema"

export type propsConfig = {
    onClick?: (event: MouseEvent) => void,
    style?: StyleType,//
    class?: any//类型
}

export const getIcon = (iconName: string, propsConfig?: propsConfig) => {
    const classArr = [iconName]
    const style: StyleType = {
    }
    const obj = { class: [...classArr, ...propsConfig?.class || []], style: { ...style, ...propsConfig?.style || {} } }
    return getRenderFn('span', obj)
}


export const useMousePoint = (props: propsConfig = {}) => {
    const style: StyleType = {
        cursor: 'pointer',
        display: 'inline'
    }
    const value = ref(null)
    const onClick = async (event: MouseEvent) => {
        const _props = props
        await _props?.onClick && _props.onClick!(event)
    }
    const directive: Directive = {
        created: () => {
            console.log('is create directive')
        },
        mounted: () => {
            console.log('is mount')
        },
    }
    return getRenderFn('div', {
        style: { ...style }, onClick: onClick, ref: value
    }, directive)
}