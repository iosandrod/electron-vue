import { reactive } from "vue";
import { base } from "../base";
import { mainEntity } from "./mainEntity";
import { basicEntity } from "./basicEntity";

export class mainEditEntity extends basicEntity {
    mainEntity?: mainEntity
    constructor(mainEntity: mainEntity) {
        super({}, mainEntity.system)
        this.mainEntity = mainEntity
        this.entityName = mainEntity.entityName//处理这个东西
        this.displayState = 'destroy'//先隐藏
    }
}

export const createMainEditEtity = (main: mainEntity) => {
    const entity = reactive(new mainEditEntity(main))//
}