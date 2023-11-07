import { h, reactive } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { QPopupProxy, QPopupProxyProps } from 'quasar'
import { concatAny } from "@/types/schema";
import * as popupGet from './popupFn'
export class popup extends base<QPopupProxyProps> {
    popupConfig: concatAny<QPopupProxyProps & {}> = {

    }
    renderPopup: QPopupProxyProps = {}
    constructor(schema: any, context: any, system: system) {
        super(system, schema, context)
    }
    initPopup() {
        this.initRenderPopup()
        this.initComponent()
    }
    async initComponent() {
        const vNode = () => {
            return h(QPopupProxy, {}, {
                default: () => {
                    return h('hello world')
                }
            })
        }
        this.component = vNode
    }
    async initRenderPopup() {
        const renderPopup = this.renderPopup
        renderPopup.modelValue = popupGet.getPopupModalValue(this) as any
    }
}

export const createPopup = (schema: any, context: any) => {
    const _popup = reactive(new popup(schema, context, systemInstance))
    _popup.initPopup()
    return _popup
}