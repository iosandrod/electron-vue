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
    // console.log('审核')
    entity.auditRow()
}
//反审
export const unAudit = (entity: mainEntity) => {
    entity.unAuditRow()
}

export const showSearchMenu = (entity: mainEntity) => {
    //显示查询框
    entity.openDialog('searchDialog')
}

export async function del(_this: mainEntity) {
    await _this.deleteModel()
}

export async function closeBill(_this: mainEntity) {
    // billClose(table)
    await _this.billCloseCurRow()
}
//打开单据
export async function openBill(_this: mainEntity) {
    await _this.billOpenCurRow()
}