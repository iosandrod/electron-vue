import { StyleType, componentConfig, concatAny, schema } from "@/types/schema"
import { system } from "./system"
// import * as Rx from "rxjs"
import { ShallowRef, VNode, computed, h, shallowRef } from "vue"

export class base<T = any> {
  system: system
  comopnentConfig?: concatAny<componentConfig>
  componentType?: string
  componentName?: string
  schema?: concatAny<T> = {} as any
  pageRef: any = {}
  effectPool: any = {}//作用域
  context?: any = {}
  component?: () => VNode
  constructor(system: system, schema?: any, context?: any) {
    this.system = system
    this.schema = schema
    this.context = context
  }
  async initBase() { }
  async initComponent() { }
  getBaseStyle() {
    return computed(() => {
      const style: StyleType = {}
      return style
    })
  }
}
