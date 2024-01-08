import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { StyleType, displayState, entityConfig, layoutItem, routeOpenConfig, command, jumpConfig, whereObj, paramType, dialogConfig, curRowConfig } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"
import { base } from "../base"
import { createDetailEntityGroup } from "./detailEntityGroup"

// import mainEntityMethod from ''
import * as mainMethod from '@/entityMethods/mainTableMethods'
import * as mainEntityExtend from './mainEntityExtend'
import { createMainEditEntity, mainEditEntity } from "./mainEditEntity"
import { createDialog } from "../dialog"
import { detailAddForm } from "./basicEntityData"

export class mainEntity extends basicEntity {
  //页面树

  constructor(schema: any, entityName: string, system: any) {//schema 是entity的数据
    //schema是配置
    super(schema, system);//外部的数据应该是静态数据
    this.entityName = entityName
    this.entityType = 'main'
    this.entityState = 'scan'//扫描状态
    this.buttonCategory = 'ViewGrid'
    this.buttonMethod = mainMethod//静态数据
    Object.entries(mainEntityExtend).forEach(([key, value]) => {
      this.addExtendMethod(key, value)
    })
  }
  async initEntity() {
    try {
      await super.initEntity({ show: false })
      await this.initRenderSearchForm()
      await this.initRenderSearchDialog()
      this.displayState = 'show'
      setTimeout(() => {
        this.getTableData()
      }, 1000);
    } catch (error) {
      console.error(error)
    }
  }
  async initComponent() {//初始化节点
    await super.initComponent()
  }
  //初始化子表数据 
  getMainEntity() {
    return this
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
  //初始化默认实体数据
  initDefaultEntity() {

  }
  openDialogEditPage(openConfig: jumpConfig = { type: "add" }) {
    //构建编辑实例
    const _this = this
    const entityName = _this.entityName
    if (this.pageRef.editEntity == null) {
      this.pageRef.editEntity = createMainEditEntity(entityName) as any
    }
    let editDialog = this.pageRef.editEntityDialog!
    if (editDialog == null) {
      const editEntity = this.pageRef.editEntity
      editDialog = createDialog('editEntity', { height: 400, width: 600, instance: editEntity }) as any
      this.pageRef.editEntityDialog = editDialog as any//弹框
    }
    editDialog.open()
  }
  async dbCurRowChange(config: curRowConfig) {
    const _this = this
    _this.jumpToEditPage({ type: 'edit' })
  }
  //跳转当前路由表的编辑页面
  jumpToEditPage(jumpConfig: jumpConfig = { type: 'add' }) {//跳转到编辑页面
    const _this = this
    const system = _this.system
    const openConfig: routeOpenConfig = {
      entityName: _this.entityName,
      isEdit: true
    }
    const type = jumpConfig.type
    let curRow = _this.getCurRow()
    const tableKey = _this.getTableInfoKey('key') as string
    const whereObjArr: whereObj[] = [{
      name: tableKey,
      value: curRow?.[tableKey],
      displayType: "Equal"
    }]
    if (type == 'edit' && curRow == null) {
      return Promise.reject("主表没有当前行")
    }
    const command: command = {
      targetEntityName: this.entityName,
      targetEntityType: 'edit',
      runFun: async (command) => {
        const _entity: mainEditEntity = command.entity as any
        if (type == 'add') {
          await _entity.addModel()
        } else if (type == 'edit') {
          await _entity.editModel({ wheres: whereObjArr })
        }
      }
    }
    system.routeOpen(openConfig)
    const editEntityId = _this.getMainEditEntity().uniqueId
    command.uniqueId = editEntityId
    system.addCommand(command)
  }
  getMainEditEntity() {
    const _this = this
    const system = _this.system
    const entityPool = system.entityVetor
    const entityNameEdit = `${this.entityName}_edit`
    const editEntity = entityPool[entityNameEdit]
    return editEntity
  }

}

//业务
export const createMainEntity = (entityName: string, tableInfo: any = {}) => {
  const entity = reactive(new mainEntity(tableInfo, entityName, systemInstance))
  entity.initEntity()
  return entity
}
