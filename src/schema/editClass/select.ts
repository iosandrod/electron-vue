import { computed, h, vShow, withDirectives } from "vue";
import { input } from "../input";
import { styleBuilder } from "@/utils/utils";
import { Select } from "ant-design-vue";
import { StyleType } from "@/types/schema";

export const initRenderSelect = (input: input) => {
    const _this = input
    const renderSelect = _this.renderSelect
    const inputConfig = _this.inputConfig
    renderSelect.allowClear = computed(() => {
        return inputConfig.allowClear
    }) as any
    renderSelect.showSearch = computed(() => {
        return inputConfig.showSearch
    }) as any
    renderSelect.options = computed(() => {
        // console.log('options Chagne', _this.inputConfig.options)
        const options = _this.inputConfig.options
        if (Array.isArray(options)) {
            return options
        }
        return []
    }) as any
    renderSelect.notFoundContent = ''
    renderSelect.filterOption = (input: string, option: any) => {
        return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }
    renderSelect.onFocus = () => {

    }
    renderSelect.value = computed(() => {
        const modelValue = inputConfig.modelValue
        const options = inputConfig.options || []
        if (options.map((v: any) => v.value).includes(modelValue)) {
            return modelValue
        }
        return ''
    }) as any
    renderSelect.disabled = computed(() => {
        return _this.inputConfig.disabled
    }) as any
    renderSelect.onChange = (value: any) => {
        const data = _this.getData!()
        const field = _this.getField!()
        data[field] = value
        const _onChange = inputConfig.onChange
        if (typeof _onChange == 'function') {
            const getTable = _this.getTable || (() => { return null })
            const getForm = _this.getForm || (() => { return null })
            const table = getTable()
            //@ts-ignore 
            _onChange({ value, inputInstance: _this, data: _this.getData!(), table: table, form: getForm() })
        }
    }
    return renderSelect
}

export const selectInitComponent = (input: input) => {
    const _this = input
    const show = computed(() => {
        return _this.displayState == 'show'
    })
    const destroy = computed(() => {
        return _this.displayState == 'destroy'
    })
    const vNode = () => {
        if (destroy.value == true) {
            return null
        }
        const selectStyle = styleBuilder.setFullWidth().getStyle()
        selectStyle.height = '30px'
        const selectCom = h(Select, { ..._this.renderSelect, style: selectStyle },
            {
                option: (params: any) => {
                    const { value, label } = params
                    const style = styleBuilder.setFlexBetween().setFull().getStyle()
                    return h('div', { style }, [h('div', {}, label), h('div', {}, value)])
                },
            }
        )
        return withDirectives(h('div', { style: { width: "100%", height: '100%' } as StyleType }, [selectCom]), [[vShow, show.value]])
    }
    _this.component = vNode
}