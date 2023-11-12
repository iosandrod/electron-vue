import { computed } from "vue";
import { form } from "./form";
import { createFormItem, formitem } from "./formitem";

export const getFormItems = (form: form) => {
    return computed(() => {
        const _items = form.formConfig.items.map(item => {
            if (item instanceof formitem) {
                return item
            } else {
                return createFormItem(item)
            }
        }).filter(item1 => {
            return item1 != null
        }).map(item => {
            return item.renderItem
        })
        return _items
    })
}


export const getFormData = (form: form) => {
    return computed(() => {
        return form.formConfig.data
    })
}