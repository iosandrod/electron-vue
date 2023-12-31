import { runBeforeConfig } from "@/types/schema";
import { detailEntity } from "./detailEntity";

export const getTableData_before = (beforeConfig: runBeforeConfig) => {
    const entity: detailEntity = beforeConfig.table as any
    const _this = entity
    const mainEntity = entity.mainEntity
    const curRow = mainEntity?.pageRef.vxeGrid?.getCurRow()
    if (curRow == null) {
        _this.clearTableData()
        return Promise.reject("主表没有当前行")
    }
}