import { runAfterConfig, runBeforeConfig, whereObj } from "@/types/schema";
import { detailEntity } from "./detailEntity";

export const getTableData_before = (beforeConfig: runBeforeConfig) => {
    const entity: detailEntity = beforeConfig.table as any
    const _this = entity
    const mainEntity = entity.mainEntity
    const params = beforeConfig.params//is any
    const curRow = mainEntity?.getCurRow()
    const detailTableConfig = _this.detailTableConfig
    const foreignId = detailTableConfig.foreignKey
    const whereObj: whereObj = {
        name: foreignId,
        value: curRow?.[foreignId],
        displayType: "Equal"
    }
    params?.wheres?.push(whereObj)
    if (curRow == null) {
        _this.clearTableData()
        return Promise.reject("主表没有当前行")
    }
}

export const getTableData_after = async (afterConfig: runAfterConfig) => {
    const _this = afterConfig.table!
    const data = _this.tableData.data
    const targetRow = data[0]
    if (targetRow != null) {
        _this.setCurRow(targetRow)
    }
}