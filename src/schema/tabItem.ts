import { VNode, computed, h, reactive, vShow, watchEffect, withDirectives } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { tab } from "./tab";
import { TabPaneProps, TabPane } from "ant-design-vue";
import { propsConfig } from "./icon";
import { StyleType, tabItemConfig } from "@/types/schema";
import { comVetor } from "@/plugin/register";

export class tabItem extends base {
    tab: tab = null as any
    renderTabItem: TabPaneProps & { key?: string } = {}
    renderComponent?: (() => any) | (() => VNode) = () => null
    tabItemConfig: tabItemConfig = {
        tabIndex: 0,
        renderKey: '',
        renderCom: '',//渲染组件名称
        renderComName: "",
        renderFunName: 'instanceView',
        instance: null,
        createConfig: {},
        key: '',
        tab: '',//
        id: '',
        active: false,
        closable: true,
        disabled: false,
    }
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    initTabItem() {
        const _this = this
        const schema = this.schema || {}
        const effectPool = this.effectPool
        const tabItemConfig: any = this.tabItemConfig
        for (const key of Object.keys(schema)) {
            effectPool[`tab${key}Effect`] = watchEffect(() => {
                tabItemConfig[key] = schema[key]
            })
        }
        this.initRenderTabItem()
        this.initRenderComponent()
        this.initComponent()
    }
    initRenderTabItem() {
        const _this = this
        const tabItemConfig = this.tabItemConfig
        const renderTabItem = this.renderTabItem
        renderTabItem.closable = computed(() => {
            return tabItemConfig.closable
        }) as any
        renderTabItem.key = this.tabItemConfig.key || this.tabItemConfig.renderKey
        renderTabItem.tab = computed(() => {
            // console.log(this.tabItemConfig, 'testConfig')
            return _this.tabItemConfig.tab
        }) as any
    }
    initRenderComponent() {
        const show = computed(() => {
            const activeKey = this.tab.tabConfig.activeKey
            let status = activeKey == this.tabItemConfig.key && this.displayState == 'show'
            return status
        })
        const destroy = computed(() => {
            return false
        })
        const _this = this
        const vNode = () => {
            let renderCom: any = null//渲染的组件类型
            let renderData = {}//渲染组件的数据
            let defaultCom: any = null//最终输入的组件实例
            //获取数据的函数 init renderData
            let renderFunName = _this.tabItemConfig.renderFunName
            let renderFun = _this.tabItemConfig.renderDataFun
            if (typeof renderFun == 'function') {
                renderFun = renderFun
            } else {
                //@ts-ignore
                renderFun = _this.tab[renderFunName]
            }
            if (typeof renderFun == 'function') {
                //@ts-ignore
                renderData = renderFun.call(_this.tab, { tab: _this.tab, tabItem: _this })
            }
            //渲染组件名称
            //渲染组件函数,返回一个vNode?还是普通的组件类型?
            let renderComName = _this.tabItemConfig.renderComName || 'instanceView'
            let renderComFun = _this.tabItemConfig.renderComFun//直接返回vNode吧
            if (typeof renderComFun == 'function') {
                try {
                    renderCom = renderComFun({ tabItem: _this, tab: _this.tab })//函数式
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
                const renderConfig: any = { ...renderData, key: _this.tabItemConfig.renderKey }
                if (_this.tabItemConfig.instance != null) {
                    renderConfig.instance = this.tabItemConfig.instance
                }
                renderCom = h(renderComponent, renderConfig)
            }
            //获取renderCom的组件
            // const _divStyle = { position: 'absolute', top: '0px', left: '0px', bottom: '0px', background: "white", opacity: '0', right: '0px', zIndex: 999 } as StyleType
            const renderStyle = { position: "relative", overflow: "hidden", height: '100%', width: "100%" } as StyleType
            // const dragCom = withDirectives(
            //     h('div', {
            //         style: _divStyle,
            //         onContextmenu: (event: MouseEvent) => {
            //             const entity = _this.entity!
            //             entity.openContext(event)
            //         }
            //     } as propsConfig, [
            //         // h(contextMenuView, { contextMenuInstance: _this.pageRef.contextMenu })
            //     ]), [[vShow, show.value]]
            // )
            if (renderCom) {
                defaultCom = withDirectives(h('div', { style: renderStyle }, [renderCom,
                    // dragCom
                ]), [[vShow, show.value]])
            } else {
                defaultCom = withDirectives(h('div', { style: renderStyle }, ['默认节点']), [[vShow, show.value]])
            }
            return defaultCom
        }
        this.renderComponent = vNode
    }
    initRenderInstance() {
        const tabItemConfig = this.tabItemConfig
        const instance = tabItemConfig.instance
        if (instance != null) {
            return
        }
    }
    initComponent() {
        const _this = this
        const vNode = () => {
            const tabCom = h(TabPane, { ..._this.renderTabItem }, {
                default: () => {

                }
            })
            return tabCom
        }
        this.component = vNode
    }
}

export const createTabItem = (schema: any, tab: any) => {
    const _tabItem = reactive(new tabItem(schema, systemInstance))
    _tabItem.tab = tab
    _tabItem.initTabItem()
    return _tabItem as tabItem
}