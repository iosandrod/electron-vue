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
  getForeignKey() {
    const mainTable = this.mainEntity
  }
  //子表暂时不需要初始化子表
}

export const createDetailEntity = (entityName: string, tableInfo: any) => {
  const entity = reactive(new detailEntity(entityName, tableInfo, systemInstance))
  entity.initEntity()
  return entity
}
