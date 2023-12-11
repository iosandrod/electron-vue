import { computed, h, resolveComponent, getCurrentInstance } from "vue";
import { basicEntity } from "./basicEntity";
import lodash from "lodash";
import { StyleType } from "@/types/schema";
import { getTableConfig, getTableInfo } from "@/api/httpApi";
import { entityColumn } from "../entityColumn";
import { createTable } from "../table";
import { mainEntity } from "./mainEntity";
import { TabsProps } from "ant-design-vue";


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