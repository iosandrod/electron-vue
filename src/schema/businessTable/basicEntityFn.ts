import { h, resolveComponent } from "vue";
import { basicEntity } from "./basicEntity";
import lodash from "lodash";
import { StyleType } from "@/types/schema";

export const initComponent = (basicEntity: basicEntity) => {
    const vNode = () => {
        const layoutCom = resolveComponent('grid-layout')
        const layoutItemCom = resolveComponent('grid-item')
        const renderLayout = basicEntity.renderLayout
        return h(layoutCom, { ...renderLayout }, () => basicEntity.pageTree?.children.map(chi => {
            const renderLayoutItem = chi.nodeConfig
            return h(layoutItemCom, { ...renderLayoutItem },
                () => {
                    let defaultCom: any = null
                    const nodeName = renderLayoutItem.nodeName
                    //@ts-ignore
                    const renderCom = comVetor[nodeName]
                    if (renderCom) {
                        const modalData = chi.nodeData
                        const mergeProps = {
                            style: {
                                width: '100%',
                                height: "100%",
                            } as StyleType
                        }
                        lodash.merge(modalData, mergeProps)
                        defaultCom = h(renderCom, modalData)
                    } else {
                        defaultCom = h('div', { style: { background: 'red', height: '100%', width: '100%' } as StyleType }, ['123'])
                    }
                    return defaultCom
                }

            )
        }))
    }
    basicEntity.component = vNode as any
}