import { reactive } from "vue";
import { input } from "../input";
import { system, systemInstance } from "../system";
import { formitem } from "../formitem";
import { form } from "../form";


export class select extends input {
    getFormItem?: () => formitem
    getForm?: () => form
    constructor(schema: any, system: system) {
        super(schema, system)
    }
    initInput() {
        super.initInput()//
    }
    initRenderInput() {
        super.initRenderInput()
        const inputConfig = this.inputConfig//统一使用inputConfig
    }
}

export const createSelect = (schema: any) => {
    const _string1 = reactive(new select(schema, systemInstance))
    _string1.initInput()
    return _string1
}