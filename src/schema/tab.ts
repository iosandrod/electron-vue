import { computed, reactive, watchEffect, h, withDirectives, vShow } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { TabPane, Tabs, TabsProps } from "ant-design-vue";
import { tabConfig } from "@/types/schema";

export class tab extends base {
    renderTab: TabsProps = {}
    tabConfig: tabConfig = {
        tabItems: [],
        activeKey: '',
        type: "card",
    }
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    initTab() {
        const schema = this.schema
        const _tabConfig: any = this.tabConfig
        Object.keys(schema).forEach((key) => {
            this.effectPool[`tab${key}Effect`] = watchEffect(() => {
                _tabConfig[key] = schema[key]
            })
        })
        this.initRenderTab()
        this.initComponent()
    }
    initComponent(): void {
        const _this = this
        const tabConfig = this.tabConfig
        const destroy = computed(() => {
            return _this.displayState == 'destroy'
        })
        const show = computed(() => {
            return _this.displayState == 'show'
        })
        const vNode = () => {
            if (destroy.value == true) {
                return null
            }
            const tabCom = h(Tabs, this.renderTab, () => {
                const tabItems = tabConfig.tabItems
                return tabItems?.map(item => {
                    return h(TabPane, item)
                })
            })
            const com = withDirectives(h('div', [tabCom]), [[vShow, show.value]])
            return com
        }
        this.component = vNode
    }
    initRenderTab() {
        const renderTab = this.renderTab
        const tabConfig = this.tabConfig
        renderTab.type = computed(() => {
            return tabConfig.type
        }) as any
        renderTab.activeKey = computed(() => {
            return tabConfig.activeKey
        }) as any
        renderTab.tabBarStyle = computed(() => {
            return tabConfig.tabBarStyle || {}
        }) as any
        renderTab.onTabClick = (key, e) => {
            const _onTabClick = tabConfig.onTabClick
            if (typeof _onTabClick == 'function') {
                _onTabClick(key, e)
            }
        }
        renderTab.onChange = (key,) => {
            const _onChange = tabConfig.onChange
            if (typeof _onChange == 'function') {
                _onChange(key)
            }

        }
    }
}


export const createTab = (schema: any) => {
    const _tab = reactive(new tab(schema, systemInstance))
    _tab.initTab()
    return _tab
}