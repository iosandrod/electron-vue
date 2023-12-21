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


export const initComponent = (basicEntity: basicEntity) => {

}


export const getRenderTable = async <T extends basicEntity>(entity: T) => {

    // return renderTable//固定死的 
}




export const getRenderDetailEntity = async <T extends mainEntity>(entity: T) => {
    const renderDetailTable = entity.renderDetailTable as TabsProps
    renderDetailTable.destroyInactiveTabPane = computed(() => {
        return true
    }) as any
    renderDetailTable.activeKey = computed(() => {
        return entity.detailEntityConfig.curDetailKey//
    }) as any
    renderDetailTable.onChange = () => {
    }
    renderDetailTable.type = computed(() => {
        return 'card'
    }) as any
    renderDetailTable.tabBarStyle = computed(() => {
        const detailTable = entity.detailTable
        const obj = {
            margin: '0 0 0 0 !important',
            height: '30px'
        } as StyleType
        if (detailTable!?.length <= 1) {
            obj.display = 'none'
        }
        return obj
    }) as any
    return { mainEntity: entity }//子表 随便把主表传过去
}

export const initRenderSearchForm = (entity: basicEntity) => {
    const _this = entity
    const renderSearchForm = _this.renderSearchForm
    renderSearchForm.data = computed(() => {
        return {}
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
    const renderEditForm = _this.renderEditForm
    renderEditForm.data = computed(() => {
        return {}
    }) as any
    renderEditForm.items = _this.tableConfig.columns?.filter(col => Boolean(col.editType) == true).map(col => {
        const obj: formItemConfig = {} as any
        obj.type = computed(() => {
            return col.editType
        }) as any
        obj.field = computed(() => {
            return col.field
        }) as any
        obj.span = computed(() => {
            // return col.editColSize! * 2
            return 6
        }) as any
        obj.title = computed(() => {
            return col.editTitle || col.title
        }) as any
        return obj
    }) as any
    const vxeForm = createForm(renderEditForm)
    //@ts-ignore
    _this.pageRef.vxeForm = vxeForm
    return { formInstance: vxeForm }
}

export const initRenderSearchDialog = (entity: basicEntity) => {
    const _this = entity
    const renderSearchDialog = _this.renderSearchDialog
    renderSearchDialog.showFooter = true
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