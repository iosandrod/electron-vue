import { computed, h, reactive, watchEffect } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { button, createButton } from "./button";
import { TabPaneProps } from "ant-design-vue";
import { tabConfig } from "@/types/schema";
import { createTab, tab } from "./tab";
import tabView from "./schemaComponent/tabView";
import instanceView from "./schemaComponent/instanceView";
import { createEntityButton } from "./entityButton";
import { mainEntity } from "./businessTable/mainEntity";

export class buttonGroup extends base {
    getEntity: (() => mainEntity) = () => null as any
    pageRef: { tabInstance?: tab } = {
    }
    buttonGroupConfig = {
        buttons: [],
        buttonType: "button"
    }
    renderTab: TabPaneProps = {}
    constructor(schema: any, system: any, entity) {
        super(system, schema)
        this.getEntity = () => entity
    }
    initButtonGroup() {
        const schema = this.schema
        const buttonGroupConfig: any = this.buttonGroupConfig
        for (const key of Object.keys(schema)) {
            if (key == 'button') {
                continue
            }
            this.effectPool[`buttonGroup${key}Effect`] = watchEffect(() => {
                buttonGroupConfig[key] = schema[key]
            })
        }
        this.initButtons()
        this.initRenderTab()
        this.initComponent()
    }
    initRenderTab() {
        const renderTab = this.renderTab as tabConfig
        renderTab.tabItems = computed(() => {
            return this.buttonGroupConfig.buttons.map((btn: button) => {
                const key = btn.buttonConfig.content || btn.buttonConfig.cButtonName
                return { key, tab: btn.component }
            })
        }) as any
        renderTab.tabBarStyle = {
            margin: '0 0 0 0 !important',
            height: '35px'
        }
        renderTab.tabMarginHidden = true
        const tabInstance = createTab(renderTab)
        this.pageRef.tabInstance = tabInstance
        // renderTab.
    }
    initButtons() {
        const schema = this.schema
        const butotns: any[] = schema.buttons || []
        const _buttons = butotns.map(btn => {
            if (btn instanceof button) {
                return btn
            }
            const buttonType = this.buttonGroupConfig.buttonType
            if (buttonType == 'button') {
                return createButton(btn)
            } else {
                const entity = this.getEntity()
                return createEntityButton(btn, entity)
            }
        })
        this.buttonGroupConfig.buttons = _buttons as any
    }
    initComponent() {
        const vNode = () => {
            const tabInstance = this.pageRef.tabInstance
            return h(instanceView, { instance: tabInstance })
        }
        this.component = vNode
    }
}

export const createButtonGroup = (schema: any, entity) => {
    const btnGroup = reactive(new buttonGroup(schema, systemInstance, entity))
    btnGroup.initButtonGroup()
    return btnGroup
}