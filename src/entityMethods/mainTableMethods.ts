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
    //审核
}
//反审
export const unAudit = (entity: mainEntity) => {
}

export const showSearchMenu = (entity: mainEntity) => {
    //显示查询框
    entity.openDialog('searchDialog')
}

export async function del(_this: mainEntity) {
    await _this.deleteModel()
}