import { computed, h, reactive, resolveComponent } from "vue";
import { form } from "./form";
import { system, systemInstance } from "./system";
import { styleBuilder } from "@/utils/utils";
import { VxeFormItem } from "vxe-table";
import { formitem } from "./formitem";
import { layoutConfig } from "@/types/schema";

export class designForm extends form {
    constructor(schema: any, system: system) {
        super(schema, system)
    }
    renderLayout: layoutConfig = {}
    initRenderLayout() {
        let _this = this
        let layoutRender = this.renderLayout
        layoutRender.isDraggable = true
        layoutRender.isResizable = true
        layoutRender.layout = computed({
            set(value) {
                console.log('change layout')
            },
            get() {
                let layouts = _this.formConfig.items.map((item: formitem) => item.itemConfig.layout)
                console.log(layouts, 'testLayouts')
                return layouts
            }
        }) as any
        layoutRender.rowHeight = 30
        layoutRender.useCssTransform = true
        layoutRender.verticalCompact = true
    }
    async initForm() {
        this.initRenderLayout()
        super.initForm()
    }
    async initComponent() {
        const vNode = () => {
            const layoutCom = resolveComponent('grid-layout')
            const layoutItemCom = resolveComponent('grid-item')
            let layout = h(layoutCom, { ...this.renderLayout }, () => {
                let items = this.formConfig.items.map((v: formitem) => {
                    let _default: any = v.renderItem.slots?.default
                    let xeitem = _default({ data: this.formConfig.data })
                    // console.log(v.itemConfig.layout, 'testLayout')
                    let layoutItem = h(layoutItemCom, { ...v.itemConfig.layout }, () => {
                        return xeitem
                    })
                    return layoutItem
                })
                return items
            })
            return layout
        }
        this.component = vNode
    }
}








export const createDesignForm = (schema: any) => {
    const _form = reactive(new form(schema, systemInstance))
    _form.initForm()
    return _form
}