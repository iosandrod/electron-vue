import { formItemConfig, valueChangeParams } from "@/types/schema"
import { formitem } from "../formitem"
import { form } from "../form"

export const createInputCom = () => {

}

/* 
options: [{
            label: '',
            value: ""
        }, {
            label: '', 
            value: ""
        }, {
            label: '',
            value: ""
        }, {
            label: '',
            value: ""
        }, {
            label: '',
            value: ""
        }, {
            label: '',
            value: ""
        }, {
            label: '',
            value: ""
        }] */
export const inputComItems: formItemConfig[] = [
    {
        field: "type", title: '类型', type: "select",
        range: true,
        // itemChange: (value?: valueChangeParams) => {
        //     const _value = value?.value
        //     const _form: form = value?.form!
        //     if (_value == 'select') {
        //         _form.setItemDisplay(['options', 'bindField'], true)
        //     } else {
        //         _form.setItemDisplay(['options', 'bindField'], false)
        //     }
        // },
        options: [{
            label: "文本",
            value: 'string'
        }, {
            label: "下拉框",
            value: 'select'
        }, {
            label: "数字",
            value: 'number'
        },
        {
            label: "日期",
            value: 'date'
        }, {
            label: "日期时间",
            value: 'datetime'
        }, {
            label: "时间",
            value: 'time'
        },],
    },
    {
        field: "options", type: "table",//表格类型,弹出表格进行编辑
        columns: [], title: '下拉项数据'
    },
    {
        field: "bindField", type: 'string', title: '下拉项源'
    },
    // {
    //     field: "validate", type: "form", title: "校验", formitems: [{ field: "ruleType", title: "校验类型", type: "select", options: [] }, { field: "ruleFn", type: "codeEdit" }]
    // },
]


