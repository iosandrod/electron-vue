import { mainEntity } from "@/schema/businessTable/mainEntity"

export const add = function (entity: mainEntity) {
    const _this = entity
    _this.jumpToEditPage({ type: 'add' })
}
export const edit = function (entity: mainEntity) {
    const _this = entity
    _this.jumpToEditPage({ type: "edit" })
}
export const refresh = async function (entity: mainEntity) {
    await entity.getTableData()
}


export const exit = async (entity: mainEntity) => {
    await entity.exitPage()
}


export const audit = (entity: mainEntity) => {
}
//反审
export const unAudit = (entity: mainEntity) => {
}