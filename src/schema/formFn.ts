import { computed } from "vue";
import { form } from "./form";
import { createFormItem, formitem } from "./formitem";

export const getFormItems = (form: form) => {
    return computed(() => {
        // console.log(form.formConfig.items)
        // const _items = form.formConfig.items.map(item => {
        //     if (item instanceof formitem) {
        //         return item
        //     } else {
        //         return createFormItem(item)
        //     }
        // }).filter(item1 => {
        //     return item1 != null
        // }).map(item => {
        //     return item.renderItem
        // })
        // return _items
        const _items = form.formConfig.items.map((item: formitem) => {
            return item.renderItem
        }).filter(item1 => item1 != null)
        return _items
        // return []
    })
}


export const getFormData = (form: form) => {
    return computed(() => {
        return form.formConfig.data
    })
}