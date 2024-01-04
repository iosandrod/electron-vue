import { getDataConfig, runAfterConfig, runBeforeConfig, whereObj } from "@/types/schema";
import { detailEntity } from "./detailEntity";

export const getTableData_before = (beforeConfig: runBeforeConfig) => {
    const entity: detailEntity = beforeConfig.table as any
    const _this = entity
    const mainEntity = entity.mainEntity
    const params = beforeConfig.params as getDataConfig//is any
    const curRow = mainEntity?.getCurRow()
    const detailTableConfig = _this.detailTableConfig
    const foreignId = detailTableConfig.foreignKey
    const whereObj: whereObj = {
        name: foreignId,
        value: curRow?.[foreignId],
        displayType: "Equal"
    }
    params?.wheres?.push(whereObj)
    params.rows = 0
    params.page = 0
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

export const addTableRow_after = async (afterConfig: runAfterConfig) => {
    const _this = afterConfig.table
    const rows = afterConfig.rows
    const detailTableConfig = _this?.detailTableConfig
    const foreignKey = detailTableConfig?.foreignKey!//外键
    const mainTable = _this?.mainEntity
    const mainCurRow = mainTable?.getCurRow()
    const foreignValue = mainCurRow[foreignKey]
    rows.forEach((row: any) => {
        row[foreignKey] = foreignValue
    })
}