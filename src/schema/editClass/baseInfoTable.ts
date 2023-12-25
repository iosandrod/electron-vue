import { tableConfig } from "@/types/schema";
import { systemInstance } from "../system";
import { table } from "../table";
import { reactive } from 'vue'
import { getTableConfig } from "@/api/httpApi";

class baseInfoTable extends table {
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
    }
}

export const createBaseInfoTable = (schema: any) => {
    const defaluBaseInfoConfig: tableConfig = {
        columns: [],
        showHeaderMenuDialog: false,
        showBodyMenuDialog: false,
        data: [],
        baseInfoTable: schema
    }
    const baseTable = reactive(new baseInfoTable(systemInstance, defaluBaseInfoConfig))
    baseTable.initTableConfig()
    return baseTable
}