import { Directive, computed, h, ref, vShow, withDirectives } from "vue";
import { input } from "../input";
import { styleBuilder } from "@/utils/utils";
import { Select } from "ant-design-vue";
import { VxeInput, VxeInputInstance, VxePulldown, VxePulldownInstance } from "vxe-table";
import { getIcon } from "../icon";
import tableView from "../schemaComponent/tableView";
import { createTable } from "../table";


export const timeInit = (input: input) => {
    const _this = input
    const renderInput = _this.renderInput
    renderInput.modelValue = computed({
        set: (value: any) => {
            renderInput.modelValue = value
        },
        get: () => {
            //时间模型
        }
    }) as any
    renderInput.type = 'time'
}

export const datetimeInit = (input: input) => {
    const _this = input
    const renderInput = _this.renderInput
    renderInput.type = 'datetime'
}

export const dateInit = (input: input) => {
    const _this = input
    const renderInput = _this.renderInput
    renderInput.type = 'date'
    renderInput.modelValue = computed({
        set: (value) => {
            renderInput.modelValue = value
        },
        get: () => {
            return _this.inputConfig.modelValue
        }
    }) as any
}
