import { mainEntity } from "@/schema/businessTable/mainEntity"

export const add = function (entity: mainEntity) {
    const _this = entity
    _this.jumpToEditPage({ type: 'edit' })
    // _this.system.routeOpen({ entityName: _this.entityName, isEdit: true })
}
export const edit = function (entity: mainEntity) {
    const _this = entity
    _this.jumpToEditPage({ type: "edit" })
}
