import { computed } from "vue";
import { select } from "./selectEdit";

export const getSelectOptions = (select: select) => {
    return computed(() => {
        console.log(select.selectConfig.options, 'testOptions')
        return select.selectConfig.options
    })
}

export const getSelectModalValue = (select: select) => {
    return computed({
        get() {
            return select.selectConfig.value as any
        },
        set(value: string) {
            select.selectConfig.value = value
            select.selectConfig.modalValue = value
        }
    })
}


export const getSelectFilterOption = (select: select) => {
    return computed(() => {
        return select.selectConfig.filterOption
    })
}