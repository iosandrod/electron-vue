import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { entityConfig, layoutItem } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"

export class mainEntity extends basicEntity {
  detailTable: detailEntity[] = []
  //页面树

  constructor(schema: any, entityName: string, system: any) {//schema 是entity的数据

    super(schema, system);//外部的数据应该是静态数据
    /* 
        如何描述这种数据呢,layout:[{
          x,y,h,w,i,slot:? 或者是什么
        }]
     */
    this.entityName = entityName
  }
  async initEntity() {
    await super.initEntity({ show: false })
    await this.initDetailEntity()
    this.displayState = 'show'
  }
  async initComponent() {//初始化节点
    await super.initComponent()
  }
  async initDetailEntity() {
    const schema = this.schema
    const originTableInfo = this.originTableInfo
    debugger
    // const detailTable: [] = schema.detailTable || []//子表 是一个数组
    // const detaialEntity = detailTable.map(table => {
    // return createDetailEntity('t_SdOrderEntry')
    // })
  }
}

export const createMainEntity = (entityName: string, tableInfo: any) => {
  const entity = reactive(new mainEntity(tableInfo, entityName, systemInstance))
  entity.initEntity()
  return entity
}
