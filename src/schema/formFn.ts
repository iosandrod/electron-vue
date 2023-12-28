import { computed } from "vue";
import { form } from "./form";
import { createFormItem, formitem } from "./formitem";

export const getFormItems = (form: form) => {
    return computed(() => {
        const _items = form.formConfig.items.map((item: formitem) => {
            return item.renderItem
        }).filter(item1 => item1 != null)
        return _items
    })
}


export const getFormData = (form: form) => {
    return computed(() => {
        return form.formConfig.data
    })
}