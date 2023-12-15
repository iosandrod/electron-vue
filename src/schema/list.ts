import { reactive } from "vue";
import { base } from "./base";
import { system, systemInstance } from "./system";

export class list extends base {
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initList() {
        const schema = this.schema
        for (const key of Object.keys(schema)) {
            const value = key
        }
    }
}

export const createList = (schema: any) => {
    let _list = reactive(new list(schema, systemInstance))
    _list.initList()
    return _list
}