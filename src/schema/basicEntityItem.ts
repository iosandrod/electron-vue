import { reactive } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { basicEntity } from "./businessTable/basicEntity";

export class basicEntityItem extends base {
    entity?: basicEntity
    entityItemConfig = {}
    constructor(schema: any, system: any) {
        super(schema, system)
    }
    initEntityItem() {
        this.initComponent()
    }
    initComponent() {
        const vNode = () => {
            return null
        }
        this.component = vNode
    }
}

export const createEntityItem = (schema: any, entity: any) => {
    const _entityItem = reactive(new basicEntityItem(schema, systemInstance))
    _entityItem.entity = entity
    _entityItem.initEntityItem()
    return _entityItem
}