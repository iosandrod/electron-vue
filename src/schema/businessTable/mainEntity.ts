import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { entityConfig } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"

export class mainEntity extends basicEntity {
  detailTable: detailEntity[] = []
  //页面树
  constructor(schema: any, entityName: string, system: any) {
    super(schema, system);
    this.entityName = entityName
  }
  async initEntity() {
    await super.initEntity({ show: false })
  }
  initComponent() {//初始化节点
    super.initComponent()
  }
  async initDetailEntity() {
    const schema = this.schema
    const detailTable: [] = schema.detailTable || []//子表 是一个数组
    const detaialEntity = detailTable.map(table => {
      // return createDetailEntity('t_SdOrderEntry')
    })
  }
}

export const createMainEntity = (entityName: string, tableInfo: any) => {
  const entity = reactive(new mainEntity(tableInfo, entityName, systemInstance))
  entity.initEntity()
  return entity
}
