import { computed, h, reactive, watchEffect } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { inputConfig } from "@/types/schema";
import { VxeInput, VxeInputEventProps, VxeInputProps } from "vxe-table";

export class input extends base {
    inputConfig: inputConfig = {
        type: "text"//默认是这个
    }
    renderInput: VxeInputProps & VxeInputEventProps = {}
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initInput() {
        const schema = this.schema
        const inputConfig: any = this.inputConfig
        for (const key of Object.keys(schema)) {//获取key
            this.effectPool[`input${key}Effect`] = watchEffect(() => {
                inputConfig[key] = schema[key]//进行注入
            })
        }
        this.initRenderInput()
        this.initComponent()
    }
    initRenderInput() {
        const inputConfig = this.inputConfig
        const renderInput = this.renderInput
        renderInput.modelValue = computed(() => {
            return inputConfig.modelValue//
        }) as any
    }
    initComponent() {
        const renderInput = this.renderInput
        const vNode = () => {
            return h(VxeInput, { ...renderInput })
        }
        this.component = vNode
    }
}

export const createInput = (schema: any) => {
    const _input = reactive(new input(schema, systemInstance))
    _input.initInput()
    return _input
}