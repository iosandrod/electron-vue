import { computed, h, reactive, useAttrs, vShow, watchEffect, withDirectives } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { StyleType, inputConfig } from "@/types/schema";
import { VxeInput, VxeInputEventProps, VxeInputProps } from "vxe-table";
import { SelectProps } from "ant-design-vue";

export class input extends base {
    updateFn?: (value: any) => void
    getData?: () => any
    getField?: () => any
    focus?: () => void = () => { }
    inputConfig: inputConfig = {
        type: "text",//默认是这个
        isFocus: false,
        options: [{
            key: 'test',
            label: "展示的值",
            value: "展示的值"
        }, {
            key: 'test1',
            label: "展示的值",
            value: "展示的1值"
        }],
        allowClear: true,
    }
    renderInput: inputConfig = {}
    renderSelect: SelectProps = {}
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initInput() {
        const schema = this.schema
        const inputConfig: any = this.inputConfig
        for (const key of Object.keys(schema)) {//获取key
            if (key == 'modelValue') {
                this.effectPool[`input${key}Effect`] = watchEffect(() => {
                    inputConfig[key] = schema[key]
                })
                continue
            }
            this.effectPool[`input${key}Effect`] = watchEffect(() => {
                inputConfig[key] = schema[key]//进行注入
            })
        }
        this.initRenderInput()
        this.initComponent()
    }
    valueChange(value: any) {

    }
    initRenderInput() {
        const _this = this
        const inputConfig = this.inputConfig
        const renderInput = this.renderInput
        renderInput.modelValue = computed(() => {
            return inputConfig.modelValue
        }) as any
        renderInput.onChange = ({ value }) => {
            const getData = _this.getData
            const getField = _this.getField
            if (typeof getData == 'function' && typeof getField == 'function') {
                let data = getData()
                let field = getField()
                data[field] = value
            }
            const _onChange = inputConfig.onChange as any
            inputConfig.modelValue = value
            if (typeof _onChange == 'function') {
                _onChange(value)
            }
        }
        //@ts-ignore
        renderInput['onUpdate:modelValue'] = (value1: any) => {

        }
    }
    update(value: any) {
        const updateFn = this.updateFn
    }
    initComponent() {
        const renderInput = this.renderInput
        const show = computed(() => {
            return this.displayState == 'show'
        })
        const destroy = computed(() => {
            return this.displayState == 'hidden'
        })
        const vNode = (props?: any) => {
            if (destroy.value == true) {
                return null
            }
            const attrs = useAttrs()!
            let updateFn = attrs['onUpdate:modelValue']
            if (typeof updateFn !== 'function') {
                updateFn = () => { }
            }
            const com = withDirectives(
                h('div', { style: { height: "100%", width: '100%' } as StyleType, attrs: attrs }, h(VxeInput, { ...renderInput }))
                , [[vShow, show.value]]
            )
            return com
        }
        this.component = vNode
    }
}

export const createInput = (schema: any) => {
    const _input = reactive(new input(schema, systemInstance))
    _input.initInput()
    return _input
}