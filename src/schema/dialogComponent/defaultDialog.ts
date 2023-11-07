import { dialogComponent } from "@/types/schema";
import { dialog } from "electron";
import { getRenderFn } from "../columnFn";

export const defaultDialog: dialogComponent = {
    default: (dialog) => {
        const outSizeDiv = getRenderFn('div', {})
        return outSizeDiv
    },
    header: (dialog) => {
        const outSizeDiv = getRenderFn('div', {})
        return outSizeDiv
    },
    corner: (dialog) => {
        const outSizeDiv = getRenderFn('div', {})
        return outSizeDiv
    }
}