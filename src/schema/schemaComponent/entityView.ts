import { computed, defineComponent, h, onMounted, reactive, render, resolveComponent, withDirectives } from 'vue'
import { createMainEntity } from '../businessTable/mainEntity'
import { StyleType } from '@/types/schema'

export default defineComponent({
    props: ['tableInfo', 'entityName', 'entityType', 'entityInstance'],//
    setup(props, context) {
        const entityName = props.entityName || 't_SdOrder'
        // const entityType = props.entityType
        const tableInfo = props.tableInfo //使用静态数据
        let entity: any = null
        if (props.entityInstance != null) {
            entity = props.entityInstance
        } else {
            entity = createMainEntity(entityName, tableInfo)
        }
        const pageShow = computed(() => {
            const state = entity.displayState
            return state == 'show'
            // return false
        })
        const _div = h('div', { style: { position: "absolute", top: '0px', left: '0px', bottom: '0px', background: "white", opacity: '0', right: '0px' } as StyleType })
        const dragDiv = computed(() => {
            let drag = entity.renderLayout.isDraggable && entity.renderLayout.isResizable

            if (drag == true) {
                return _div
            }
            return null
        })
        const vNode = () => {
            const layoutCom = resolveComponent('grid-layout')
            const layoutItemCom = resolveComponent('grid-item')
            const renderLayout = entity.renderLayout

            return h(layoutCom, { ...renderLayout }, () => entity.schema!.map((item: any) => {
                return h(layoutItemCom, item,
                    () => {
                        let renderCom: any = null
                        let defaultCom: any = null
                        const component = item.component
                        if (component != null) {
                            renderCom = withDirectives(component(), [[{
                                mounted(div, node) {
                                },
                                unmounted() { }
                            }]])
                        }
                        if (renderCom) {
                            defaultCom = h('div', { style: { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType }, [renderCom,
                                dragDiv.value
                            ])
                        } else {
                            defaultCom = h('div', { style: { position: "relative", background: 'red', height: '100%', width: '100%' } as StyleType }, ['默认节点'])
                        }
                        return defaultCom
                    }
                )
            }))
        }
        const component = computed(() => {
            const show = pageShow.value
            if (show == false) {
                return () => h('div')
            } else {
                return entity.component
                // return vNode
            }
        })
        return { entity: entity, com: component }
    },
    render() {
        const com = this.com!
        return com()
    }
})