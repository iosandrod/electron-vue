import { Directive, computed, getCurrentInstance, h, nextTick, reactive, ref, resolveComponent, toRef, watch, watchEffect, withDirectives } from "vue";
import { formitem } from "./formitem";
import { getRenderFn } from "./columnFn";
import { styleBuilder } from "@/utils/utils";
import { VxeButton, VxeGridDefines, VxeGridProps, VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance, VxeTableProps } from 'vxe-table'
import { getIcon } from "./icon";
import tableView from "./schemaComponent/tableView";
import baseInfoView from "./editComponent/baseInfoView";
import { pickKey, tableConfig } from "@/types/schema";
// import selectView from "./editComponent/selectView";
// import datetimeView from "./editComponent/datetimeView";
// import stringView from "./editComponent/stringView";
// import boolView from "./editComponent/boolView";
// import numberView from "./editComponent/numberView";
import { createBaseInfo } from "./editClass/baseInfo";
import { createBool } from "./editClass/bool";
import { createString } from "./editClass/string";
import { createDatetime } from "./editClass/datetime";
import { createDate } from "./editClass/date";
import { createTime } from "./editClass/time";
import { createNumber } from "./editClass/number";
import { createSelect } from "./editClass/select";
import { createWangEditor } from "./editClass/wangEditor";
export const getOutSizeEditDiv = (formitem: formitem) => {
    const style = styleBuilder.setFull().getStyle()
    const renderFn = getRenderFn('div', { style })
    return renderFn
}


// export const select = (formitem: formitem, data?: any) => {
//     const outsizeDivFn = getOutSizeEditDiv(formitem)
//     return outsizeDivFn(h(selectView, { formitem: formitem, data: data }))
// }


// export const datetime = (formitem: formitem, data?: any) => {
//     const outsizeDivFn = getOutSizeEditDiv(formitem)
//     return outsizeDivFn(h(datetimeView, { formitem: formitem, data: data }))
// }
// export const date = (formitem: formitem, data?: any) => {
//     return datetime(formitem, data)
// }


// export const time = (formitem: formitem, data?: any) => {
//     return datetime(formitem, data)
// }

// export const string = (formitem: formitem, data?: any) => {
//     const outSizeDivFn = getOutSizeEditDiv(formitem)
//     const inputCom = h(stringView, { formitem: formitem, data: data, form: formitem.form })
//     return outSizeDivFn([inputCom])
// }

// export const bool = (formitem: formitem, data?: any) => {
//     const outSizeDivFn = getOutSizeEditDiv(formitem)
//     const boolCom = h(boolView, { formitem: formitem, data: data, form: formitem.form })
//     return outSizeDivFn([boolCom])
// }

// export const baseInfo = (formitem: formitem, data?: any) => {
//     const outSizeDivFn = getOutSizeEditDiv(formitem)
//     const inputCom = h(baseInfoView, { formitem: formitem, data: data })
//     return outSizeDivFn([inputCom])
// }

// export const wangEditor = (formitem: formitem, data?: any) => {
//     const outSizeDivFn = getOutSizeEditDiv(formitem)
//     const inputCom = h(stringView, { formitem: formitem, data: data, form: formitem.form })
//     return outSizeDivFn([inputCom])
// }

// export const number = (formitem: formitem, data?: any) => {
//     const inputCom = h(numberView, { formitem: formitem, data: data })
//     const outSizeDivFn = getOutSizeEditDiv(formitem)
//     return outSizeDivFn(inputCom)
// }

export const stringRange = (formitem: formitem, data?: any) => {

}

export const editPool = {
    // number,
    // baseInfo,
    // bool,
    // string,
    // datetime,
    // date,
    // time,
    // select,
    // wangEditor
}


export const instancePool = {
    number: createNumber,
    baseInfo: createBaseInfo,
    bool: createBool,
    string: createString,
    datetime: createDatetime,
    date: createDate,
    time: createTime,
    select: createSelect,
    wangEditor: createWangEditor
}