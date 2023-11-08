import { computed, h, useSlots } from "vue"
import { button } from "./button"
import { VxeButtonSlots } from "vxe-table"
import { pickKey } from "@/types/schema"

export const getButtonSlots = (button: button) => {
    return computed(() => {
        const slots: pickKey<VxeButtonSlots> = {}
        slots.default = getButtonSlotsDefault(button).value
        return slots
    })
}

export const getButtonSlotsDefault = (button: button) => {
    return computed(() => {
        return (params: any) => {
            const slots = useSlots()
            const _default = slots.default
            if (_default) {
                return _default(button)
            }
        }
    })
}