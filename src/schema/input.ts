import { Directive, computed, h, isProxy, nextTick, reactive, ref, useAttrs, vShow, watch, watchEffect, withDirectives } from "vue";
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



export class input extends base {
    hasInit = false
    codeEditRender = {}
    renderForm: formConfig = {} as any
    pageRef: {
        codeEdit?: monaco.editor.IStandaloneCodeEditor,
        formRef?: form
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
        formitems: []
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
            initMethodName = `${type}InitRange`
        }
        //@ts-ignore
        const initMethod = this[`${type}Init`]
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
        data[field] = value
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
    selectInitRange() {
        const vNode = () => {
            return null
        }
        this.component = vNode
    }
    codeEditInit() {
        initRenderCodeEdit(this)
        codeEditInitComponent(this)
    }
    stringInit() {
        this.initComponent()
    }
    stringInitRange() { }
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


export const createInput = (schema: inputConfig, form?: any) => {
    const _system = systemInstance
    const _input = reactive(new input(schema, _system, form))
    _input.initInput()
    return _input
}