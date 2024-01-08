import { command, runAfterConfig, runBeforeConfig } from "@/types/schema";
import { detailEntity } from "./detailEntity";
import { mainEditEntity } from "./mainEditEntity";
import { mainEntity } from "./mainEntity";
import { uid } from "quasar";
import { t } from "vxe-table";

export const getTableData_before = (runBeforeConfig: runBeforeConfig) => {
    const table = runBeforeConfig.table
    const _this = table!
    //获取一些where条件
    const tableConfig = table?.tableConfig.searchFormFields
    const searchWhere = table?.tableConfig.columns.map(col => {
        return
    })
    //把当前行缓存
    const curRow = _this.getCurRow(true)
    runBeforeConfig.oldCurRow = curRow
}
export const getTableData_after = async (runAfterConfig: runAfterConfig) => {
    const table = runAfterConfig.table!
    const _this = table
    const tableKey = _this.getTableInfoKey("key") as string
    //旧的当前行
    let oldCurRow = runAfterConfig.oldCurRow
    if (oldCurRow != null) {
        const oldKeyValue = oldCurRow[tableKey]
        const data = _this.tableData.data
        const targetRow = data.find(row => {
            return row[tableKey] == oldKeyValue
        })
        if (targetRow != null) {
            await _this.setCurRow(targetRow)
        } else {
            let data = _this.tableData.data
            const targetRow = data[0]
            if (targetRow) {
                await _this.setCurRow(targetRow)
            }
        }
    } else {
        let data = _this.tableData.data
        const targetRow = data[0]
        if (targetRow) {
            await _this.setCurRow(targetRow)
        }
    }
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


export const refreshData_after = (runAfterConfig: runAfterConfig) => {
    const rows = runAfterConfig.rows || []
    const entity = runAfterConfig.table
    const curRow = entity?.getCurRow()
    if (rows.includes(curRow)) {
        return
    } else {
        entity?.detailTable?.forEach(table => {
            table.clearTableData()
        })
    }
}