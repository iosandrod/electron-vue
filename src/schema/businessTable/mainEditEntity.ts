import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { system, systemInstance } from "../system"
import { StyleType, displayState, entityConfig, formItemConfig, layoutItem } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"
import { base } from "../base"
import { createEntityButton } from "../entityButton"
import { mainEntity } from "./mainEntity"
import { createDetailEntityGroup } from "./detailEntityGroup"
import { createForm } from "../form"

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
    async initRenderEditForm() {
        const _this = this
        if (_this.pageRef.vxeForm != null) {
            return { instance: _this.pageRef.vxeForm }
        }
        const renderEditForm = _this.renderEditForm
        renderEditForm.data = computed(() => {
            return _this.tableData.curRow
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
    getTableData(where: any) {//使用where条件
    }
    setCurEditRow(where: any) {

    }
    //添加一行
    async addModel() {
        const defaultValue = await this.getDefaultModel()
        this.tableData.curRow = defaultValue
        console.log(this.tableData.curRow, 'testCurRow')
    }
}

//业务
export const createMainEditEntity = (entityName: string, tableInfo: any = {}) => {
    const entity = reactive(new mainEditEntity(tableInfo, entityName, systemInstance))
    entity.initEntity()
    return entity
}
