import { runAfterConfig, runBeforeConfig } from "@/types/schema";

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