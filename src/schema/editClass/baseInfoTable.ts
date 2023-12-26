import { baseInfoConfig, mainTableInfo, tableConfig } from "@/types/schema";
import { systemInstance } from "../system";
import { table } from "../table";
import { reactive } from 'vue'
import { getTableConfig } from "@/api/httpApi";
import { entityColumn } from "../entityColumn";
import { createColumn } from "../column";
import { http } from "../http";

class baseInfoTable extends table {
    tableInfo: mainTableInfo = {} as any
    constructor(system: system, schema: any) {
        super(system, schema)
    }
    getBaseInfoTableData(config: { input: string }) {

    }
    async initTableConfig(): Promise<any> {
        this.displayState = 'destroy'
        super.initTableConfig()
        const baseInfoTable = this.tableConfig.baseInfoTable
        const tableName = baseInfoTable.tableName as string
        const tableInfo = await getTableConfig(tableName)
        this.tableInfo = tableInfo as any
        await this.initBaseInfoColumns()
        this.displayState = 'show'
    }
    async initBaseInfoColumns() {
        const tableInfo = this.tableInfo
        const tableColumns = tableInfo.tableColumns
        const columns = tableColumns.map((col: any) => {
            let _col = new entityColumn()
            _col.initColumn(col)
            return _col
        }).map(col => {
            const baseColumn = createColumn(col, this)
            return baseColumn
        })
        const cKeyColumn = tableInfo.cKeyColumn
        const cCodeColumn = tableInfo.cCodeColumn
        columns.forEach(col => {
            let field = col.columnConfig.field
            if (field == cKeyColumn || field == cCodeColumn) {
                col.columnConfig.visible = true
            } else {
                col.columnConfig.visible = false
            }
        })
        this.tableConfig.columns = columns
    }
    getBaseInfoData(value: string, config?: baseInfoConfig,) {
        const _config = config || this.schema!.baseInfoTable
        // const tableName = _config.tableName//string
        // const cCodeColumn = this.tableInfo.cCodeColumn
        // const getDataSql = `select * from ${tableName} where ${cCodeColumn} like ${value}`

    }
}

export const createBaseInfoTable = (schema: any) => {
    const defaluBaseInfoConfig: tableConfig = {
        columns: [],
        showHeaderMenuDialog: false,
        showBodyMenuDialog: false,
        data: [],
        baseInfoTable: schema,
        showSeqColumn: false,
        showHeader: false,
    }
    const baseTable = reactive(new baseInfoTable(systemInstance, defaluBaseInfoConfig))
    baseTable.initTableConfig()
    return baseTable
}