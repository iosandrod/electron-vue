import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { entityConfig } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"

export class detailEntity extends basicEntity {
  //页面树
  constructor(schema: any, entityName: string, system: any) {
    super(schema, system);
    this.entityName = entityName
  }
  async initEntity(): Promise<void> {//
    this.displayState = 'destroy'
    await super.initEntity()
    await this.initEntityConfig()
    await this.initPageTree()
    this.initComponent()
    this.displayState = 'show'
  }
  async initEntityConfig() {
    const entityConfig = await getTableConfig('t_SdOrder')
    this.tableInfo = entityConfig
  }
  initComponent() {
    super.initComponent()
  }
  async getTableData() { }
  async getTableInfo() {

  }
  async initPageTree() {//初始化树节点
    const schema: any = await getTableInfo('t_SdOrderEntry')
    const renderLayout = this.renderLayout
    renderLayout.isDraggable = computed(() => {
      return this.layoutConfig.isDraggable
    }) as any
    renderLayout.isResizable = computed(() => {
      return this.layoutConfig.isResizable
    }) as any
    renderLayout.useCssTransform = computed(() => {
      return this.layoutConfig.useCssTransform
    }) as any
    renderLayout.verticalCompact = computed(() => {
      return this.layoutConfig.verticalCompact
    }) as any
    const pagetree = createPage(schema.nodeArr, renderLayout)//虚拟子节点 生成树 
    this.pageTree = pagetree as any
  }
}

export const createDetailEntity = (entityName: string, tableInfo: any) => {
  const entity = reactive(new detailEntity(tableInfo, entityName, systemInstance))
  entity.initEntity()
  return entity
}
