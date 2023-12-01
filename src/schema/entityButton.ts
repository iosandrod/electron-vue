import { computed, reactive } from "vue";
import { button } from "./button";
import { systemInstance } from "./system";

export class entityButton extends button {
    constructor(schema: any, system: any) {
        super(schema, system)
    }
    async initButton() {
        await super.initButton()
    }
    async initRenderButton() {
        await super.initRenderButton()
        const renderButton = this.renderButton
        renderButton.disabled = computed(() => {

        }) as any
    }
    async initComponent() { }
}

export const createEntityButton = (schema: any) => {
    const _button = reactive(new entityButton(schema, systemInstance))
    _button.initButton()
    return _button
}