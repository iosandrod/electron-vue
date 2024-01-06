import { computed, h, resolveComponent, getCurrentInstance } from "vue";
import { basicEntity } from "./basicEntity";
import lodash from "lodash";
import { StyleType, formItemConfig, itemConfig } from "@/types/schema";
import { getTableConfig, getTableInfo } from "@/api/httpApi";
import { entityColumn } from "../entityColumn";
import { createTable } from "../table";
import { mainEntity } from "./mainEntity";
import { TabsProps } from "ant-design-vue";
import { createForm } from "../form";
import { createDialog, dialog } from "../dialog";
// import { createDetailEntity } from "./detailEntity";
// import { createDetailEntityGroup } from "./detailEntityGroup";





export const getRenderTable = async <T extends basicEntity>(entity: T) => {
    // return renderTable//固定死的 
}




export const getRenderDetailEntity = async <T extends mainEntity>(entity: T) => {
    // const _this = entity
    // if (_this.pageRef.dEntityInstance != null) {
    //     return { instance: _this.pageRef.dEntityInstance }
    // }
    // const tableInfo = _this.tableInfo
    // const detailTable = tableInfo?.detailTable! || []
    // const detailEntity = await Promise.all(detailTable.map(async (table) => {
    //     const dTable = await createDetailEntity(table.tableName, table)//表名
    //     dTable.mainEntity = _this as any
    //     return dTable
    // }))
    // _this.detailTable = detailEntity as any//业务逻辑类型的子组件
    // const renderDetailEntity = _this.renderDetailEntity
    // renderDetailEntity.entityGroup = computed(() => {
    //     return _this.detailTable
    // }) as any
    // renderDetailEntity.type = computed(() => {
    //     return 'card'
    // }) as any
    // renderDetailEntity.tabBarStyle = computed(() => {
    //     const detailTable = _this.detailTable
    //     const obj = {
    //         margin: '0 0 0 0 !important',
    //         height: '30px'
    //     } as StyleType
    //     if (detailTable!?.length <= 1) {
    //         obj.display = 'none'
    //     }
    //     return obj
    // }) as any
    // const dEntityInstance = createDetailEntityGroup(renderDetailEntity)
    // _this.pageRef.dEntityInstance = dEntityInstance
    // _this.detailEntityConfig.curDetailKey = _this.detailTable?.[0]?.tableInfo?.tableName || ''
    // return { instance: _this.pageRef.dEntityInstance }
    // const renderDetailTable = entity.renderDetailTable as TabsProps
    // renderDetailTable.destroyInactiveTabPane = computed(() => {
    //     return true
    // }) as any
    // renderDetailTable.activeKey = computed(() => {
    //     return entity.detailEntityConfig.curDetailKey//
    // }) as any
    // renderDetailTable.onChange = () => {
    // }
    // renderDetailTable.type = computed(() => {
    //     return 'card'
    // }) as any
    // renderDetailTable.tabBarStyle = computed(() => {
    //     const detailTable = entity.detailTable
    //     const obj = {
    //         margin: '0 0 0 0 !important',
    //         height: '30px'
    //     } as StyleType
    //     if (detailTable!?.length <= 1) {
    //         obj.display = 'none'
    //     }
    //     return obj 
    // }) as any
    // return { mainEntity: entity, }//子表 随便把主表传过去
}



export const jumpToEditPage = (entity: mainEntity) => {
    const _this = entity
    const system = _this.system
    system.routeOpen({ entityName: _this.entityName, isEdit: true })
}
// export cosnt  

export const curRowChange = (entity: mainEntity) => {

}

export const getTableData = (entity: mainEntity) => {

}

export const getFn = {
    tableCnName: (_this: basicEntity) => {
        return _this.tableInfo?.cnName
    },
    key: (_this: basicEntity) => {
        const tableInfo = _this.tableInfo
        return tableInfo?.cKeyColumn
    },
    keyCode: (_this: basicEntity) => {
        const tableInfo = _this.tableInfo
        return tableInfo?.cKeyColumn
    },
    entity: (_this: basicEntity) => {
        const tableInfo = _this.tableInfo
        return tableInfo?.tableEntity
    },
    maxKey: async (_this: basicEntity) => {

    },
    searchItems: (_this: basicEntity) => {
        const searchForm = _this.pageRef.searchForm
        return searchForm?.getEditItems() || []
    },
    editItems: (_this: basicEntity) => {
        const editForm = _this.pageRef.vxeForm
        return editForm?.getEditItems()
    },
    editForm: (_this: basicEntity) => {
        return _this.pageRef.vxeForm
    },
    searchForm: (_this: basicEntity) => {
        return _this.pageRef.searchForm
    }
}