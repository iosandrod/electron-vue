import { runBeforeConfig } from "@/types/schema";
import { detailEntity } from "./detailEntity";

export const getTableData_before = (beforeConfig: runBeforeConfig) => {
    const entity: detailEntity = beforeConfig.table as any
    const mainEntity = entity.mainEntity
    const curRow = mainEntity?.pageRef.vxeGrid?.getCurRow()
    if (curRow == null) {
    }
}