import { h, reactive } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { VxeFormItemProps } from 'vxe-table'
import { itemConfig } from "@/types/schema";
import { column } from "./column";
import * as formitemFn from './formitemFn'
export class formitem extends base {
    constructor(schema: any, context: any, system: system) {
        super(system, schema, context)
    }
    column?: column
    itemConfig: itemConfig = {
        type: "string"
    }
    renderItem: VxeFormItemProps = {

    }
    async initFormItem() {
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
    }
}

export const createFormItem = (schema: any, context: any) => {
    const _formitem = reactive(new formitem(schema, context, systemInstance))
    _formitem.initFormItem()
    return _formitem
}