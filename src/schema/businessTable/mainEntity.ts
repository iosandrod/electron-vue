import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { StyleType, displayState, entityConfig, layoutItem, routeOpenConfig, command } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"
import { base } from "../base"
import { createDetailEntityGroup } from "./detailEntityGroup"
// import mainEntityMethod from ''
import * as mainMethod from '@/entityMethods/mainTableMethods'
import * as mainEntityExtend from './mainEntityExtend'

export class mainEntity extends basicEntity {
  //页面树

  constructor(schema: any, entityName: string, system: any) {//schema 是entity的数据
    //schema是配置
    super(schema, system);//外部的数据应该是静态数据
    this.entityName = entityName
    this.entityType = 'main'
    this.entityState = 'scan'//扫描状态
    this.buttonCategory = 'ViewGrid'
    this.buttonMethod = mainMethod
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

  //跳转当前路由表的编辑页面
  jumpToEditPage() {
    const _this = this
    const system = _this.system
    const openConfig: routeOpenConfig = {
      entityName: _this.entityName,
      isEdit: true
    }
    const command: command = {
      targetEntityName: this.entityName,
      targetEntityType: 'edit',
      runFun: (entity) => {
        console.log(entity, 'testEntity')
      }
    }
    system.addCommand(command)
    system.routeOpen(openConfig)
  }
}

//业务
export const createMainEntity = (entityName: string, tableInfo: any = {}) => {
  const entity = reactive(new mainEntity(tableInfo, entityName, systemInstance))
  entity.initEntity()
  return entity
}
