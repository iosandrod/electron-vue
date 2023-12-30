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

export const initRenderSearchForm = (entity: basicEntity) => {
    const searchForm = entity.pageRef.searchForm
    if (searchForm != null) {
        return { instance: searchForm }
    }
    const _this = entity
    const renderSearchForm = _this.renderSearchForm
    renderSearchForm.data = computed(() => {
        return _this.tableConfig.searchFormFields
    }) as any
    renderSearchForm.items = _this.tableConfig.columns!.filter(col => Boolean(col.searchType) !== false).map(col => {
        let obj: itemConfig = {} as any
        obj.type = computed(() => {
            return col.searchType
        }) as any
        obj.span = computed(() => {
            return 24
        }) as any
        obj.field = computed(() => {
            return col.sBindField || col.field
        }) as any
        obj.options = computed(() => {
            return col.options
        }) as any
        obj.title = computed(() => {
            return col.title
        }) as any
        return obj
    })
    const vxeForm = createForm(renderSearchForm)
    //@ts-ignore
    _this.pageRef.searchForm = vxeForm//查询表单
    return { formInstance: vxeForm }
}

export const initRenderEditForm = (entity: basicEntity) => {
    const _this = entity
    if (_this.pageRef.vxeForm != null) {
        return { instance: _this.pageRef.vxeForm }
    }
    const renderEditForm = _this.renderEditForm
    renderEditForm.data = computed(() => {
        return {}
    }) as any
    renderEditForm.disabled = computed(() => {
        const entityState = _this.entityState
        if (entityState == 'scan') {
            return true
        }
        return false
    }) as any
    renderEditForm.items = _this.tableConfig.columns?.filter(col => Boolean(col.editType) == true).sort((c1, c2) => {
        const o1 = c1.editOrderNo!
        const o2 = c2.editOrderNo!
        return o1 - o2!
    }).map(col => {
        const obj: formItemConfig = {} as any
        obj.type = computed(() => {
            return col.editType
        }) as any
        obj.field = computed(() => {
            return col.field
        }) as any
        obj.span = computed(() => {
            const num = Number(col.editColSize)
            if (isNaN(num)) {
                return 6
            }
            return num! * 2
        }) as any
        obj.title = computed(() => {
            return col.editTitle || col.title
        }) as any
        obj.baseInfoTable = computed(() => {
            return col.baseInfoTable
        }) as any
        obj.options = computed(() => {
            return col.options || []
        }) as any
        return obj
    }) as any
    const vxeForm = createForm(renderEditForm)
    //@ts-ignore
    _this.pageRef.vxeForm = vxeForm
    return { formInstance: vxeForm, instance: _this.pageRef.vxeForm }
}

export const initRenderSearchDialog = (entity: basicEntity) => {
    const _this = entity
    const renderSearchDialog = _this.renderSearchDialog
    renderSearchDialog.showFooter = true
    renderSearchDialog.transfer = false
    renderSearchDialog.modalData = { entity: _this }
    renderSearchDialog.buttons = [{
        text: "查询",
        btnFun: async (dialog: dialog) => {
            console.log(_this)
        }
    }, {
        text: "取消",
        btnFun: async (dialog: dialog) => {
            dialog?.close();
        }
    }]
    renderSearchDialog.maskClosable = false
    renderSearchDialog.height = 'auto'
    renderSearchDialog.width = 400
    const dialog = createDialog('entitySearchDialog', renderSearchDialog, false)
    _this.pageRef.searchDialog = dialog as any
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