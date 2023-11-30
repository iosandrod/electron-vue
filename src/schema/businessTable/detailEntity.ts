import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { entityConfig, layoutItem } from "@/types/schema"
import { mainEntity } from "./mainEntity"
import { TabPaneProps } from "ant-design-vue"

export class detailEntity extends basicEntity {
  detailTable: detailEntity[] = []
  renderDetailTab: TabPaneProps = {}
  //页面树
  mainEntity?: mainEntity
  constructor(entityName: string, schema: any, system: any) {//schema 是entity的数据
    super(schema, system);//外部的数据应该是静态数据
    this.entityType = 'detail'//子表类型
    this.entityName = entityName
    this.tableInfo = schema
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
  //子表暂时不需要初始化子表
  async initDetailEntity() {
    // const schema = this.schema
    // const originTableInfo = this.originTableInfo
    // const tableInfo = this.tableInfo
    // const detailTable: [] = schema.detailTable || []//子表 是一个数组
    // const detaialEntity = detailTable.map(table => {
    // return createDetailEntity('t_SdOrderEntry')
    // })
  }
}

export const createDetailEntity = (entityName: string, tableInfo: any) => {
  const entity = reactive(new detailEntity(entityName, tableInfo, systemInstance))
  entity.initEntity()
  return entity
}
