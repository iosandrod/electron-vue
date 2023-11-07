import { h, nextTick, onMounted, ref, Directive, withDirectives } from "vue"
import { getRenderFn } from "./columnFn"
import { StyleType } from "@/types/schema"

export type propsConfig = {
    onClick?: (event: MouseEvent) => void,
    style?: StyleType,//
    class?: any//类型,
    directive?: Array<Array<Directive>>
    capture?: boolean
}

export const getIcon = (propsConfig: propsConfig | null = {}, iconName: string,) => {
    const classArr = [iconName]
    const style: StyleType = {
        height: "100%",
        width: "100%"
    }
    const obj = { class: [...classArr, ...propsConfig?.class || []], style: { ...style, ...propsConfig?.style || {} } }
    return getRenderFn('span', obj)
}


export const useMousePoint = (props: propsConfig = {}) => {
    const style: StyleType = {
        cursor: 'pointer',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        ...props?.style || {}
    }
    const _class = [...props.class || []]
    const value = ref(null)
    const onClick = async (event: MouseEvent) => {
        const _props = props
        await _props?.onClick && _props.onClick!(event)
    }
    const directive = props.directive as any
    return getRenderFn('div', {
        ...props || {}, style: { ...style }, class: _class, onClick: onClick, ref: value
    }, directive)//自定义指令 
}


export const getDialogDiv = (props?: propsConfig) => {

}




