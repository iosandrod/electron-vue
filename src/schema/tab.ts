import { computed, reactive, watchEffect, h, withDirectives, vShow, ref, watch } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { TabPane, Tabs, TabsProps } from "ant-design-vue";
import { StyleType, tabConfig, tabItemConfig } from "@/types/schema";
import { createTabItem, tabItem } from "./tabItem";
import instanceView from "./schemaComponent/instanceView";
import basicEntityItemView from "./schemaComponent/basicEntityItemView";

export class tab extends base {
    renderTab: TabsProps = {}
    tabConfig: tabConfig = {
        hideAdd: true,//默认不可添加
        tabItems: [],//tabItems 这个是最主要的
        activeKey: '',
        type: "editable-card",
        tabMarginHidden: false,
        closable: false
    }
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    initTab() {
        const schema = this.schema
        const _tabConfig: any = this.tabConfig
        for (const key of Object.keys(schema)) {
            if (key == 'tabItems') {
                continue
            }
            this.effectPool[`tab${key}Effect`] = watchEffect(() => {
                _tabConfig[key] = schema[key]
            })
        }
        this.initRenderTab()
        this.initTabItems()
        this.initComponent()
    }
    initTabItems() {
        const tabConfig = this.tabConfig
        const tabItems = this.schema.tabItems || []
        const _tabItems = tabItems?.map(item => {
            if (item instanceof tabItem) {
                return item
            }
            let _item = createTabItem(item, this)
            return _item
        })
        tabConfig.tabItems = _tabItems as any
        if (this.tabConfig.activeKey === '') {
            this.tabConfig.activeKey = this.tabConfig.tabItems?.[0]?.tabItemConfig.key || ''
        }
        watch(() => this.schema.tabItems, (newTabItems: tabItemConfig[]) => {
            const tabItems = this.tabConfig.tabItems
            const oldTabItemKeys = tabItems?.map(item => {
                return item.tabItemConfig.key
            }) || []
            for (const item of newTabItems) {
                const key = item.key
                //以前有的就不创建了
                if (oldTabItemKeys.includes(key)) {
                    const _oldItem = this.tabConfig.tabItems?.find((item) => {
                        return item.tabItemConfig.key == key
                    }) as any
                    Object.entries(item).forEach(([_key, value]) => {
                        _oldItem.tabItemConfig[_key] = value
                    })
                    continue
                }
                //以前没有的就创建
                if (!oldTabItemKeys.includes(key)) {
                    this.addTabItem(item)
                    continue
                }
                //以前有的但是现在没有的
            }
            //先都创建,此时新的tabitem的长度肯定会更长一点
            const removeTabKeys = newTabItems.map(item => item.key)
            const removeItems = this.tabConfig.tabItems?.filter(item => !removeTabKeys.includes(item.tabItemConfig.key))
            removeItems?.forEach(item => {
                this.removeTabItem(item.tabItemConfig.key)
            })
        })
    }
    addTabItem(tabItemConfig: tabItemConfig) {
        // const 
        const newTab = createTabItem(tabItemConfig, this)
        this.tabConfig.tabItems?.push(newTab)
        this.tabConfig.tabItems?.sort((item1, item2) => {
            return item1.tabItemConfig.tabIndex! - item2.tabItemConfig.tabIndex!
        })
    }
    removeTabItem(key: string) {//唯一值
        const targetIndex: number = this.tabConfig.tabItems?.findIndex(item => {
            return item.tabItemConfig.key == key
        })!
        if (targetIndex == -1) {
            return
        }
        this.tabConfig.tabItems?.splice(targetIndex, 1)
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
            const tabItems = this.tabConfig.tabItems!
            const tabCom = h(Tabs, this.renderTab, () => {
                const tabItems = tabConfig.tabItems
                return tabItems?.map((item) => {
                    return item.component!()
                })
            })
            const _class = ['h-full', 'w-full']
            if (tabConfig.tabMarginHidden == true) {
                _class.push('tabNoneMargin')
            }
            const tabChildren = tabItems?.map((item: tabItem) => {
                return h(basicEntityItemView, { instance: item, key: item.tabItemConfig.key })
            })
            const tabChildrenDiv = h('div', { style: { width: "100%", height: "400px" } as StyleType }, [tabChildren])
            const com = withDirectives(h('div', { class: _class, style: { display: "flex", flexDirection: "column" } as StyleType }, [tabCom, tabChildrenDiv]), [[vShow, show.value]])
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
        renderTab.hideAdd = computed(() => {
            return tabConfig.hideAdd
        }) as any
        renderTab.tabBarExtraContent = computed(() => {
            return tabConfig.tabBarExtraContent
        })
        renderTab.activeKey = computed({
            get: () => {
                let _tabIndex = tabConfig.activeKey
                return _tabIndex
            },
            set: (value) => {
                tabConfig.activeKey = value
            }
        }) as any

        renderTab.tabBarStyle = computed(() => {
            const obj = {
                margin: '0 0 0 0 !important',
                height: '30px'
            } as StyleType
            let _obj = tabConfig.tabBarStyle || {}
            return Object.assign(obj, _obj)
        }) as any
        const _this = this
        renderTab.onEdit = (value, action) => {
            const onEdit = _this.tabConfig.onEdit
            if (typeof onEdit == 'function') {
                onEdit(value, action)
            }
        }
        renderTab.onTabClick = (key, e) => {
            const _onTabClick = tabConfig.onTabClick
            if (typeof _onTabClick == 'function') {
                _onTabClick(key, e)
            }
        }
        renderTab.tabBarGutter = 0
        renderTab.onChange = (key,) => {
            // console.log(key, this.tabConfig.activeKey, 'testKey')
            this.tabConfig.activeKey = key
            const _onChange = tabConfig.onChange
            if (typeof _onChange == 'function') {
                _onChange(key)
            }

        }
    }
}


export const createTab = (schema: tabConfig) => {
    const _tab = reactive(new tab(schema, systemInstance))
    _tab.initTab()
    return _tab as tab
}