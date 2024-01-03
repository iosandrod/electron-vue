import { mainEditEntity } from "@/schema/businessTable/mainEditEntity";

//第一条
export async function boxBillOrder_First(entity: mainEditEntity) {
    const mainEntity = entity.getSystemMainEntity()
    if (mainEntity != null) {
        const firstRow = mainEntity.pageRef.vxeGrid?.getRowByCurRow('first')
        await mainEntity.setCurRow(firstRow)
        await mainEntity.jumpToEditPage({ type: "edit" })
    }
}
//上一条
export async function boxBillOrder_Pre(entity: mainEditEntity) {
    const mainEntity = entity.getSystemMainEntity()
    if (mainEntity != null) {
        const firstRow = mainEntity.pageRef.vxeGrid?.getRowByCurRow('pre')
        await mainEntity.setCurRow(firstRow)
        await mainEntity.jumpToEditPage({ type: "edit" })
    }
}
//下一条
export async function boxBillOrder_Next(entity: mainEditEntity) {
    const mainEntity = entity.getSystemMainEntity()
    if (mainEntity != null) {
        const firstRow = mainEntity.pageRef.vxeGrid?.getRowByCurRow('next')
        await mainEntity.setCurRow(firstRow)
        await mainEntity.jumpToEditPage({ type: "edit" })
    }
}
//最后
export async function boxBillOrder_Last(entity: mainEditEntity) {
    const mainEntity = entity.getSystemMainEntity()
    if (mainEntity != null) {
        const firstRow = mainEntity.pageRef.vxeGrid?.getRowByCurRow('last')
        await mainEntity.setCurRow(firstRow)
        await mainEntity.jumpToEditPage({ type: "edit" })
    }
}
//各种按钮
export const boxEdit = async (entity: mainEditEntity) => {
    await entity.setEntityEdit('fullEdit')
}

export const save = async (entity: mainEditEntity) => {
    entity.setEntityEdit('scan')
}

export const exit = async (entity: mainEditEntity) => {
    console.log('exit')
}

//