//@ts-nocheck
import { contextList, formConfig, itemConfig } from "@/types/schema"
import { formitem } from "../formitem"
import { form } from "../form"
import XEUtils from "xe-utils"
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
        title: "节点主键",
        defaultValue: () => {
            return XEUtils.uniqueId()
        }
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
        field: "renderDataFun",
        type: 'codeEdit',
        title: '节点数据函数',
        placeholder: "返回节点组件需要的数据,慎用"
    },
    {
        field: "renderComFun",
        type: "codeEdit",
        title: "节点组件函数",
        placeholder: '返回某个组件或者虚拟节点,慎用'
    },
    {
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
                // data['renderKey'] = ''
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
            { label: "输入框", value: "inputView" },
            { label: "表格", value: "tableView" }
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
        defaultValue: 200,
        placeholder: "范围0-200",
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




export const formItemForm: formConfig = {
    title: "表单设计器",
    items: [//列类型
        {
            type: "select",
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
            type: "string",
            title: "标题",
            field: "title",
        },
        {
            field: "options",
            type: "table",
            title: '下拉选项',
            placeholder: "类型为select生效",
            tableConfig: {
                title: "选择列表",
                columns: [
                    {
                        editType: "string",
                        title: "显示值",
                        field: "label"
                    },
                    {
                        editType: "string",
                        title: "绑定值",
                        field: 'value'
                    }
                ]
            }
        },
        {
            type: "codeEdit",
            field: "itemChange",
            fnTemplate: "",
        },
        {
            type: 'string',
            field: 'field',
            title: "绑定字段"
        }, {
            type: "number",
            field: "w",
            title: "宽度",
        }, {
            type: "number",
            field: "h",
            title: "高度",
        },
        {
            type: 'number',
            field: "x",
            title: "水平位置"
        }, {
            type: 'number',
            field: "y",
            title: "垂直位置"
        }
    ] as itemConfig[]
}

export const detailAddForm: formConfig = {
    title: "新增子表",
    itemWidth: 12,
    items: [
        {
            "field": "tableName",
            "title": "表名称",
            "type": "string"
        },
        {
            "field": "cnName",
            "title": "表中文名",
            "type": "string"
        },
        {
            "field": "foreignKey",
            "title": "表外键",
            "type": "wangeEditor"
        },
        {
            "field": "clsKey",
            "title": "子表主键",
            "type": "wangeEditor"
        },
        {
            "field": "keyCodeColumn",
            "title": "子表必录字段",
            "type": "wangeEditor"
        },
        {
            "field": "detailTable",
            "title": "子表",
            "type": "wangeEditor"
        },
        {
            "field": "keyCode",
            "title": "主表必录字段",
            "type": "wangeEditor"
        },
        {
            "field": "mainView",
            "title": "子表组件",
            "type": "string"
        },
        {
            "field": "dTableExtend",
            "title": "子表函数扩展",
            "type": "wangeEditor"
        },
        {
            "field": "dPosition",
            "title": "子表的子表位置",
            "type": "select",
            "options": [
                {
                    "key": "bottom",
                    "value": "下侧"
                },
                {
                    "key": "right",
                    "value": "右侧"
                }
            ]
        },
        {
            "field": "addRowNum",
            "title": "新增行数量",
            "type": "number"
        },
        {
            "field": "deleteBill",
            "title": "无需删除数据",
            "type": "bool"
        },
        {
            "field": "canSelect",
            "title": "启用选择框",
            "type": "bool"
        },
        {
            "field": "forgotData",
            "title": "保存无需数据",
            "type": "bool"
        },
        {
            "field": "editHidden",
            "title": "编辑隐藏",
            "type": "bool"
        },
        {
            "field": "viewHidden",
            "title": "主页隐藏",
            "type": "bool"
        },
        {
            "field": "mainButtonShow",
            "title": "主页按钮显示",
            "type": "bool"
        },
        {
            "field": "specialTable",
            "title": "特殊表",
            "type": "bool"
        }
    ] as itemConfig[]
}
