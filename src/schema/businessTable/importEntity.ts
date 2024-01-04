import { reactive } from "vue";
import { basicEntity } from "./basicEntity";
import { systemInstance } from "../system";
import * as mainMethods from '@/entityMethods/importTableMethod'
export class importEntity extends basicEntity {
    constructor(schema: any, system: any) {
        super(schema, system)
    }
    async initEntity() {
        await super.initEntity({ show: false })
        this.entityType = 'import'
        this.displayState = 'show'
        this.buttonCategory = 'ViewImportGrid'
        this.buttonMethod = mainMethods
    }
    async getTableData() {

    }
}

export const createImportEntity = (schema: any) => {
    const _entity = reactive(new importEntity(schema, systemInstance))
    _entity.initEntity()
    return _entity
}