import { ReactiveEffect, computed, h, reactive, watch, watchEffect } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { VxeButton, VxeFormItemProps } from 'vxe-table'
import { dialogConfig, inputConfig, itemConfig, pickKey, tableConfig } from "@/types/schema";
import { column } from "./column";
import * as formitemFn from './formitemFn'
import { baseEdit } from "./baseEdit";
import { getDialogMaskHidden } from "@/utils/utils";
import { form } from "./form";
import { getItemSlotsDefault } from "./formitemFn";
import { createTable, table } from "./table";
import { createInput } from "./input";
import { instancePool } from "./formitemComFn";
import inputView from "./schemaComponent/inputView";
export class formitem extends baseEdit<any> {
    form?: form
    getForm?: () => form
    getTable?: () => table
    getData?: () => any = () => { return {} }
    constructor(schema: any, context: any, system: system) {
        super(schema, system, context)
    }
    itemState: any = {
        isFocus: false
    }
    renderInput: inputConfig = {}
    table?: table
    column?: column
    itemConfig: itemConfig & inputConfig = {
        isPulldownFocus: false,
        folding: false, //折叠
        type: "text",
        isFocus: false,//是否聚焦
        // baseInfoTable: {//
        //     tableName: 't_Item',//表名 
        //     tableData: [],//表的数据
        //     columns: [],//表的列
        // },
        baseInfoTable: null,
        options: [] as any,
        layout: undefined,
        visible: true,
    }
    baseInfoDialogConfig = {
        props: {
            onShow: getDialogMaskHidden((params: any) => { }),
            onHide: (params: any) => { },
            showHeader: false,
            position: "center",
            lockView: false,
            type: "modal",
            height: '300px', width: '150px', mask: false,
            modelValue: false,
            modalData: {
                formitem: this, tableConfig: {
                    data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },], columns: [
                        { field: 'name', title: '', width: 100, showHeader: false },],
                    showHeader: true,
                } as pickKey<tableConfig>,
            }
        } as dialogConfig, context: {}, dialogName: 'baseInfo'
    }
    renderItem: VxeFormItemProps = {
    }
    async initFormItem() {
        const schema = this.schema!
        for (const key of Object.keys(schema)) {
            const value = schema[key]
            if (value != null) {
                const effectPool = this.effectPool
                const itemConfig = this.itemConfig as any
                effectPool[`formitem${key}Effect`] = watchEffect(() => {
                    itemConfig[key] = schema[key]
                })
            }
        }
        this.initRenderItem()
        this.initBaseInfoDialog()
        this.initInputInstance()
        this.initComponent()
    }
    initInputInstance() {
        const _this = this
        const renderInput = this.renderInput
        const itemConfig = this.itemConfig
        renderInput.type = computed(() => {
            return this.itemConfig.type
        }) as any
        renderInput.onChange = (value) => {
            const _onChange = itemConfig.onChange
            if (typeof _onChange == 'function') {
                _onChange(value)
            }
        }
        renderInput.options = computed(() => {
            let options = itemConfig.options
            if (Array.isArray(options)) {
                return options
            }
            return []
        }) as any
        renderInput.modelValue = computed(() => {
            let value = ''
            const data = _this.form?.formConfig.data
            if (data == null) {
                //@ts-ignore
                value = _this.itemConfig.modelValue!
            } else {
                //@ts-ignore
                value = data[itemConfig.field]
            }
            return value
        }) as any
        renderInput.baseInfoTable = computed(() => {
            return itemConfig.baseInfoTable
        })
        const inputInstance = createInput(this.renderInput)
        inputInstance.getField = () => {
            return itemConfig.field
        }
        this.pageRef.inputInstance = inputInstance
    }
    initBaseInfoDialog() {
        const type = this.itemConfig.type
        //@ts-ignore
        if (type != 'baseInfo') {
            return
        }
        this.initBaseInfoTable()
    }
    openBaseInfoDialog() {
        const pageRef = this.pageRef
    }
    initBaseInfoTable() {
        if (this.pageRef.tableRef != null) {
            return
        }

    }
    async initComponent() {
        const vNode = () => {
            return h(inputView, { inputInstance: this.pageRef.inputInstance })
        }
        this.component = vNode
    }
    async initRenderItem() {
        const renderItem = this.renderItem
        renderItem.slots = formitemFn.getFormitemSlots(this).value as any
        renderItem.span = formitemFn.getFormitemSpan(this) as any
        renderItem.visible = formitemFn.getFormItemVisible(this) as any
        renderItem.folding = formitemFn.getFormItemFolding(this) as any
        renderItem.field = formitemFn.getFormItemField(this) as any
    }
}

export const createFormItem = (schema: any, form: any, context?: any) => {
    const _formitem = reactive(new formitem(schema, context, systemInstance))
    _formitem.form = form
    _formitem.initFormItem()
    return _formitem
}