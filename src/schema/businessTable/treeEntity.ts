import { reactive } from "vue"
import { basicEntity } from "./basicEntity"
import { systemInstance } from "../system"

export class treeEntity extends basicEntity {
  constructor(schema: any, system: any) {
    super(schema, system)
  }
}

export function createTreeEntity(schema: any) {
  const tree = reactive(new treeEntity(schema, systemInstance))
}
