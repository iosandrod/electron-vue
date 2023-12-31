import { command, runAfterConfig, runBeforeConfig } from "@/types/schema";
import { detailEntity } from "./detailEntity";
import { mainEditEntity } from "./mainEditEntity";
import { mainEntity } from "./mainEntity";
import { uid } from "quasar";

export const getTableData_before = (runBeforeConfig: runBeforeConfig) => {
    const table = runBeforeConfig.table
    const _this = table!
    const tableConfig = table?.tableConfig.searchFormFields
    const searchWhere = table?.tableConfig.columns.map(col => {
        return
    })
    //把当前行缓存
    const curRow = _this.getCurRow()
    // runBeforeConfig.oldRow=
}
export const getTableData_after = (runAfterConfig: runAfterConfig) => {
    const table = runAfterConfig
}


export const curRowChange_after = (runAfterConfig: runAfterConfig) => {
    const _this = runAfterConfig.table!
    const detailTable = _this.detailTable
    const commandArr = detailTable?.map(table => {
        const uId = table.uniqueId
        const command: command = {
            uniqueId: uId,
            runFun: function (config: { [key: string]: any; entity: mainEntity | mainEditEntity | detailEntity; }): void {
                const _this = config.entity
                _this.getTableData()
            }
        }
        return command
    })
    commandArr?.forEach(command => {
        _this.system.addCommand(command)
    })

    //发送指令 
}