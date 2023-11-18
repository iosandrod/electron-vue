import { Directive, computed, getCurrentInstance, h, nextTick, reactive, ref, resolveComponent, toRef, watch, watchEffect, withDirectives } from "vue";
import { formitem } from "./formitem";
import { getRenderFn } from "./columnFn";
import { styleBuilder } from "@/utils/utils";
import { VxeButton, VxeGridDefines, VxeGridProps, VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance, VxeTableProps } from 'vxe-table'
import { getIcon } from "./icon";
import tableView from "./schemaComponent/tableView";
import baseInfoView from "./editComponent/baseInfoView";
import selectView from "./editComponent/selectView";
import { pickKey, tableConfig } from "@/types/schema";
import datetimeView from "./editComponent/datetimeView";
import stringView from "./editComponent/stringView";
import boolView from "./editComponent/boolView";
export const getOutSizeEditDiv = (formitem: formitem) => {
    const style = styleBuilder.setFull().getStyle()
    const renderFn = getRenderFn('div', { style })
    return renderFn
}


export const select = (formitem: formitem, data?: any) => {
    const outsizeDivFn = getOutSizeEditDiv(formitem)
    return outsizeDivFn(h(selectView, { formitem: formitem, data: data }))
}


export const datetime = (formitem: formitem, data?: any) => {
    const outsizeDivFn = getOutSizeEditDiv(formitem)
    return outsizeDivFn(h(datetimeView, { formitem: formitem, data: data }))
}
export const date = (formitem: formitem, data?: any) => {
    return datetime(formitem, data)
}


export const time = (formitem: formitem, data?: any) => {
    return datetime(formitem, data)
}

export const string = (formitem: formitem, data?: any) => {
    const outSizeDivFn = getOutSizeEditDiv(formitem)
    const inputCom = h(stringView, { formitem: formitem, data: data, form: formitem.form })
    return outSizeDivFn([inputCom])
}

export const bool = (formitem: formitem, data?: any) => {
    const outSizeDivFn = getOutSizeEditDiv(formitem)
    const boolCom = h(boolView, { formitem: formitem, data: data, form: formitem.form })
    return outSizeDivFn([boolCom])
}

export const baseInfo = (formitem: formitem, data?: any) => {
    return h(baseInfoView, { formitem: formitem, data: data })
}
