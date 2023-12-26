import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { system, systemInstance } from "../system"
import { StyleType, displayState, entityConfig, layoutItem } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"
import { base } from "../base"
import { createEntityButton } from "../entityButton"
import { mainEntity } from "./mainEntity"
import { createDetailEntityGroup } from "./detailEntityGroup"

export class mainEditEntity extends basicEntity {
    //页面树
    isEditEntity = true
    constructor(schema: any, entityName: string, system: any) {//schema 是entity的数据
        //schema是配置
        super(schema, system);//外部的数据应该是静态数据
        this.entityType = 'edit'//编辑类型的entity
        this.entityName = entityName
        this.buttonCategory = 'ViewFormGridEdit'
    }
    async initEntity() {
        try {
            await super.initEntity({ show: false })
            await this.initDetailEntity()
            this.displayState = 'show'
        } catch (error) {
            console.error(error)
        }
    }
    async initComponent() {//初始化节点
        await super.initComponent()
    }
    //初始化子表数据
    async initDetailEntity() {
        // const tableInfo = this.tableInfo
        // const detailTable = tableInfo?.detailTable! || []
        // const detailEntity = await Promise.all(detailTable.map(async (table) => {
        //     const dTable = await createDetailEntity(table.tableName, table)//表名
        //     dTable.mainEntity = this as any
        //     return dTable
        // }))
        // this.detailTable = detailEntity as any//业务逻辑类型的子组件
        // this.detailEntityConfig.curDetailKey = this.detailTable?.[0]?.tableInfo?.tableName || ''
    }
    setNodeDisplayState(refName: string | Object, state: displayState) {
        const pageRef = this.pageRef as any//
        const targetNode = pageRef[refName as string] as base
        if (targetNode != null) {
            targetNode.displayState = state//设置显示与隐藏
        }
        if (typeof refName == 'object') {
            const _refName = refName as any
            _refName.displayState = state
        }
    }
    initEditEntity() {

    }
    getMainEntity(getFn?: (value: any) => mainEntity) {
        if (typeof getFn == 'function') {
            return getFn(this)
        }
        const system = this.system as system
        const entityVetor = system.entityVetor//获取主要的表格
    }
    //@ts-ignore 
    async initRenderDetailEntity() {
        const _this = this
        if (_this.pageRef.dEntityInstance != null) {
            return { instance: _this.pageRef.dEntityInstance }
        }
        const tableInfo = _this.tableInfo
        const detailTable = tableInfo?.detailTable! || []
        const detailEntity = await Promise.all(detailTable.map(async (table) => {
            const dTable = await createDetailEntity(table.tableName, table)//表名
            dTable.mainEntity = _this as any
            return dTable
        }))
        _this.detailTable = detailEntity as any//业务逻辑类型的子组件
        const renderDetailEntity = _this.renderDetailEntity
        renderDetailEntity.entityGroup = computed(() => {
            return _this.detailTable
        }) as any
        renderDetailEntity.type = computed(() => {
            return 'card'
        }) as any
        renderDetailEntity.tabBarStyle = computed(() => {
            const detailTable = _this.detailTable
            const obj = {
                margin: '0 0 0 0 !important',
                height: '30px'
            } as StyleType
            if (detailTable!?.length <= 1) {
                obj.display = 'none'
            }
            return obj
        }) as any
        const dEntityInstance = createDetailEntityGroup(renderDetailEntity)
        _this.pageRef.dEntityInstance = dEntityInstance
        _this.detailEntityConfig.curDetailKey = _this.detailTable?.[0]?.tableInfo?.tableName || ''
        return { instance: _this.pageRef.dEntityInstance }
    }
}

//业务
export const createMainEditEntity = (entityName: string, tableInfo: any = {}) => {
    const entity = reactive(new mainEditEntity(tableInfo, entityName, systemInstance))
    entity.initEntity()
    return entity
}
