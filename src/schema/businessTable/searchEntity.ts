import { reactive } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"

export class searchEntity extends basicEntity {
  constructor(schema: any, system: any) {
    super(schema, system)
  }
}

export function createSearchEntity(schema: any) {
  const _searchEntity = reactive(new searchEntity(schema, systemInstance))
  _searchEntity.initEntityConfig()
  return _searchEntity
}
