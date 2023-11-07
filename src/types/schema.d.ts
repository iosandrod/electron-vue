import { column } from "@/schema/column"
import { dialog } from "@/schema/dialog"
import { ComputedRef, VNode } from "vue"
import { VxeGridPropTypes, VxeTableProps, VxeGridProps, VxeTableDefines, VxeModalDefines } from "vxe-table"

export type schema = {
  componentType: string
  componentName: string
  children?: schema[]
  styleConfig: styleConfig //样式配置
}

export type styleConfig = {}

export type concatAny<T> = T & { [key: string]: any }

export type componentConfig = {}

export type StyleType = UnUnique<CSSStyleDeclaration>

export type UnUnique<T> = {
  [key in keyof T]?: T[key]
}

// type x=VxeGridPropTypes
export type tableSchema = concatAny<UnUnique<VxeGridProps>>

export type filterConfig = {}
export type mergeConfig = {
  row: any,
  field: string,
  mergeSpan: number//合并多少个
}
export type tableConfig = {
  columns: column[]
  filterConfig: filterConfig[],
  mergeConfig: mergeConfig[],
  rowConfig: {
    rowHeight: string,
    currentEditRow: any[]
  },
  headerConfig: {
    rowHeight: string
  },
  // [key in keyof ]:[]
} & VxeTableProps
export type tableData = {
  data: any[],
  showData: any[],
  curRow: any,
  curColumn?: column,
  curFilterColumn?: column
}
export type columnConfig = {
  isEdit: boolean,
}

export type pickRef<T = any> = {
  [key in keyof T]: ComputedRef<T[key]> | T[key]
}


export type mergeType<T = any, R = any> = {
  [key in keyof T & keyof R]: T[key] & R[key]
}

export type pickKey<T = any> = {
  [key in keyof T]?: T[key]
}


export type dialogConfig = concatAny<VxeModalDefines.ModalOptions & { dialogPrimaryName?: string, hasOpen?: boolean, modalData: any }>


export type dialogComponent = {
  header?: (dialog: dialog) => VNode | ((vNodeArr?: []) => VNode),
  default?: (dialog: dialog) => VNode | ((vNodeArr?: []) => VNode),
  footer?: (dialog: dialog) => VNode | ((vNodeArr?: []) => VNode),
  corner?: (dialog: dialog) => VNode | ((vNodeArr?: []) => VNode)
}

