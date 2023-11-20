import { computed, h, resolveComponent } from "vue";
import { layoutGrid } from "./layoutGrid";
import { StyleType } from "@/types/schema";
import { comVetor } from "@/plugin/register";
import lodash from 'lodash'
import tableView from "./schemaComponent/tableView";
export const initComponent = (layout: layoutGrid) => {
    const vNode = () => {
        const layoutCom = resolveComponent('grid-layout')
        const layoutItemCom = resolveComponent('grid-item')
        // const renderLayout = layout.pageTree?.pageConfig
        const renderLayout = layout.renderLayout
        return h(layoutCom, { ...renderLayout }, () => layout.pageTree?.children.map(chi => {
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
    layout.component = vNode as any
}

export const initRenderLayout = (layoutGrid: layoutGrid) => {
    let renderLayout = layoutGrid.renderLayout
    // renderLayout.isDraggable = getGridLayout(layoutGrid) as any
    // renderLayout.isResizable = getGridResizable(layoutGrid) as any
    const pageTree = layoutGrid.pageTree
    renderLayout.layout = computed({
        set(value) {
            console.log(value, 'testValue')
        },
        get() {
            const children = pageTree?.children || []
            const nodeConfigArr = children.map(chi => {
                return chi.nodeConfig
            })
            return nodeConfigArr
        }
    }) as any
    renderLayout.colNum = 24
    renderLayout.isDraggable = true as any
    renderLayout.isResizable = true as any
    renderLayout.rowHeight = 30
    renderLayout.useCssTransform = true
    renderLayout.verticalCompact = true
}

export const getGridResizable = (layoutGrid: layoutGrid) => {
    return computed(() => {
        // const layoutConfig = layoutGrid.layoutConfig
        // return layoutConfig.isResizable
    })
}


export const getGridDragable = (layoutGrid: layoutGrid) => {
    return computed(() => {
        const layoutConfig = layoutGrid.pageTree?.pageConfig!
        return layoutConfig.isDraggable
    })
}

export const getGridLayout = (layoutGrid: layoutGrid) => {
    return computed(() => {
        const layoutConfig = layoutGrid.pageTree?.pageConfig as any
        return layoutConfig?.layout
    })
}

// export const getGridResizable = (layoutGrid: layoutGrid) => {
//     return computed(() => {
//         const layoutConfig = layoutGrid.layoutConfig
//         return layoutConfig.isResizable
//     })
// }