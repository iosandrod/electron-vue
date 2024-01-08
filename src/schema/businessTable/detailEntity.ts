import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { StyleType, detailTableConfig, entityConfig, layoutItem } from "@/types/schema"
import { mainEntity } from "./mainEntity"
import { TabPaneProps } from "ant-design-vue"
import { createEntityButton } from "../entityButton"
import { createDetailEntityGroup } from "./detailEntityGroup"
import * as detailExtends from './detailEntityExtend'
export class detailEntity extends basicEntity {
  detailTable: detailEntity[] = []
  renderDetailTab: TabPaneProps = {}

  //页面树
  // mainEntity?: mainEntity
  constructor(entityName: string, schema: any, system: any) {//schema 是entity的数据
    super(schema, system);//外部的数据应该是静态数据
    this.entityType = 'detail'//子表类型
    this.entityName = entityName
    this.tableInfo = schema
    this.detailTableConfig = schema?.detailTableConfig || {}
    this.buttonCategory = 'ViewDetailTable'
    Object.entries(detailExtends).forEach(([key, value]) => {
      this.addExtendMethod(key, value)
    })
  }

  async initEntity() {
    await super.initEntity({ show: false })
    await this.initDetailEntity()
    await this.initDetailTab()
    const mainEntity = this.mainEntity
    if (mainEntity?.entityState != 'scan') {
      this.setEntityEdit('fullEdit')
    }
    this.displayState = 'show'
  }

  async initComponent() {//初始化节点
    await super.initComponent()
  }
  async initDetailTab() {
    const renderDetailTab = this.renderDetailTab
    renderDetailTab.tabKey = this.tableInfo?.tableName
    //@ts-ignore
    renderDetailTab.key = this.tableInfo?.tableName
    renderDetailTab.tab = computed(() => {
      return this.tableInfo?.cnName || '子表'//中文名称
    })
    renderDetailTab.destroyInactiveTabPane = true
    // renderDetailTab
  }
  //@ts-ignore 

  getForeignKey() {
    const mainTable = this.mainEntity
  }
  //子表暂时不需要初始化子表 
}

export const createDetailEntity = (entityName: string, tableInfo: any, mainEntity?: any) => {
  const entity = reactive(new detailEntity(entityName, tableInfo, systemInstance))
  entity.mainEntity = mainEntity
  entity.initEntity()
  return entity
}
