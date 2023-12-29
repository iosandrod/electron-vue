import { mainEntity } from "@/schema/businessTable/mainEntity"

export const add = function (entity: mainEntity) {
    const _this = entity
    _this.jumpToEditPage()
    // _this.system.routeOpen({ entityName: _this.entityName, isEdit: true })
}

