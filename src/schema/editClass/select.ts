import { computed, h, reactive } from "vue";
import { input } from "../input";
import { system, systemInstance } from "../system";
import { formitem } from "../formitem";
import { form } from "../form";
import { isArray } from "lodash";
import { Select } from "ant-design-vue";
import { styleBuilder } from "@/utils/utils";
import { StyleType } from "@/types/schema";


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
        this.initRenderSelect()
        const inputConfig = this.inputConfig//统一使用inputConfig
        const renderInput = this.renderInput
    }
    initRenderSelect() {
        const _this = this
        const renderSelect = this.renderSelect
        const inputConfig = this.inputConfig
        renderSelect.allowClear = computed(() => {
            return inputConfig.allowClear
        }) as any
        renderSelect.showSearch = computed(() => {
            return inputConfig.showSearch
        }) as any
        renderSelect.options = computed(() => {
            const options = inputConfig.options
            if (isArray(options)) {
                return options
            }
            return []
        }) as any
        renderSelect.filterOption = (input: string, option: any) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
        renderSelect.onFocus = () => {
            console.log('focus')
        }
        renderSelect.value = computed(() => {
            const modelValue = inputConfig.modelValue
            const options = inputConfig.options || []
            if (options.map((v: any) => v.value).includes(modelValue)) {
                return modelValue
            }
            return ''
        }) as any
        renderSelect.onChange = (value: any) => {
            const data = this.getData!()
            const field = this.getField!()
            data[field] = value
            const _onChange = inputConfig.onChange
            if (typeof _onChange == 'function') {
                _onChange(value)
            }
        }
    }
    initComponent(): void {
        const _this = this
        const show = computed(() => {
            return _this.displayState == 'show'
        })
        const destroy = computed(() => {
            return _this.displayState == 'destroy'
        })
        const renderSelect = this.renderSelect
        super.initComponent()
        const vNode = () => {
            const selectStyle = styleBuilder.setFullWidth().setFullHeight().getStyle()
            const selectCom = h(Select, { ...renderSelect, style: selectStyle }, {
                option: (params: any) => {
                    const { value, label } = params
                    const style = styleBuilder.setFlexBetween().setFull().getStyle()
                    return h('div', { style }, [h('div', {}, label), h('div', {}, value)])
                },
            })
            return h('div', { style: { width: "100%", height: '100%' } as StyleType }, [selectCom])
        }
        this.component = vNode
    }
}

export const createSelect = (schema: any) => {
    const _string1 = reactive(new select(schema, systemInstance))
    _string1.initInput()
    return _string1
}