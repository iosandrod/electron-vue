import { computed, h, resolveComponent, getCurrentInstance } from "vue";
import { basicEntity } from "./basicEntity";
import lodash from "lodash";
import { StyleType } from "@/types/schema";
import { getTableConfig, getTableInfo } from "@/api/httpApi";
import { entityColumn } from "../entityColumn";
import { createTable } from "../table";


export const initComponent = (basicEntity: basicEntity) => {

}


export const getRenderTable = async <T extends basicEntity>(entity: T) => {
    const renderTable = entity.renderTable//这个是渲染表格的数据
    const tableInfo = await getTableConfig(entity.entityName)//相当于表名吧,这个函数具有副作用
    entity.originTableInfo = JSON.parse(JSON.stringify(tableInfo))//原始的表格数据 
    renderTable.columns = computed(() => {
        const columns: any = entity.originTableInfo.tableColumns
        const _columns = columns.map((col: any) => {
            let _col = new entityColumn()
            _col.initColumn(col)
            return _col
        })
        return _columns
        // return []
    }) as any//处理表格 
    renderTable.data = computed(() => {
        return entity.tableData.data
    }) as any//行与列
    renderTable.onVnodeMounted = [
        (vnode: any) => {
            // const table = vnode?.component?.devtoolsRawSetupState?.table
            // console.log(table === entity.pageRef.vxeGrid, 'testIsTrue')
            // entity.pageRef.vxeGrid = table
        }
    ]
    renderTable.onVnodeUnmounted = [
        // (vnode: any) => {
        //     entity.pageRef.vxeGrid = null as any
        // } 
    ]
    const table = createTable(renderTable)
    entity.pageRef.vxeGrid = table//只初始化一次 
    return { tableInstance: table }
    // return renderTable//固定死的 
}



