import { reactive, computed, h, watchEffect } from "vue";
import { base } from "../base";
import { system, systemInstance } from "../system";
import { TabPaneProps } from "ant-design-vue";
import { entityGroupConfig, tabConfig } from "@/types/schema";
import { basicEntity } from "./basicEntity";
import { createTab } from "../tab";
import instanceView from "../schemaComponent/instanceView";
import tabView from "../schemaComponent/tabView";

export class detailEntityGroup extends base {
    renderTab: tabConfig = {}
    entityGroupConfig: entityGroupConfig = {
        entityGroup: []
    }
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initEntityGroup() {
        const schema = this.schema
        const entityGroupConfig: any = this.entityGroupConfig
        for (const key of Object.keys(schema)) {
            if (key == 'entityGroup') {
                continue
            }
            this.effectPool[`entityGroup${key}Effect`] = watchEffect(() => {
                entityGroupConfig[key] = schema[key]
            })
        }
        this.initEntity()
        this.initRenderTab()
        this.initComponent()
    }
    initEntity() {
        const schema = this.schema
        const entityGroup: any[] = schema.entityGroup || []
        this.entityGroupConfig.entityGroup = entityGroup.map(entity => {
            if (entity instanceof basicEntity) {
                return entity
            }
            return null
        }).filter(entity => entity != null)
    }
    initRenderTab() {
        const renderTab = this.renderTab
        const entityGroupConfig = this.entityGroupConfig
        renderTab.tabItems = computed(() => {
            let tabObjArr = entityGroupConfig.entityGroup?.map((row: basicEntity) => {
                const key = row.entityName
                const cnName = row.tableInfo?.cnName
                return { key: key, tab: cnName, component: row.component }
            })
            return tabObjArr
        }) as any
        renderTab.activeKey = computed(() => {
            return entityGroupConfig.activeKey
        }) as any
        renderTab.onChange = (value) => {
            console.log(value, 'testValue')
        }
        renderTab.tabBarStyle = computed(() => {
            let obj = {
                margin: '0 0 0 0 !important',
                height: '35px'
            }
            const tabBarStyle = entityGroupConfig.tabBarStyle
            let _obj = Object.assign(obj, tabBarStyle)
            return _obj
        }) as any
        renderTab.type = computed(() => {
            return entityGroupConfig.type || 'card'
        }) as any
        renderTab.tabMarginHidden = true
        const tabInstance = createTab(renderTab)
        this.pageRef.tabInstance = tabInstance
    }
    initComponent() {
        const vNode = () => {
            const instance = this.pageRef.tabInstance
            // return h('div', [123])
            // return h(instanceView, { instance: instance })
            return h(tabView, { tabInstance: instance })
        }
        this.component = vNode
    }
}

export const createDetailEntityGroup = (schema: any) => {
    const _detailGroup = reactive(new detailEntityGroup(schema, systemInstance))
    _detailGroup.initEntityGroup()
    return _detailGroup
}