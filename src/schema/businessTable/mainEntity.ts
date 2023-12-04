import { computed, h, reactive, vShow, } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"
import { entityConfig, layoutItem } from "@/types/schema"
import { createPage } from "./pageTree"
import { getTableConfig, getTableInfo } from "@/api/httpApi"
import { createDetailEntity, detailEntity } from "./detailEntity"

export class mainEntity extends basicEntity {
  //页面树
  constructor(schema: any, entityName: string, system: any) {//schema 是entity的数据

    super(schema, system);//外部的数据应该是静态数据
    this.entityName = entityName
    this.buttonCategory = 'ViewGrid'
  }
  async initEntity() {
    await super.initEntity({ show: false })
    await this.initDetailEntity()
    this.displayState = 'show'
  }
  async initComponent() {//初始化节点
    await super.initComponent()
  }
  //初始化子表数据
  async initDetailEntity() {
    // const tableInfo = this.tableInfo
    // const detailTable = tableInfo?.detailTable! || []
    // const detailEntity = await Promise.all(detailTable.map(async (table) => {
    //   const dTable = await createDetailEntity(table.tableName, table)//表名
    //   dTable.mainEntity = this as any
    //   return dTable
    // }))
    // this.detailTable = detailEntity as any//业务逻辑类型的子组件
    // this.detailEntityConfig.curDetailKey = this.detailTable?.[0]?.tableInfo?.tableName || ''
  }
  getMainEntity() {
    return this
  }
}

//业务
export const createMainEntity = (entityName: string, tableInfo: any) => {
  const entity = reactive(new mainEntity(tableInfo, entityName, systemInstance))
  entity.initEntity()
  return entity
}
