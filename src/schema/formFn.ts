import { computed } from "vue";
import { form } from "./form";
import { createFormItem, formitem } from "./formitem";

export const getFormItems = (form: form) => {
    return computed(() => {
        const _items = form.formConfig.items.map(item => {
            if (item instanceof formitem) {
                return createFormItem(item)
            } else {
                return item
            }
        }).filter(item1 => {
            return item1 != null
        })
    })
}