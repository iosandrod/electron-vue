import { Directive, computed, h, isProxy, nextTick, reactive, ref, toRefs, useAttrs, vShow, watch, watchEffect, withDirectives } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { StyleType, formConfig, inputConfig } from "@/types/schema";
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
import { codeEditInitComponent, initRenderCodeEdit } from "./editClass/codeEdit";
import * as monaco from 'monaco-editor'
import { formInitComponent, initRenderForm } from "./entityDesignCom/formCom";
import instanceView from "./schemaComponent/instanceView";
import inputView from "./schemaComponent/inputView";



export class input extends base {
    hasInit = false
    codeEditRender = {}
    renderForm: formConfig = {} as any
    pageRef: {
        codeEdit?: monaco.editor.IStandaloneCodeEditor,
        formRef?: form,
        input1?: input
        input2?: input
        [key: string]: any
    } = {}
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
        range: false,
        field: '',
        baseInfoTable: null,
        formitems: [],
        rangeModelValue: []
    }
    renderInput: inputConfig = {}
    renderSelect: SelectProps = {}
    constructor(schema: any, system: any, form?: any) {
        super(system, schema)
        this.getForm = () => form
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
            if (key == 'field') {
                this.inputConfig.field = schema[key]
                this.getField = () => schema[key]
                continue
            }
            if (key == 'range') {
                watch(() => schema['range'], (newValue) => {
                    inputConfig['range'] = newValue
                    this.runInitMethod()
                })
                inputConfig['range'] = schema['range']
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
        const range = this.inputConfig.range
        let initMethodName = `${type}Init`
        if (range == true) {
            initMethodName = `inputInitRange`
        }
        //@ts-ignore
        const initMethod = this[initMethodName]
        if (initMethod != null) {
            initMethod.call(this)
        }
    }
    getBindValue() {
        try {
            const _this = this
            const data = _this.getData!()
            const field = _this.inputConfig.field!
            const value = data[field]
            return value
        } catch (error) {
            return ''
        }
    }
    updateData(value: any) {
        const updateFn = this.inputConfig.updateFn
        if (typeof updateFn == 'function') {
            updateFn(value)
            return
        }
        const _this = this
        let getData = _this.getData
        if (getData == null) {
            const updateFn = _this.updateFn
            if (updateFn == null) {
                return
            }
            if (typeof updateFn == 'function') {
                updateFn(value)
            }
            return
        }
        let field = _this.inputConfig.field
        if (field == null) {
            field = this.getField!() as string
        }
        const data = _this.getData!()
        if (data != null) {
            data[field] = value
        }
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
        renderInput.placeholder = computed({
            set: (value) => {
                renderInput.placeholder = value
            },
            get: () => {
                return inputConfig.placeholder || ''
            }
        })
        renderInput.disabled = computed({
            set: (value) => {
                _this.inputConfig.disabled = value
            },
            get: () => {
                return _this.inputConfig.disabled
            }
        }) as any
        renderInput.onChange = ({ value }: any) => {
            _this.updateData(value)
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
    initComponent() {
        initComponent(this)
    }
    selectInit() {
        initRenderSelect(this)
        selectInitComponent(this)
    }
    // selectInitRange() {

    // }
    codeEditInit() {
        initRenderCodeEdit(this)
        codeEditInitComponent(this)
    }
    stringInit() {
        this.initComponent()
    }
    inputInitRange() {
        const _this = this
        const inputConfig = _this.inputConfig
        const schema = this.schema
        const form = this.getForm!()
        let input1 = this.pageRef.input1
        if (input1 == null) {
            const modelValue = computed(() => {
                return inputConfig.rangeModelValue![0]
            })
            //@ts-ignore
            const config = {
                ...toRefs(schema), field: "0", modelValue, range: false,
            } as inputConfig
            input1 = createInput(config as any, form)
        }
        let input2 = this.pageRef.input2
        if (input2 == null) {
            const modelValue = computed(() => {
                return inputConfig.rangeModelValue![1]
            })
            const config = { ...toRefs(schema), field: "1", modelValue, range: false } as any
            input2 = createInput(config, form)
        }
        this.pageRef.input1 = input1
        this.pageRef.input2 = input2
        const vNode = () => {
            const input1Com = h(inputView, { inputInstance: input1, data: _this.inputConfig.rangeModelValue })
            const input2Com = h(inputView, { inputInstance: input2, data: _this.inputConfig.rangeModelValue })
            return h('div', { style: { display: 'flex', flexDirection: "row", width: '100%', height: "100%" } as StyleType }, [input1Com, input2Com])
        }
        this.component = vNode
    }
    baseInfoInit() {
        baseInfoInit(this)
    }
    baseInfoInitRange() {

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
    formInit() {
        initRenderForm(this)
        formInitComponent(this)
    }
    initBaseInfoTable() {
        initBaseInfoTable(this)
    }
}


export const createInput = (schema: inputConfig, form?: any): input => {
    const _system = systemInstance
    const _input = reactive(new input(schema, _system, form))
    _input.initInput()
    return _input as input
}