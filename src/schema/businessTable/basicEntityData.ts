//@ts-nocheck
import { contextList, formConfig, itemConfig } from "@/types/schema"
import { formitem } from "../formitem"
import { form } from "../form"
export const tableFormConfig: formConfig = {
    items: []
}
export const formFormConfig: formConfig & { items: itemConfig[] } = {
    itemWidth: 12,
    //@ts-ignore
    items: [
        {
            field: 'items',
            title: "表单编辑项",
            type: "table",//表格类型json,
            tableConfig: {
                columns: [//列类型
                    {
                        editType: "select",
                        field: "type",
                        title: '编辑类型',
                        options: [{
                            label: "字符串",
                            value: "string"
                        }, {
                            label: "select",
                            value: "选择框",
                        }, {
                            label: "关联表",
                            value: "baseInfo"
                        }, {
                            label: "日期",
                            value: "date"
                        }, {
                            label: "日期时间",
                            value: "datetime"
                        }, {
                            label: "时间",
                            value: "time"
                        }],
                    }, {
                        editType: "string",
                        title: "标题",
                        field: "title",
                    },
                ]
            }
        }, {
            type: "number",
            title: "表单项宽度",
        },
    ]
}


export const nodeFormConfig: formConfig = {
    itemWidth: 12,
    //@ts-ignore
    items: [{
        type: 'string',
        field: "renderKey",
        required: true,
        title: "节点主键"
    }, {
        field: "nodeType",
        title: "节点类型",
        type: "select",
        required: true,
        options: [
            { label: "表单类型", value: "form" },
            { label: "表格类型", value: "table" },
            { label: "输入框类型", value: "input" },
            { label: "按钮", value: "button" }
        ],
        itemChange: (value) => {
        }
    }, {
        field: "renderFunName",
        type: "select",
        title: "业务组件",
        options: [{
            label: "业务表格",
            value: "initRenderTable"
        }, {
            label: "业务表单",
            value: "initRenderEditForm"
        }, {
            label: "业务按钮",
            value: "initRenderButtonGroup"
        }],
        itemChange: (value) => {
            const _value = value!.value
            const form = value!.form! as form
            const data = form.formConfig.data || {}
            const _fieldArr = form.getEditItemFields().filter(row => row != 'renderFunName')
            if (Boolean(_value) == true) {
                form.setItemDisabled(_fieldArr, true)
            } else {
                form.setItemDisabled(_fieldArr, false)
                data['renderKey'] = ''
            }
            if (_value == 'initRenderTable') {
                data['renderKey'] = 'vxeGrid'
            } else if (_value == 'initRenderEditForm') {
                data['renderKey'] = 'vxeForm'
            } else if (_value == 'initRenderButtonGroup') {
                data['renderKey'] = 'buttonGroup'
            }
        }
    },
    {
        field: "renderComName",
        type: "select",
        title: "渲染节点",
        options: [
            { label: "输入框", value: "inputView" }
        ]
    },
    {
        field: "formConfig",
        type: "form",
        formConfig: formFormConfig,
        title: "表单配置信息",
        visible: false
    },
    {
        field: "tableConfig",
        type: "form",
        formConfig: tableFormConfig,
        title: '表格配置信息',
        visible: false
    },
    {
        field: 'h',
        type: "number",
        title: "高度",
        defaultValue: 20,
        placeholder: "范围0-80",
        itemChange: (value) => {
            const data = value?.data
            const _value = value?.value
            if (Number(_value)) {
                data['h'] = Math.floor(_value)
            }
        }
    },
    {
        field: "w",
        type: "number",
        title: '宽度',
        placeholder: '范围0-24',
        defaultValue: 20,
        itemChange: (value) => {
            const _value = value?.value
            if (Number(_value) > 24 || Number(_value) < 0) {
                const data = value.data
                data['w'] = 0
            }
        }
    }
    ] as itemConfig[]
}




export const contextList: contextList = [{
    key: 'designItem',
    label: '设计当前组件',
    runFun: (value) => {
        console.log(value, 'testValue')
    }
},
{
    key: 'removeItem',
    label: '移除当前组件',
    runFun: (value) => {
        const menu = value.contextMenu
        const parent = menu.getParent()
        console.log(parent, 'testP')
    },
},]