import { concatAny } from "@/types/schema";
import { base } from "./base";
import { VxeButtonProps, VxeButton, VxeButtonDefines, VxeButtonSlots } from "vxe-table";
import { h, reactive, useSlots } from "vue";
import * as buttonFn from './buttonFn'
import { systemInstance } from "./system";
export class button extends base<VxeButtonProps> {
    buttonConfig: concatAny<VxeButtonProps> = {}
    buttonName = 'buttonName'
    renderButton: VxeButtonProps & { slots?: VxeButtonProps } = {
    }
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    async initButton() {
        this.initRenderButton()
        this.initComponent()
    }
    async initRenderButton() {
        const renderButton = this.renderButton
        renderButton.slots = buttonFn.getButtonSlots(this) as any
    }
    async initComponent() {
        const vNode = () => {
            // const slots = useSlots()
            const renderButton = this.renderButton
            const slots = renderButton.slots! as any
            return h(VxeButton, renderButton, {
                default: slots.default,
                icon: slots.icon,
                dropdowns: slots.dropdowns
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