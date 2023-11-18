import { ReactiveEffect, h, reactive, watchEffect } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";
import { VxeFormItemProps } from 'vxe-table'
import { dialogConfig, itemConfig, pickKey, tableConfig } from "@/types/schema";
import { column } from "./column";
import * as formitemFn from './formitemFn'
import { baseEdit } from "./baseEdit";
import { createDialog, dialog } from "./dialog";
import { getDialogMaskHidden } from "@/utils/utils";
import { form } from "./form";
import { getItemSlotsDefault } from "./formitemFn";
import { table } from "./table";
export class formitem extends baseEdit<any> {
    form?: form
    constructor(schema: any, context: any, system: system) {
        super(schema, system, context)
    }
    itemState: any = {
        isFocus: false
    }
    table?: table
    column?: column
    itemConfig: itemConfig = {
        folding: false, //折叠
        type: "string",
        isFocus: false,//是否聚焦
        baseInfoTable: {
            tableName: '',//表名
            tableData: [],//表的数据
            columns: [],//表的列
        },
        options: []
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
        this.initComponent()
    }
    initBaseInfoDialog() {
        const type = this.itemConfig.type
        if (type != 'baseInfo') {
            return
        }
    }
    openBaseInfoDialog() {
        const pageRef = this.pageRef
    }
    async initComponent() {
        const vNode = () => {
            return h('div')
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