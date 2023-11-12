import { base } from "./base";
import { system } from "./system";

export class baseEdit<T> extends base<T>{
    editMethod: {} = {}
    constructor(schema: any, system: system, context?: any) {
        // super(system, schema)
        super(system, schema)
    }
    focus() {
        const pageRef = this.pageRef
        const edititem = pageRef.edititem
    }

}