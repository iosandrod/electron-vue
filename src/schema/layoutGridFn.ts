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
            const nodeName = chi.nodeName
            const dragDiv = computed(() => {
                let drag = renderLayout.isDraggable && renderLayout.isResizable
                if (drag == true) {
                    return h('div', { style: { position: "absolute", top: '0px', left: '0px', bottom: '0px', background: "white", opacity: '0', right: '0px' } as StyleType })
                }
                return null
            })
            return h(layoutItemCom, { ...renderLayoutItem },
                () => {
                    let defaultCom: any = null
                    const _nodeName = nodeName || renderLayoutItem.nodeName
                    //@ts-ignore
                    const renderCom = comVetor[_nodeName]
                    if (renderCom) {
                        const modalData = chi.nodeData
                        const mergeProps = {
                            style: {
                                width: '100%',
                                height: "100%",
                            } as StyleType
                        }
                        lodash.merge(modalData, mergeProps)
                        defaultCom = h('div', { style: { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType }, [h(renderCom, modalData), dragDiv.value])
                    } else {
                        defaultCom = h('div', { style: { position: "relative", background: 'red', height: '100%', width: '100%' } as StyleType }, ['123'])
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
    const pageTree = layoutGrid.pageTree
    renderLayout.layout = computed({
        set(value) {
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
    renderLayout.isDraggable = computed(() => {
        return layoutGrid.pageTree?.pageConfig.isDraggable
    }) as any
    renderLayout.isResizable = computed(() => {
        return layoutGrid.pageTree?.pageConfig.isResizable
    }) as any
    renderLayout.rowHeight = computed(() => {
        return layoutGrid.pageTree?.pageConfig.rowHeight || 30
    }) as any
    renderLayout.useCssTransform = computed(() => {
        return layoutGrid.pageTree?.pageConfig.useCssTransform
    }) as any
    renderLayout.verticalCompact = computed(() => {
        return layoutGrid.pageTree?.pageConfig.verticalCompact
    }) as any
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