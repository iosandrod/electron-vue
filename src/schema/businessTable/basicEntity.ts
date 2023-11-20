import { Subject } from "rxjs"
import { reactive, h } from "vue"
import { base } from "../base"
import { pageTree } from "./pageTree"
import layoutGridView from "../schemaComponent/layoutGridView"
import { http } from "../http"
export class basicEntity extends base {//其实他也是一个组件
  sub = new Subject()//动作发射器
  http = http
  treeConfig = {}
  entityName = ''
  pageRef = {}
  entityConfig = {
    wheres: [],//query
    entityName: '',
  }
  pageTree?: pageTree//页面树
  renderLayout = {}
  nodeArr: [] = []
  constructor(schema: any, system: any) {
    super(schema, system)
  }
  async initEntity() {
    await this.initNode()
  }
  initComponent() {
    const vNode = () => {
      let pageTree = this.pageTree
      return h(layoutGridView, { pageTree: pageTree })
    }
    this.component = vNode
  }
  initPageTree() {
    const entityConfig = this.schema
  }
  async initNode() {

  }
  async getPageData() {//获取页面数据,与实体相关的
    return []
  }
  async getTableConfig() {

  }
  addItem()//添加一个节点
  { }
}

export const createBasicEntity = async () => {
  // const entity = reactive(new basicEntity())
}
