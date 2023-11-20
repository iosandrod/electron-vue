import { h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { entityConfig } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableInfo } from "@/api/httpApi"

export class mainEntity extends basicEntity {
  //页面树
  constructor(schema: any, system: any) {
    super(schema, system);
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
  }
  initComponent() {
    super.initComponent()
  }
  async getTableData() { }
  async getTableInfo() {

  }
  async initPageTree() {
    const schema = await getTableInfo(this)
    const pagetree = createPage(schema.nodeArr)//虚拟子节点 生成树
    this.pageTree = pagetree as any
  }
}

export const createMainEntity = (tableInfo: any) => {
  const entity = reactive(new mainEntity(tableInfo, systemInstance))
  entity.initEntity()
  return entity
}
