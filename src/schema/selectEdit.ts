import { h, reactive, useSlots, watchEffect } from "vue";
import { system, systemInstance } from "./system";
import { SelectProps, Select } from "ant-design-vue";
import { selectConfig } from "@/types/schema";
import * as selectEditFn from "./selectEditFn";
import { baseEdit } from "./baseEdit";

export class select extends baseEdit<selectConfig> {
    selectConfig: selectConfig = {
        options: [{ label: "1", value: 1 }]
    }
    selectRender: SelectProps = {}
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initSelect() {
        //同步外部设置 
        const schema = this.schema!
        // for (const key of Object.keys(schema)) { 
        //     const value = schema[key] 
        //     if (value != null) {
        //         const effectPool = this.effectPool
        //         const selectConfig = this.selectConfig as any
        //         effectPool[`select${key}Effect`] = watchEffect(() => {
        //             selectConfig[key] = schema[key]
        //         })
        //     }
        // }
        this.initSelectRender()
        this.initComponent()
    }
    initSelectRender() {
        const selectRender = this.selectRender
        selectRender.options = selectEditFn.getSelectOptions(this) as any
        selectRender.value = selectEditFn.getSelectModalValue(this) as any
        selectRender.onChange = (value) => {
            console.log('valueChange', value)
        }
    }
    async initComponent() {
        const selectRender = this.selectRender
        const vNode = () => {
            const slots = useSlots()
            console.log(slots, 'tsetSlots')
            console.log(selectRender, 'testRender')
            return h(Select, selectRender)
        }
        this.component = vNode
    }
}

export const createSelect = (schema: any) => {
    const _select = reactive(new select(schema, systemInstance))
    _select.initSelect()
    return _select
}