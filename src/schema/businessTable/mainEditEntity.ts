import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { system, systemInstance } from "../system"
import { StyleType, displayState, entityConfig, formItemConfig, getDataConfig, layoutItem, pickKey, runBeforeConfig, tableState, whereObj } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableData, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"
import { base } from "../base"
import { createEntityButton } from "../entityButton"
import { mainEntity } from "./mainEntity"
import { createForm } from "../form"
import * as mainEditExtend from './mainEditEntityExtend'
import * as mainMethod from '@/entityMethods/mainEditTableMethods'
import { getFn_edit } from "./basicEntityFn"
export class mainEditEntity extends basicEntity {
    //页面树
    isEditEntity = true
    constructor(schema: any, entityName: string, system: any) {//schema 是entity的数据
        //schema是配置
        super(schema, system);//外部的数据应该是静态数据
        this.entityType = 'edit'//编辑类型的entity
        this.entityName = entityName
        this.buttonCategory = 'ViewFormGridEdit'
        this.buttonMethod = mainMethod
        Object.entries(mainEditExtend).forEach(([key, value]) => {
            this.addExtendMethod(key, value)
        })
        Object.entries(getFn_edit).forEach(([key, value]) => {
            //@ts-ignore
            this.getFn[key] = value
        })
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
    getCurRow() {
        return this.tableData.curRow
    }
    //@ts-ignore 
    // async getTableData(getDataConfig: pickKey<getDataConfig>) {//使用wheres条件
    //     const _this = this
    //     const { url, params } = await getTableData(_this)
    //     const _params = Object.assign(params, getDataConfig)
    //     const config: runBeforeConfig = {
    //         methodName: "getTableData",
    //         table: _this,
    //         params: _params,//获取数据的params
    //         url: url
    //     }
    //     await _this.getRunBefore(config)
    //     const result = await _this.http.getTableData(config.url, config.params)
    //     config.result = result
    //     await _this.getRunAfter(config)
    // }
    setCurEditRow(where: any) {

    }
    setEntityEdit(state: tableState) {
        super.setEntityEdit(state)
        const vxeForm = this.pageRef.vxeForm//设置编辑
        if (state !== 'scan' && state != null) {
            vxeForm?.setFormDisabled(false)
            this.detailTable?.forEach(table => {
                table.setEntityEdit('fullEdit')
            })
        } else {
            vxeForm?.setFormDisabled(true)
            this.detailTable?.forEach(table => {
                table.setEntityEdit('scan')
            })
        }
    }
    //添加一行
    async addModel() {
        //添加一个实体
        const defaultValue = await this.getDefaultModel()
        this.tableData.curRow = defaultValue
        const beforeConfig: runBeforeConfig = {
            methodName: "addModel",//添加行之后处理的事情
            row: defaultValue,//
        }
        this.entityState = 'add'
        this.setEntityEdit("fullEdit")
        await this.getRunAfter(beforeConfig)
    }
    async editModel(getDataConfig: pickKey<getDataConfig>) {
        //编辑当前行
        let _getDataConfig = getDataConfig
        if (_getDataConfig == null && this.entityState == 'edit') {//编辑状态是编辑数据
            const curRow = this.tableData.curRow
            const key = this.getTableInfoKey('key') as string
            const whereObj: whereObj = {
                name: key,
                value: curRow[key],
                displayType: "Equal"
            }
            const getDataObj = { wheres: [whereObj] }
            _getDataConfig = getDataObj
        }
        if (_getDataConfig == null) {
            return Promise.reject('找不到行数据')
        }
        await this.getTableData(getDataConfig)//获取数据相当于编辑当前行了
        this.setEntityEdit('scan')
    }
    async exitPage() {
        await this.getRunBefore('exitEditPage')
        const system = this.system
        const tabKey = this.entityTabKey!
        system.routeClose({ entityName: tabKey })//关闭页签
    }
}

//业务
export const createMainEditEntity = (entityName: string, tableInfo: any = {}) => {
    const entity = reactive(new mainEditEntity(tableInfo, entityName, systemInstance))
    entity.initEntity()
    return entity
}
