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
import { mainEditEntity } from "./mainEditEntity";
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
    return { formInstance: vxeForm, instance: vxeForm }
}

export const initRenderEditForm = (entity: basicEntity) => {

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
    currentDate: (_this: basicEntity) => {
        return _this.utils.getCurrentDate()
    },
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
        //返回主键最大值
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
    },
    selectRows: (_this: basicEntity): any[] => {
        return _this.pageRef.vxeGrid?.getCheckBoxRecord() || []//
    },
    curRow: (_this: basicEntity) => {
        return _this.pageRef.vxeGrid?.getCurRow()
    },
    userName: (_this: basicEntity) => {
        return _this.system.systemConfig.userConfig.userName
    },
    xTableInfo: (_this: basicEntity) => {
        return _this.tableInfo?.xTableInfo
    },
    billTypeID: (_this: basicEntity) => {
        return _this.tableInfo?.xTableInfo.Print.IbillTypeID
    },
    tableEntity: (_this: basicEntity) => {
        return _this.tableInfo?.tableEntity
    },
    realTableName: (_this: basicEntity) => {
        return _this.tableInfo?.tableTrueName
    },
    deleteBill: (_this: basicEntity) => {
        const xTableInfo = _this.getTableInfoKey("xTableInfo")
        const detailTableConfig = _this.detailTableConfig
        const _config = { ...xTableInfo, ...detailTableConfig }
        const deleteBill = _config['deleteBill']
        if (deleteBill == 1 || deleteBill == false) {
            return false
        }
        return null
    },
    companyId: (_this: basicEntity) => {
        return _this.system.systemConfig.companyConfig.companyId
    },
    cVouchType: (_this: basicEntity) => {
        return _this.tableInfo?.xTableInfo?.Print?.IbillTypeID || ''
    },
    dbServer: (_this: basicEntity) => {
        return _this.tableInfo?.dbServer
    },
    entityButtons: (_this: basicEntity) => {
        const entity = _this.getMainTable()
        const tableInfo = entity.tableInfo
        let buttons: any = tableInfo?.tableButtons! || []//
        if (!Array.isArray(buttons)) {
            buttons = []
        }
        const buttonCategory = _this.buttonCategory
        const entityName = _this.entityName
        let _button = buttons?.find((btn: any) => {
            const category = btn.category
            const tableName = btn.tableName
            if (category == buttonCategory && entityName == tableName) {
                return true
            }
        })
        _button = _button || buttons?.find((btn: any) => {
            const category = btn.category
            return category == buttonCategory
        })
        const targetButtons = _button?.buttons || []//获取到这个东西
        return targetButtons
    }
}

export const getFn_edit = {
    curRow: (_this: mainEditEntity) => {
        return _this.tableData.curRow
    }
}