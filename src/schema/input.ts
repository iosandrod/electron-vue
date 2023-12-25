import { Directive, computed, h, isProxy, nextTick, reactive, ref, useAttrs, vShow, watch, watchEffect, withDirectives } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { StyleType, inputConfig } from "@/types/schema";
import { VxeInput, VxeInputEventProps, VxeInputInstance, VxeInputProps, VxePulldown, VxePulldownInstance } from "vxe-table";
import { Select, SelectOption, SelectProps } from "ant-design-vue";
import { formitem } from "./formitem";
import { form } from "./form";
import { styleBuilder } from "@/utils/utils";
import { createTable, table } from "./table";
import tableView from "./schemaComponent/tableView";
import { getIcon } from "./icon";
import { initRenderSelect, selectInitComponent } from "./editClass/select";
import { baseInfoInit, baseInfoInitComponent, initBaseInfoTable } from "./editClass/baseInfo";
import { initComponent } from "./editClass/string";
import { dateInit, datetimeInit, timeInit } from "./editClass/time";
import { numberInit } from "./editClass/number";
export class input extends base {
    hasInit = false
    updateFn?: (value: any) => void
    getData?: () => any
    getField?: () => any
    getFormItem?: () => formitem
    getForm?: () => form
    getTable?: () => table
    focus?: () => void = () => { }
    inputConfig: inputConfig = {
        type: "text",//默认是这个
        isFocus: false,
        showSearch: true,
        options: [],
        allowClear: true,
        clearable: true,
        field: ''
    }
    renderInput: inputConfig = {}
    renderSelect: SelectProps = {}
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initInput() {
        if (this.hasInit == true) {
            this.runInitMethod()
            return
        }
        const schema = this.schema
        const inputConfig: any = this.inputConfig
        for (const key of Object.keys(schema)) {//获取key
            if (key == 'data') {
                continue
            }
            if (key == 'modelValue') {
                this.effectPool[`input${key}Effect`] = watchEffect(() => {
                    inputConfig[key] = schema[key]
                })
                continue
            }
            if (key == 'type') {
                watch(() => schema['type'], () => {
                    inputConfig['type'] = schema['type']
                    this.runInitMethod()
                })
                inputConfig['type'] = schema['type']
                continue
            }
            if (key == 'options') {
                watchEffect(() => {
                    let _value = schema['options']
                    inputConfig['options'] = _value
                })
                continue
            }
            this.effectPool[`input${key}Effect`] = watchEffect(() => {
                inputConfig[key] = schema[key]//进行注入
            })
        }
        this.initRenderInput()
        this.initComponent()
        this.runInitMethod()
        this.hasInit = true
    }
    runInitMethod(_type?: any) {
        const type = _type || this.inputConfig.type
        //@ts-ignore
        const initMethod = this[`${type}Init`]
        if (initMethod != null) {
            initMethod.call(this)
        }
    }
    valueChange(value: any) {

    }
    initRenderInput() {
        const _this = this
        const inputConfig = this.inputConfig
        const renderInput = this.renderInput
        renderInput.modelValue = computed({
            set: (value) => {
                renderInput.modelValue = value
            },
            get: () => {
                return inputConfig.modelValue
            }
        }) as any
        renderInput.onChange = ({ value }: any) => {
            const getData = _this.getData
            const getField = _this.getField
            if (typeof getData == 'function' && typeof getField == 'function') {
                let data = getData()
                let field = getField()
                if (data && field) {
                    data[field] = value
                }
            }
            const _onChange = inputConfig.onChange as any
            inputConfig.modelValue = value
            if (typeof _onChange == 'function') {
                const getTable = _this.getTable || (() => { return null })
                const table = getTable()
                _onChange({ value, inputInstance: _this, data: _this.getData!(), table: table })
            }
        }
        renderInput.clearable = computed({
            get: () => {
                return inputConfig.clearable
            },
            set: (value) => {
                renderInput.clearable = value
            }
        }) as any
        //@ts-ignore 
    }
    update(value: any) {
        const updateFn = this.updateFn
    }
    initComponent() {
        initComponent(this)
    }
    selectInit() {
        this.initRenderSelect()
        this.selectInitComponent()
    }
    initRenderSelect() {
        initRenderSelect(this)
    }
    selectInitComponent() {
        selectInitComponent(this)
    }
    stringInit() {
        this.stringInitComponent()
    }
    stringInitComponent() {
        this.initComponent()
    }
    baseInfoInit() {
        baseInfoInit(this)
    }
    baseInfoInitComponent() {
        baseInfoInitComponent(this)
    }
    timeInit() {
        timeInit(this)
    }
    datetimeInit() {
        datetimeInit(this)
    }
    dateInit() {
        dateInit(this)
    }
    numberInit() {
        numberInit(this)
    }
    floatInit() {

    }

    initBaseInfoTable() {
        initBaseInfoTable(this)
    }
}

export const createInput = (schema: any) => {
    const _input = reactive(new input(schema, systemInstance))
    _input.initInput()
    return _input
}