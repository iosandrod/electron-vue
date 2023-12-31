import { command, runAfterConfig, runBeforeConfig } from "@/types/schema";
import { detailEntity } from "./detailEntity";
import { mainEditEntity } from "./mainEditEntity";
import { mainEntity } from "./mainEntity";

export const getTableData_before = (runBeforeConfig: runBeforeConfig) => {
    const table = runBeforeConfig.table
    const tableConfig = table?.tableConfig.searchFormFields
    const searchWhere = table?.tableConfig.columns.map(col => {
        return
    })
}
export const getTableData_after = (runAfterConfig: runAfterConfig) => {
    const table = runAfterConfig
}


export const curRowChange_after = (runAfterConfig: runAfterConfig) => {
    const _this = runAfterConfig.table
    const curRow = _this.getCurRow()
    const detailTable = _this.detailTable
    const command: command = {
        targetEntityName: "",
        targetEntityType: "",
        runFun: function (config: { [key: string]: any; entity: mainEntity | mainEditEntity | detailEntity; }): void {
        }
    }
    //发送指令 
}