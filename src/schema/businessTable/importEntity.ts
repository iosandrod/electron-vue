import { reactive } from "vue";
import { basicEntity } from "./basicEntity";
import { systemInstance } from "../system";

export class importEntity extends basicEntity {
    constructor(schema: any, system: any) {
        super(schema, system)
    }
    async initEntity() {
        await super.initEntity({ show: false })
        this.displayState = 'show'
    }
}

export const createImportEntity = (schema: any) => {
    const _entity = reactive(new importEntity(schema, systemInstance))
    _entity.initEntity()
    return _entity
}