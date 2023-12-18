import { buttonConfig, concatAny } from "@/types/schema";
import { base } from "./base";
import { VxeButtonProps, VxeButtonEventProps, VxeButton, VxeButtonDefines, VxeButtonSlots, VxeButtonEmits, VxeButtonEvents } from "vxe-table";
import { h, reactive, useSlots, watchEffect } from "vue";
import * as buttonFn from './buttonFn'
import { systemInstance } from "./system";
export class button extends base<VxeButtonProps> {
    buttonConfig: buttonConfig = {}
    buttonName = 'buttonName'
    renderButton: buttonConfig = {
    }
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    async initButton() {
        const _buttonConfig: any = this.buttonConfig
        const schema = this.schema!
        for (const key of Object.keys(schema)) {
            this.effectPool[`button${key}Effect`] = watchEffect(() => {
                _buttonConfig[key] = schema[key]
            })
        }
        this.initRenderButton()
        this.initComponent()
    }
    async initRenderButton() {
        const buttonConfig = this.buttonConfig
        const renderButton = this.renderButton
        renderButton.slots = buttonFn.getButtonSlots(this) as any
        renderButton.onClick = (item) => {
            const _onClick = buttonConfig.onClick
            if (typeof _onClick == 'function') {
                _onClick(item)
            }
        }
    }
    async initComponent() {
        const vNode = () => {
            // const slots = useSlots()  
            const renderButton = this.renderButton
            if (this.displayState == 'destroy') {
                return h('div')
            }
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

export const createButton = (schema: concatAny<VxeButtonProps>) => {
    const _button = reactive(new button(schema, systemInstance))
    _button.initButton()
    return _button
}