import { command, runAfterConfig, whereObj } from "@/types/schema";
import { mainEditEntity } from "./mainEditEntity";
import { detailEntity } from "./detailEntity";
import { mainEntity } from "./mainEntity";

export const getTableData_after = (config: runAfterConfig) => {//改变当前行数据之后作的事情
    // const curRow
    const _this = config.table!
    const rows = config.rows || []
    if (rows.length == 0) {
        return Promise.reject('找不到指定行')
    }
    const firstRow = rows[0]
    _this.tableData.curRow = firstRow//使用第一行
    const detailEntity = _this.detailTable
    const curRow = _this.tableData.curRow
    //获取所有的单一ID 
    const uniqueIdArr = detailEntity?.map(table => {
        const id = table.uniqueId//唯一Id 
        const command: command = {
            uniqueId: id,
            runFun: function (config: { [key: string]: any; entity: mainEntity | detailEntity | mainEditEntity; }): void {
                const entity = config.entity
                entity.getTableData({})//子表获取数据默认使用
            }
        }
        return command
    })
    const system = _this.system
    uniqueIdArr?.forEach(command => {
        system.addCommand(command)
    })
}

export const addModel_after = (config: runAfterConfig) => {
    const _this = config.table//mainEditEntity 新增之后的事情
    const detailTable = _this?.detailTable || []
    detailTable.forEach(table => {
        table.clearTableData()
        table.addTableRow(12)
    })
}