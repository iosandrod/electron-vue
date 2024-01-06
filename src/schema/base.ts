import { StyleType, componentConfig, concatAny, displayState, schema } from "@/types/schema"
import { system } from "./system"
// import * as Rx from "rxjs"
import { ShallowRef, VNode, computed, h, shallowRef } from "vue"
import * as vue from 'vue'
import XEUtils from "xe-utils"
export class base<T = any> {
  uniqueId: string = ''
  system: system
  vue?: typeof vue
  loadingState = false//加载中配置
  comopnentConfig?: concatAny<componentConfig>
  componentType?: string
  componentName?: string
  schema?: concatAny<T> = {} as any
  pageRef: any = {}
  format = {
    // formatFuntion:
  }
  effectPool: any = {}//作用域
  context?: any = {}
  displayState: displayState = 'show'
  component?: (props?: any) => VNode | null | (() => any) = () => null
  constructor(system: system, schema?: any, context?: any) {
    this.vue = shallowRef(vue) as any
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
