import { h, nextTick, onMounted, ref, Directive, withDirectives } from "vue"
import { getRenderFn } from "./columnFn"
import { StyleType } from "@/types/schema"

export type propsConfig = {
    onClick?: (event: MouseEvent) => void,
    style?: StyleType,//
    class?: any//类型,
    directive?: Array<Array<Directive>>
}

export const getIcon = (propsConfig: propsConfig | null = {}, iconName: string,) => {
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
    const directive = props.directive as any
    return getRenderFn('div', {
        style: { ...style }, onClick: onClick, ref: value
    }, directive)//自定义指令 
}


export const getDialogDiv = (props?: propsConfig) => {

}




