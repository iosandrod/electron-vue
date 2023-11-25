import { tableinfo1 } from "@/api/data"
import { detailEntity } from "@/schema/businessTable/detailEntity"
import { nodeConfig, pageTreeNode } from "@/schema/businessTable/pageTree"
import { column } from "@/schema/column"
import { dialog } from "@/schema/dialog"
import { formitem } from "@/schema/formitem"
import { layoutGrid } from "@/schema/layoutGrid"
import { table } from "@/schema/table"
import { SelectProps } from "ant-design-vue"
import { ComputedRef, VNode } from "vue"
import { VxeGridPropTypes, VxeTableProps, VxeGridProps, VxeTableDefines, VxeModalDefines, VxeFormItemProps, VxeFormProps, VxeTableEventProps, VxeColumnProps } from "vxe-table"

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
  limitSize?: number
  showBodyMenuDialog?: boolean,
  showHeaderMenuDialog?: boolean,
  showFilterDialog?: boolean,
  hiddenBorder?: boolean,
  showCheckBoxColumn?: boolean,
  showSeqColumn?: boolean,
  columns: extendColumnConfig[] = [],
  filterConfig?: filterConfig[],
  mergeConfig?: mergeConfig[],
  rowConfig?: {
    background?: string,
    rowHeight: number,
    // currentEditRow: any[]
  },
  headerConfig?: {
    rowHeight: string
  },
  resizable?: boolean,
  showHeaderFilter?: boolean,
  showHeaderSort?: boolean
  // [key in keyof ]:[]
} & VxeTableProps & VxeTableEventProps
export type tableData = {
  data: any[],
  editData: any[]
  showData: any[],
  curRow: any,
  curColumn?: column,
  curFilterColumn?: column
}

export type roundType = {
  iRoundAmout?: number
  iRoundInt?: number
  iRoundInvRate?: number
  iRoundNorQty?: number
  iRoundNum?: number
  iRoundPersent?: number
  iRoundQty?: number
  iRoundUnitPrice?: number
}

export type columnConfig = {
  filterOptions?: []
  formatFn?: ({ value, column, row }) => any
  filterPulldownShow?: boolean,
  baseInfoTable?: any,
  editType?: boolean,
  options?: Array<{ label: string, value: string }>
  isEdit?: boolean,
  showFilter?: boolean
  showSort?: boolean,
  showFooter?: boolean,
  showHeader?: boolean,//是否显示头部
  editDisable?: (params?: any) => boolean,
  roundType?: roundType
}

export type formItemConfig = itemConfig

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
  isPulldownFocus?: boolean
  type?: string,
  isFocus: boolean,
  baseInfoTable?: {
    tableData: Array<any>,
    tableName: string,
    columns?: Array<any>//表格的列数据
  },
  options?: [],
  layout?: layoutItem
}

export type formConfig = VxeFormProps & {
  items: formitem[]
}


export type selectConfig = pickKey<SelectProps & {
  column?: column,//列
  table?: table,//表格
  modalValue?: string
}>


export type openDialogConfig = {
  key: string,
  position?: position
}


export type dialogMap = {
  filterDialog?: string,
  headerMenuDialog?: string,
  bodyMenuDialog?: string
}


export type layoutChildren = Array<pageTreeNode>
export type layoutItem = {
  nodeName?: string,
  i: string
  , x: number
  , y: number, w: number, h: number
}
export type layoutConfig = {
  layout?: Array<layoutItem>
  colNum?: number,
  rowHeight?: number,
  isDraggable?: boolean,
  isResizable?: boolean,
  useCssTransform?: boolean,
  verticalCompact?: boolean
}

//一个或者多个
type tableState = 'fullEdit' | 'singleRowEdit' | 'moreRowEdit' | 'scan' | ''



// export type entityConfig = {
//   columns: Array<VxeColumnProps>
//   detailEntity?: Array<detailEntity>
//   tableName?: string
//   pageNode?: Array<nodeConfig>//节点数据
// }

export type displayState = 'show' | 'hidden' | 'destroy'

export type scrollConfig = {
  scrollLeft: number,
  scrollWidth: number,
  scrollTop: number,
  bodyHeight?: number,
  bodyWidth?: number
}


export type entityConfig = typeof tableinfo1