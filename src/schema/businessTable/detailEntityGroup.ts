import { reactive } from "vue";
import { base } from "../base";
import { system, systemInstance } from "../system";

export class detailEntityGroup extends base {
    constructor(schema: any, system: system) {
        super(system, schema)
    }
    initEntityGroup() {
        const schema = this.schema
    }
    initComponent() {
        const vNode = () => {
            return null
        }
        this.component = vNode
    }
}

export const createDetailEntityGroup = (schema: any) => {
    const _detailGroup = reactive(new detailEntityGroup(schema, systemInstance))
    _detailGroup.initEntityGroup()
    return _detailGroup
}