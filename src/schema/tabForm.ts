import { reactive, watchEffect } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { tabFormConfig } from "@/types/schema";

export class tabForm extends base {
    tabFormConfig: tabFormConfig = {
        items: []
    }
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initTabForm() {
        const schema = this.schema
        const tabFormConfig: any = this.tabFormConfig
        for (const key of Object.keys(schema)) {
            const effectPool = this.effectPool
            effectPool[`tabForm${key}Effect`] = watchEffect(() => {
                tabFormConfig[key] = schema[key]
            })
        }
        this.initRenderTab()
        this.initRenderForms()
        this.initComponent()
    }
    initRenderTab() {

    }
    initRenderForms() {

    }
    initComponent() {
        const vNode = () => {
            return null
        }
        this.component = vNode
    }
}

export const createTabForm = (schema: any) => {
    const _system = systemInstance
    const _tabForm = reactive(new tabForm(schema, _system))
    _tabForm.initTabForm()
    return _tabForm
}