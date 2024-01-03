import { ReactiveEffect, computed, h, reactive, resolveComponent, watch, watchEffect } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { VxeButton, VxeFormItemProps } from 'vxe-table'
import { dialogConfig, inputConfig, itemConfig, layoutItem, pickKey, tableConfig, valueChangeParams } from "@/types/schema";
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
    itemIndex?: number
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
    renderLayoutItem: layoutItem = {
        i: "",
        x: 0,
        y: 0,
        w: 0,
        h: 0
    }
    table?: table
    column?: column
    //@ts-ignore
    itemConfig: itemConfig & inputConfig = {
        isPulldownFocus: false,
        folding: false, //折叠
        type: "text",
        isFocus: false,//是否聚焦
        baseInfoTable: null,
        options: [] as any,
        layout: undefined,
        visible: true,
        columns: [],
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
        this.initRenderLayoutItem()
        this.initComponent()
    }
    initRenderLayoutItem() {
        const form = this.form
        const field = this.itemConfig.field
        this.renderLayoutItem = computed(() => {
            const renderLayout = form?.renderLayout.layout?.find(layout => {
                return layout.i == field
            })
            return renderLayout
        }) as any
    }
    initInputInstance() {
        const _this = this
        const renderInput = this.renderInput
        const itemConfig = this.itemConfig
        renderInput.type = computed(() => {
            let type = this.itemConfig.type
            return type
        }) as any
        renderInput.field = itemConfig.field
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
        renderInput.disabled = computed(() => {
            const form = this.form
            const formDisabled = form?.formConfig.disabled
            if (formDisabled == true) {
                return true
            }
            // const data = form?.formConfig.data
            // const field = _this.itemConfig.field
            // if (data['cSdOrderNo'] == '111' && field == 'cCustName') {
            //     return true
            // }
            return false
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
        renderInput.itemChange = (value: valueChangeParams) => {
            const _itemChange = itemConfig.itemChange
            if (typeof _itemChange == 'function') {
                _itemChange(value)
            }
        }
        renderInput.formitems = computed(() => {
            return itemConfig.formitems || []
        }) as any
        const inputInstance = createInput(this.renderInput, this.form)
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
        const _this = this
        const vNode = () => {
            const formitem = resolveComponent('vxe-form-item')
            const renderItem = _this.renderItem
            let renderVxeitem = h(formitem, { ...renderItem }, () => {
                const input = h(inputView, { inputInstance: this.pageRef.inputInstance })
                return input
            })
            return renderVxeitem
        }
        this.component = vNode
    }
    async initRenderItem() {
        const renderItem = this.renderItem
        // renderItem.slots = formitemFn.getFormitemSlots(this).value as any
        renderItem.span = formitemFn.getFormitemSpan(this) as any
        // renderItem.visible = formitemFn.getFormItemVisible(this) as any 
        renderItem.field = formitemFn.getFormItemField(this) as any
    }
}

export const createFormItem = (schema: any, form: any, context?: any) => {
    const _formitem = reactive(new formitem(schema, context, systemInstance))
    _formitem.form = form
    _formitem.initFormItem()
    return _formitem
}