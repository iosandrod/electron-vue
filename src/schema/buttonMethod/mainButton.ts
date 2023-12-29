// import { fn } from 'moment'
import * as xlsx from 'xlsx'
import { mainEntity } from '../businessTable/mainEntity'
// import { billAudit, billUnAudit } from './billAudit'
// import { billClose, billOpen } from './billOpen'
// import { deleteRow } from './delete'
// import { VXETable, VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
//预览
export async function boxPreview(table: mainEntity) { }

//新增
export async function add(table: mainEntity,) {
    // let addModel = table.addModel
    // if (addModel == null) {
    //     return
    // }
    // await table.addModel()
}

//编辑
export async function edit(table: mainEntity,) {
    // let editModel = table.editModel
    // if (editModel == null) {
    //     return
    // }
    // await table.editModel()
}
//删除
export async function del(table: mainEntity) {
    // let deleteModel = table.deleteModel
    // if (deleteModel == null) {
    //     return
    // }
    // await table.deleteModel()
    // await deleteRow(table:mainEntity)
}
//审核
export async function audit(table: mainEntity) {
    // await table.auditRow()
}
//反审
export async function unAudit(table: mainEntity) {
    // await table.unAuditRow()
}
//关闭单据
export async function closeBill(table: mainEntity) {
    // billClose(table:mainEntity)
    // await table.billCloseCurRow()
}
//打开单据
export async function openBill(table: mainEntity) {
    // billOpen(table:mainEntity)
    // await table.billOpenCurRow()
}
//刷新
export async function refresh(table: mainEntity) {
    // await table.getTableData()
}
//退出
export async function exit(table: mainEntity) {
    // let exitCurrentTable = table.exitCurrentTable
    // if (exitCurrentTable) {
    //     await table.exitCurrentTable()
    // }
}
export async function openViewColumns(table: mainEntity) { }

//显示过了面板
export async function showSearchMenu(table: mainEntity) {
    table.pageConfig.showConfig.searchModalStatus = true
}
export async function closeVolBox(table: mainEntity) { }

//单表格增行

//单表格保存
export async function openCatBox_Add(table: mainEntity) { }
export async function openCatBox_Update(table: mainEntity) { }

export async function deleteNode(table: mainEntity) { }

export async function addSelectRow(table: mainEntity) {
    // await table.dbCurRowChange()
}
export async function _export(table: mainEntity) {
    // await table.exportTableData(table: mainEntity)
}
export async function _import(table: mainEntity) {
    // await table.importTableData()
}

//保存
export async function saveMainTable(table: mainEntity) {
    // let saveTableData = table.saveTableData
    // if (saveTableData) {
    //     await table.saveTableData()
    // }
}

export async function mainAddTableRow(table: mainEntity) {
    // await table.addTableRow(1)
}

export async function mainTableInsertRow(table: mainEntity) {
    // await table.addTableRow(1, [], true)
}

export async function allOrCancelSelect(table: mainEntity) {
    // await table.selectAll()
}
export async function printScan(table: mainEntity) {
    // await table.openPrintTable()
}
export async function printDesign(table: mainEntity) {
    // await table.designPrintTable()
}
export async function printScanOuterBox(table: mainEntity) {
    // const V_SrmPackBoxBarcode = await table.createTableInstance('V_SrmPackBoxBarcode')//打印外箱条码实例
    // await table.openOuterBoxPrintTable(V_SrmPackBoxBarcode)
}
export async function printDesignOuterBox(table: mainEntity) {
    // const V_SrmPackBoxBarcode = await table.createTableInstance('V_SrmPackBoxBarcode')//打印外箱条码实例
    // await table.designOuterBoxPrintTable(V_SrmPackBoxBarcode)
}
