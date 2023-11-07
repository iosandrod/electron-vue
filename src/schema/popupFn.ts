import { computed } from "vue";
import { popup } from "./popup";

export const getPopupModalValue = (popup: popup) => {
    return computed(() => {
        const popupConfig = popup.popupConfig
        return popupConfig.modelValue
    })
}