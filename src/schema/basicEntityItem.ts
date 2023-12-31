//@ts-nocheck
import { VNode, computed, h, reactive, resolveComponent, vShow, withDirectives } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { basicEntity } from "./businessTable/basicEntity";
import { StyleType, entityItemConfig, layoutItem, propsConfig } from "@/types/schema";
import contextMenuView from "./schemaComponent/contextMenuView";
import instanceView from "./schemaComponent/instanceView";
import { comVetor } from "@/plugin/register";
import basicEntityItemView from "./schemaComponent/basicEntityItemView";

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
        renderComName: "",
        renderFunName: 'instanceView',
        instance: null,
        nodeType: '',
        createConfig: {}
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
        this.initRenderInstance()
        this.initRenderComponent()
        this.initRenderLayoutItem()
        this.initComponent()
    }
    //设计当前组件
    designCurrentItem() {
        const instance = this.entityItemConfig.instance
    }
    initRenderLayoutItem() {
        const renderKey = this.entityItemConfig.renderKey!
        const entity = this.entity
        this.renderLayoutItem = computed(() => {
            const renderLayout = entity?.renderLayout.layout?.find(layout => {
                return layout.i == renderKey
            })
            return renderLayout
        }) as any// who illuminated you?
    }
    updateLayout(layoutArr: any[]) {
        const targetItem = layoutArr.find(item => {
            return item.i == this.entityItemConfig.renderKey
        })
        const entityItemConfig = this.entityItemConfig
        if (targetItem) {
            entityItemConfig['x'] = targetItem['x']
            entityItemConfig['y'] = targetItem['y']
            entityItemConfig['w'] = targetItem['w']
            entityItemConfig['h'] = targetItem['h']
        }
    }
    initRenderInstance() {
        const entityItemConfig = this.entityItemConfig
        const nodeType = entityItemConfig.nodeType
        if (Boolean(nodeType) == false) {
            return
        }
        const createFn = this.entity.createFn
        const targetCreateFn = createFn[nodeType]
        if (typeof targetCreateFn != 'function') {
            return
        }
        const createConfig = entityItemConfig.createConfig
        const instance = targetCreateFn(createConfig)
        entityItemConfig.instance = instance
    }
    initRenderComponent() {
        const _this = this
        const entity = this.entity!
        let isDrag = computed(() => {
            return entity.layoutConfig.isDraggable && entity.layoutConfig.isResizable
        })
        const vNode = () => {
            let renderCom: any = null//渲染的组件类型
            let renderData = {}//渲染组件的数据
            let defaultCom: any = null//最终输入的组件实例
            //获取数据的函数 init renderData
            let renderFunName = _this.entityItemConfig.renderFunName
            let renderFun = _this.entityItemConfig.renderDataFun
            if (typeof renderFun == 'function') {
                renderFun = renderFun
            } else {
                //@ts-ignore
                renderFun = _this.entity[renderFunName]
            }
            if (typeof renderFun == 'function') {
                //@ts-ignore
                renderData = renderFun.call(_this.entity, { entity: _this.entity, entityItem: _this })
            }
            //渲染组件名称
            //渲染组件函数,返回一个vNode?还是普通的组件类型?
            let renderComName = _this.entityItemConfig.renderComName || 'instanceView'
            let renderComFun = _this.entityItemConfig.renderComFun//直接返回vNode吧
            if (typeof renderComFun == 'function') {
                try {
                    renderCom = renderComFun({ entityItem: _this, entity: _this.entity })//函数式
                } catch (error) {
                    renderCom = h('div')
                }
            } else {
                //@ts-ignore
                let renderComponent = comVetor[renderComName]
                if (renderComponent == null) {
                    //@ts-ignore
                    renderComponent = instanceView
                }
                const renderConfig = { ...renderData, key: _this.entityItemConfig.renderKey }
                if (_this.entityItemConfig.instance != null && Boolean(_this.entityItemConfig.nodeType) != false) {
                    renderConfig.instance = this.entityItemConfig.instance
                }
                renderCom = h(renderComponent, renderConfig)
            }
            //获取renderCom的组件
            const _divStyle = { position: 'absolute', top: '0px', left: '0px', bottom: '0px', background: "white", opacity: '0', right: '0px', zIndex: 999 } as StyleType
            const renderStyle = { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType
            const dragCom = withDirectives(
                h('div', {
                    style: _divStyle,
                    onContextmenu: (event: MouseEvent) => {
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
        const entity = this.entity!
        let isDrag = computed(() => {
            return entity.layoutConfig.isDraggable && entity.layoutConfig.isResizable
        })
        const vNode = () => {
            const renderLayoutItem = _this.renderLayoutItem
            const gridItemCom = resolveComponent('grid-item')
            const layoutItemCom = h(gridItemCom, renderLayoutItem, () => {
                return h(basicEntityItemView, { instance: _this })
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