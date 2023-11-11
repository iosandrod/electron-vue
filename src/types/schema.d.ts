import { column } from "@/schema/column"
import { dialog } from "@/schema/dialog"
import { formitem } from "@/schema/formitem"
import { table } from "@/schema/table"
import { SelectProps } from "ant-design-vue"
import { ComputedRef, VNode } from "vue"
import { VxeGridPropTypes, VxeTableProps, VxeGridProps, VxeTableDefines, VxeModalDefines, VxeFormItemProps, VxeFormProps } from "vxe-table"

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
  hiddenBorder?: boolean
  showCheckBoxColumn: boolean,
  showSeqColumn: boolean,
  columns: extendColumnConfig[]
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
  isEdit?: boolean,
  showFilter?: boolean
  showSort?: boolean,
  showHeader?: boolean,//是否显示头部
  editConfig?: formItemConfig
}

export type formItemConfig = {

}

export type extendColumnConfig = VxeTableDefines.ColumnOptions & columnConfig


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
  header?: (dialog: dialog) => VNode | ((vNodeArr?: [] | VNode) => VNode),
  default?: (dialog: dialog) => VNode | ((vNodeArr?: [] | VNode) => VNode),
  footer?: (dialog: dialog) => VNode | ((vNodeArr?: [] | VNode) => VNode),
  corner?: (dialog: dialog) => VNode | ((vNodeArr?: [] | VNode) => VNode)
}



export type position = {
  left: number,
  top: number
}

export type itemConfig = VxeFormItemProps & {
  type?: string
}

export type formConfig = VxeFormProps & {
  items: formitem[]
}


export type selectConfig = pickKey<SelectProps & {
  column?: column,//列
  table?: table,//表格
  modalValue?: string
}>


