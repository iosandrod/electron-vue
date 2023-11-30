import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { entityConfig, layoutItem } from "@/types/schema"
import { mainEntity } from "./mainEntity"

export class detailEntity extends basicEntity {
  detailTable: detailEntity[] = []
  //页面树
  mainEntity?: mainEntity
  constructor(entityName: string, schema: any, system: any) {//schema 是entity的数据
    super(schema, system);//外部的数据应该是静态数据
    this.entityName = entityName
    this.tableInfo = schema
  }
  async initEntity() {
    await super.initEntity({ show: false })
    await this.initDetailEntity()
    this.displayState = 'show'
  }
  async initComponent() {//初始化节点
    await super.initComponent()
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
