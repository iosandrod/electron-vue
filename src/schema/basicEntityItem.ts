import { VNode, computed, h, reactive, resolveComponent, vShow, withDirectives } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { basicEntity } from "./businessTable/basicEntity";
import { StyleType, entityItemConfig, layoutItem, propsConfig } from "@/types/schema";
import contextMenuView from "./schemaComponent/contextMenuView";
import instanceView from "./schemaComponent/instanceView";
import { comVetor } from "@/plugin/register";

export class basicEntityItem extends base {
    renderComponent: (() => null) | (() => VNode) = () => null
    entity?: basicEntity
    renderLayoutItem: layoutItem = {
        i: "",
        x: 0,
        y: 0,
        w: 0,
        h: 0
    }
    entityItemConfig: entityItemConfig = {
        i: "",
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        renderKey: '',
        renderCom: '',//渲染组件名称
        renderFunName: 'instanceView',
        instance: null,
    }
    pageRef = {}
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    initEntityItem() {
        const schema = this.schema
        const _entityItemConfig: any = this.entityItemConfig
        Object.entries(schema).forEach(([key, value]) => {
            _entityItemConfig[key] = value
        })//处理这个entity
        this.initRenderComponent()
        this.initRenderLayoutItem()
        this.initComponent()
    }
    initRenderLayoutItem() {
        const renderKey = this.entityItemConfig.renderKey!
        const entity = this.entity
        this.renderLayoutItem = computed(() => {
            const renderLayout = entity?.renderLayout.layout?.find(layout => {
                return layout.i == renderKey
            })
            return renderLayout
        }) as any
    }
    initRenderComponent() {
        const _this = this
        const entity = this.entity!
        let isDrag = computed(() => {
            return entity.layoutConfig.isDraggable && entity.layoutConfig.isResizable
        })
        const vNode = () => {
            let renderCom: any = null
            let defaultCom: any = null
            const renderComName = _this.entityItemConfig.renderCom || 'instanceView'
            const renderFunName = _this.entityItemConfig.renderFunName
            const renderFun = _this.entityItemConfig.renderFun
            let renderData = {}
            if (renderFunName != null) {
                //@ts-ignore
                let _renderFun = entity[renderFunName]
                if (typeof _renderFun == 'function') {
                    //@ts-ignore
                    renderData = entity[renderFunName]()
                }
            } else if (renderFun != null && typeof renderFun == 'function') {
                renderData = renderFun(entity, this)
            }
            // const instance = this.entityItemConfig.instance//是否有实例 
            if (typeof renderComName == 'function') {
                renderCom = renderComName(_this)
            } else {
                //@ts-ignore
                let renderComponent = comVetor[renderComName]
                if (renderComponent == null) {
                    //@ts-ignore
                    renderComponent = instanceView
                }
                renderCom = h(renderComponent, { ...renderData, key: _this.entityItemConfig.renderKey })
            }
            //获取renderCom的组件
            const _divStyle = { position: 'absolute', top: '0px', left: '0px', bottom: '0px', background: "white", opacity: '0', right: '0px', zIndex: 999 } as StyleType
            const renderStyle = { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType
            const dragCom = withDirectives(
                h('div', {
                    style: _divStyle,
                    onContextmenu: (event: MouseEvent) => {
                        console.log(_this, 'testItem')
                        const entity = _this.entity!
                        entity.openContext(event)
                    }
                } as propsConfig, [
                    // h(contextMenuView, { contextMenuInstance: _this.pageRef.contextMenu })
                ]), [[vShow, isDrag.value]]
            )
            if (renderCom) {
                defaultCom = h('div', { style: renderStyle }, [renderCom,
                    dragCom
                ])
            } else {
                defaultCom = h('div', { style: renderStyle }, ['默认节点'])
            }
            return defaultCom
        }
        this.renderComponent = vNode
    }
    initComponent() {
        const _this = this
        const entityItemConfig = _this.entityItemConfig
        const renderFunName = entityItemConfig.renderFunName
        const renderComName = entityItemConfig.renderCom || 'instanceView'
        const entity = this.entity!
        let isDrag = computed(() => {
            return entity.layoutConfig.isDraggable && entity.layoutConfig.isResizable
        })
        const vNode = () => {
            const renderLayoutItem = _this.renderLayoutItem
            const gridItemCom = resolveComponent('grid-item')
            const layoutItemCom = h(gridItemCom, renderLayoutItem, () => {
                const renderComponent = _this.renderComponent
                return renderComponent()//子节点
            })
            return layoutItemCom
        }
        this.component = vNode
    }
}

export const createEntityItem = (schema: any, entity: any) => {
    const _entityItem = reactive(new basicEntityItem(schema, systemInstance))
    _entityItem.entity = entity
    _entityItem.initEntityItem()
    return _entityItem
}


/* 
        (item: any) => {
              const _item = {
                x: item.x, y: item.y, h: item.h, w: item.w, i: item.i, onMove: (i: any, newx: any, newy: any) => {
                  item.x = newx
                  item.y = newy
                },
                onResize: (i: any, newH: any, newW: any, newHPx: any, newWPx: any) => {
                  item.h = newH
                  item.w = newW
                }
              } as layoutItem
              return h(layoutItemCom, _item,
                () => {
                  let renderCom: any = null
                  let defaultCom: any = null
                  const component = item.component//
                  if (component != null) {//
                    renderCom = component()
                  }
                  const renderStyle = { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType
                  const dragCom = withDirectives(
                    h('div', {
                      style: _divStyle,
                      onContextmenu: (event: MouseEvent) => {
                        console.log(item, 'testItem')
                        _this.openContext(event)
                      }
                    } as propsConfig, [
                      h(contextMenuView, { contextMenuInstance: _this.pageRef.contextMenu })
                    ]), [[vShow, isDrag.value]]
                  )
                  if (renderCom) {
                    defaultCom = h('div', { style: renderStyle }, [renderCom,
                      dragCom
                    ])
                  } else {
                    defaultCom = h('div', { style: renderStyle }, ['默认节点'])
                  }
                  return defaultCom
                }
              )
            }
        */