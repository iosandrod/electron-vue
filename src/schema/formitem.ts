import { h, reactive, watchEffect } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { VxeFormItemProps } from 'vxe-table'
import { itemConfig } from "@/types/schema";
import { column } from "./column";
import * as formitemFn from './formitemFn'
import { baseEdit } from "./baseEdit";
export class formitem extends baseEdit<any> {
    constructor(schema: any, context: any, system: system) {
        super(schema, system, context)
    }
    column?: column
    itemConfig: itemConfig = {
        type: "string"
    }
    renderItem: VxeFormItemProps = {
    }
    async initFormItem() {
        const schema = this.schema!
        for (const key of Object.keys(schema)) {
            const value = schema[key]
            if (value != null) {
                const effectPool = this.effectPool
                const itemConfig = this.itemConfig as any
                effectPool[`formitem${key}Effect`] = watchEffect(() => {
                    itemConfig[key] = schema[key]
                })
            }
        }
        this.initRenderItem()
        this.initComponent()
    }
    async initComponent() {
        const vNode = () => {
            return h('div')
        }
        this.component = vNode
    }
    async initRenderItem() {
        const renderItem = this.renderItem
        renderItem.slots = formitemFn.getFormitemSlots(this) as any
        renderItem.span = formitemFn.getFormitemSpan(this) as any
        renderItem.visible = formitemFn.getFormItemVisible(this) as any
        renderItem.folding = formitemFn.getFormItemFolding(this) as any
        renderItem.field = formitemFn.getFormItemField(this) as any
    }
}

export const createFormItem = (schema: any, context?: any) => {
    const _formitem = reactive(new formitem(schema, context, systemInstance))
    _formitem.initFormItem()
    return _formitem
}