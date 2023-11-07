import { concatAny } from "@/types/schema";
import { base } from "./base";
import { VxeButtonProps, VxeButton } from "vxe-table";
import { h, reactive, useSlots } from "vue";
import { systemInstance } from "./system";
export class button extends base {
    buttonConfig: concatAny<VxeButtonProps> = {}
    constructor(schema: any, context: any, system: any) {
        super(system, schema, context)
    }
    async initButton() {
        await this.initComponent()
    }
    async initComponent() {
        const vNode = () => {
            const slots = useSlots()
            return h(VxeButton, {}, {
                default: () => {
                    const defaultSlot = slots.default
                    return h('div', {}, ['buttonText'])
                }
            })
        }
        this.component = vNode
    }
}

export const createButton = (schema: concatAny<VxeButtonProps>, context: any) => {
    const _button = reactive(new button(schema, context, systemInstance))
    _button.initButton()
    return _button
}