import { base } from "./base";
import { system } from "./system";

export class baseEdit<T> extends base<T>{
    editMethod: {
        focus?: () => void
    } = {
        }
    constructor(schema: any, system: system, context?: any) {
        super(system, schema)
    }
    focus() {
        let focusMethod = this.editMethod.focus
        if (typeof focusMethod == 'function') {
            focusMethod()
        }
    }
}