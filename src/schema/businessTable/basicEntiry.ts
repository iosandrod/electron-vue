import { Subject } from "rxjs"

export class basicEntity {
  sub = new Subject()//动作发射器
  pageRef = {}
  entityConfig = {
    wheres: [],//query
    entityName: '',
  }
  constructor() { }
  async getPageData() {

  }
  async getTableConfig() {

  }
}

export function createBasicEntity() { }
