import { StyleType, componentConfig, concatAny, displayState, schema } from "@/types/schema"
import { system } from "./system"
// import * as Rx from "rxjs"
import { ShallowRef, VNode, computed, h, shallowRef } from "vue"
import XEUtils from "xe-utils"

export class base<T = any> {
  uniqueId: string = ''
  system: system
  comopnentConfig?: concatAny<componentConfig>
  componentType?: string
  componentName?: string
  schema?: concatAny<T> = {} as any
  pageRef: any = {}
  effectPool: any = {}//作用域
  context?: any = {}
  displayState: displayState = 'show'
  component?: (props?: any) => VNode | null | (() => any) = () => null
  constructor(system: system, schema?: any, context?: any) {
    this.system = system
    this.schema = schema
    this.context = context
    this.uniqueId = XEUtils.uniqueId()
  }
  initBase() { }
  initComponent() { }
  getBaseStyle() {
    return computed(() => {
      const style: StyleType = {}
      return style
    })
  }
}
