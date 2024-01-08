import { tableinfo1 } from "@/api/data"
import { basicEntityItem } from "@/schema/basicEntityItem"
import { basicEntity } from "@/schema/businessTable/basicEntity"
import { getFn } from "@/schema/businessTable/basicEntityFn"
import { contextMenu } from "@/schema/businessTable/contextMenu"
import { detailEntity } from "@/schema/businessTable/detailEntity"
import { mainEditEntity } from "@/schema/businessTable/mainEditEntity"
import { mainEntity } from "@/schema/businessTable/mainEntity"
import { nodeConfig, pageTreeNode } from "@/schema/businessTable/pageTree"
import { column } from "@/schema/column"
import { dialog } from "@/schema/dialog"
import { entityColumn } from "@/schema/entityColumn"
import { formitem } from "@/schema/formitem"
import { input } from "@/schema/input"
import { layoutGrid } from "@/schema/layoutGrid"
import { menu, menuItem } from "@/schema/menu"
import { tabItem } from "@/schema/tabItem"
import { table } from "@/schema/table"
import { MenuProps, SelectProps, TabPaneProps, TabsProps } from "ant-design-vue"
import { CSSProperties } from "ant-design-vue/es/_util/cssinjs/hooks/useStyleRegister"
import { ComputedRef, VNode } from "vue"
import { VxeGridPropTypes, VxeTableProps, VxeInputEvents, VxeInputEmits, VxeGridProps, VxeTableDefines, VxeModalDefines, VxeFormItemProps, VxeFormProps, VxeTableEventProps, VxeColumnProps, VxeInputProps, VxeInputEventProps, VxeInputEvents, VxeButtonProps, VxeButtonEventProps } from "vxe-table"

export type schema = {
  componentType: string
  componentName: string
  children?: schema[]
  styleConfig: styleConfig //样式配置
}

export type styleConfig = {}

export type concatAny<T> = T & { [key: string]: any }

export type componentConfig = {}

// export type StyleType = UnUnique<CSSProperties>
export type StyleType = CSSProperties

export type UnUnique<T> = {
  [key in keyof T]?: T[key]
}

// type x=VxeGridPropTypes
export type tableSchema = concatAny<UnUnique<VxeGridProps>>

export type filterConfig = {
  field: string,
  filterData?: [],//过去的数据
  filterType: 'array' | 'cal'//计算还是数组
  calCondition?: {
    calType: "equal" | '',
    calValue: string | number | Array
  }[]
}
export type mergeConfig = {
  // rowArr?: any[]
  // colArr?: any[]
  [key: string]: {
    rowArr: any[][]
  }
}
export type sortType = 'desc' | 'asc'
export type sortconfig = {
  //排序配置
  field: string,//排序字段
  type: 'desc' | 'asc'
  order: number,//排序的顺序
}

export type tableConfig = {
  refreshData_after?: (table: { table: table, rows: any[] }) => void
  dbCurRowChange?: (value: { row: any, table: table }) => Promise<void> | ((value: { row: any, table: table }) => void)
  baseInfoTable?: any
  checkLabelField?: string,
  globalWhereShow?: boolean
  hiddenCheckbox?: boolean
  curRowChange?: (value: { row: any, table: table }) => Promise<void> | ((value: { row: any, table: table }) => void)
  treeRowField?: string
  globalWhereCloseShow?: boolean
  globalWhereSearchShow?: boolean
  treeTransform?: boolean
  isTree?: boolean,
  treeParentId?: string,
  globalWhere?: string
  limitSize?: number
  showBodyMenuDialog?: boolean,
  showHeaderMenuDialog?: boolean,
  showFilterDialog?: boolean,
  hiddenBorder?: boolean,
  showCheckBoxColumn?: boolean,
  showSeqColumn?: boolean,
  columns: Array<column | columnConfig> = [],
  filterConfig?: filterConfig[],
  mergeConfig?: mergeConfig,
  sortconfig?: sortconfig[]
  rowConfig?: {
    background?: string,
    rowHeight: number,
    // currentEditRow: any[]
  },
  headerConfig?: {
    rowHeight: number
  },
  resizable?: boolean,
  showHeaderFilter?: boolean,
  showHeaderSort?: boolean
  // [key in keyof ]:[]
} & VxeTableProps & VxeTableEventProps
export type tableData = {
  selectRows: any[]
  curMenuRow: any//右键菜单
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
  fnTemplate?: string
  title?: string,
  width?: number
  renderColumn?: any,
  filterPosition?: position
  visible?: boolean
  filterLeft?: number
  field?: string
  filterOptions?: []
  formatFn?: ({ value, column, row }) => any
  filterPulldownShow?: boolean,
  baseInfoTable?: any,
  editType?: string,
  onChange?: (changeConfig: any) => void
  getRowEditType?: (row, col) => string
  options?: Array<{ label: string, value: string }>
  isEdit?: boolean,
  showFilter?: boolean
  showSort?: boolean,
  showFooter?: boolean,
  showHeader?: boolean,//是否显示头部
  editDisable?: (params?: any) => boolean,
  roundType?: roundType
  columnConfig?: columnConfig
}
export type editType = 'select' | 'string' | 'text' | 'number' | 'int' | 'baseInfo' | 'wangEditor'
export type formItemConfig = itemConfig

export type extendColumnConfig = VxeTableDefines.ColumnOptions & columnConfig & {
  renderFormitem?: any
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

export type dialogButton = {
  context?: string
  btnFun: ((dialog: dialog) => Promise<void>) | ((dialog: dialog) => void),//立即执行函数 
  text: string,
}
export type dialogConfig = concatAny<VxeModalDefines.ModalOptions & { dialogPrimaryName?: string, dialogName?: string, instance?: any, hasOpen?: boolean, entity?: basicEntity, modalData?: any, buttons?: dialogButton[] }>//没有modelData


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
export type selectOptions = { value: string, label: string }

export type itemConfig = {
  validate?: ((value: any) => Promise<any>) | null
  defaultValue?: any
  required?: boolean
  range?: boolean
  visible?: boolean,
  columns?: columnConfig[]
  tableConfig?: tableConfig
  formConfig?: formConfig
  isPulldownFocus?: boolean
  type?: string,
  isFocus?: boolean,
  baseInfoTable?: {
    tableData: Array<any>,
    tableName: string,
    columns?: Array<any>//表格的列数据
  },
  options?: selectOptions[],
  layout?: layoutItem,
  disable?: boolean,
  formitems?: itemConfig[],
  placeholder?: string
  itemChange?: (value?: valueChangeParams) => void
} & VxeInputEventProps & VxeFormItemProps

export type formConfig = {
  title?: string
  disabled?: boolean,
  itemWidth?: number,
  items: Array<formitem>
} & layoutConfig & VxeFormProps


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

export type layoutItemConfig = {
  //节点render数据初始化函数 ,固定死的
  renderKey: string//必须填写
  renderFunName?: string,//渲染函数名称,返回一个render数据,的函数名称
  renderComName?: string
  renderFun?: (entity) => any//自定义渲染函数 返回一个虚拟节点
  renderCom?: (entity) => any//都是函数
}
export type layoutItem = {
  nodeName?: string,
  i: string
  , x: number
  , y: number, w: number, h: number,
  layoutItemConfig?: layoutItemConfig,
  component?: any,
  renderKey: string,
  renderFunName: string,
  renderCom?: string
  renderFun?: string,
}
export type layoutConfig = {
  ['onUpdate:layout']?: (value: any) => void
  preventCollision?: boolean
  margin?: number[]
  contextMenuPosition?: position
  layout?: Array<layoutItem>
  colNum?: number,
  rowHeight?: number,
  isDraggable?: boolean,
  isResizable?: boolean,
  useCssTransform?: boolean,
  verticalCompact?: boolean,
  list?: any[]
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

export type confirmType = 'success' | 'warning' | 'error'
export type confirmConfig = {
  type?: confirmType,
  callback?: (dialog: dialog) => Promise<void>,
  cancelCallback?: (dialog: dialog) => Promise<void>,
  message: string,
  title?: string
  height?: number,
  width?: number
}
export type rowState = 'Unchanged' | 'Modified' | 'Deleted' | 'Added'
export type detailTableObj = {
  "keyCodeColumn": string,
  "clsKey": string,
  "keyCode": string,
  "cnName": string,
  "tableName": string,
  "foreignKey": string,
  "needData": boolean,
}
export type Print = {
  "IbillTypeID": string,
  "importTable": string,
  "dataTable": string,
  "dtMain": string,
  "dtDetail": string,
  "detailAddwhere": string,
  "dtDetail2": string,
  "detail2Addwhere": string,
  "dtDetail3": string,
  "detail3Addwhere": string,
  "dtDetail4": string,
  "detail4Addwhere": string,
  "dtDetail5": string,
  "detail5Addwhere": string,
  "Type": string,
}
export type xTableInfo = {
  "key": string,
  "keyCode": string,
  "footer": string,
  "cnName": string,
  "name": string,
  "url": string,
  "sortName": string,
  "sortOrder": string,
  "detailTable"?: detailTableObj[
  ],
  "Print": Print,
  "template": string,
  "paginationRow": number,
  "tableNameAs": string
}

export type mainTableInfo = {
  rowState: rowState,
  table_Id: string,
  parentId: string,
  tableName: string,
  tableTrueName: string,
  tableEntity: string,
  columnCnName: string,
  namespace: string,
  folderName: string,
  dataTableType: string,
  editorType: string,
  orderNo: number,
  uploadField: string,
  uploadMaxCount: string,
  richText: string,
  expressField: string,
  dbServer: string,
  sortName: string,
  detailCnName: string,
  detailName: string,
  enable: string,
  cnName: string,
  iBillTypeID: string,
  cAddWhere: string,
  detail2Name: string,
  detail2CnName: string,
  detail3Name: string,
  detail3CnName: string,
  cGetMainSql: string,
  cMainTableAs: string,
  cOrderBy: string,
  sortOrder: string,
  cKeyColumn: string,
  cCodeColumn: string,
  cPageType: string,
  cClsTableName: string,
  cClsNo: string,
  cParentClsNo: string,
  cClsTableCnName: string,
  cClsKey: string,
  cClsTitle: string,
  tableNote: string,
  xTableInfo: xTableInfo,
  xExtend: Array<() => void>,
  xVueOption: string,
  xTreeMenuData: string,
  cTemplate: string,
  tableColumns: columnObj[],
  detailTable?: mainTableInfo[],
  tableButtons?: tableButton[]
}


export type columnObj = {
  "rowState": rowState,
  "table_Id": string,
  "columnId": string,
  "columnName": string,
  "columnCnName": string,
  "columnType": string,
  "tableName": string,
  "maxlength": string,
  "isNull": string,
  "isRequired": string,
  "isDisplay": string,
  "isKey": string,
  "columnformat": string,
  "script": string,
  "dropNo": string,
  "editTitle": string,
  "isImage": string,
  "sortable": string,
  "columnWidth": string,
  "searchRowNo": string,
  "searchColNo": string,
  "searchOrderNo": string,
  "searchColSize": string,
  "searchTitle": string,
  "searchDropNo": string,
  "searchScope": string,
  "sMultiple": string,
  "sBaseInfoTableName": string,
  "sBaseInfoTableWhere": string,
  "sBaseInfoTreeWhere": string,
  "sBaseInfoData": string,
  "sGetColumnNameSQL": string,
  "sBindField": string,
  "sOperator": string,
  "sCustomSql": string,
  "searchType": string,
  "editOrderNo": string,
  "editRowNo": string,
  "editColNo": string,
  "editType": string,
  "editColSize": string,
  "isReadDataset": string,
  "enable": string,
  "apiInPut": string,
  "apiIsNull": string,
  "apiOutPut": string,
  "createID": string,
  "creator": string,
  "createDate": string,
  "modifyID": string,
  "modifier": string,
  "modifyDate": string,
  "orderNo": string,
  "isColumnData": string,
  "cRelateColumn": string,
  "pagination": string,
  "paginationNo": string,
  "isEditable": string,
  "isEditWrite": string,
  "editTabId": string,
  "editTabName": string,
  "baseInfoTableName": string,
  "baseInfoTableWhere": string,
  "baseInfoTreeWhere": string,
  "baseInfoData": string,
  "getColumnNameSQL": string,
  "isSummaryCol": string,
  "cDefaultValue": string,
  "cCheckRules": string,
  "normalColor": string,
  "cellStyleType": string,
  "reportType": string,
  "renderFun": string,
  "align": string,
  "cFixed": string,
  "cSort": string,
}



export type btnCategory = 'ViewImportGrid' | 'ViewGrid' | 'ViewFormGridEdit' | 'ViewDetailTable' | ''


export type buttonObj = {
  "cButtonID": string,
  "cButtonName": string,
  "cButtonText": string,
  "bShowText": string,
  "cHelpInfo": string,
  "bVisible": string,
  "cPicture": string,
  "iDefKeyType": string,
  "iDefKey1": string,
  "iDefKey2": string,
  "cFunName": string,
  "cBtnCategory": string,
  "cIcon": string,
  "bHidden": string,
  "bDisabled": string,
  "_X_ROW_KEY"
  "checkboxField:string,": string,
  "bOrder": string,
}

export type tableButton = {
  "category": btnCategory,
  "buttons": buttonObj[],
  "tableName": string
}

export type tableButtons = Array<tableButton>
type _menuConfig = {
  itemClick?: (item: menuItem) => void
  collapseAll?: boolean,
  data?: [],
  parentKey?: string,
  vNode?: menuItem,
  rootKey?: string,
  key?: string,
  titleKey?: string,
  inputValue?: string,
  rootTitle?: string,
  showInput?: boolean
}
export type menuConfig = MenuProps & _menuConfig & {
  isDesign?: boolean
  formitems?: formItemConfig[]
}



export type tabConfig = TabsProps & {
  closable?: boolean
  tabItems?: Array<tabItem>
  tabMarginHidden?: boolean
}

export type localStorageValue = {
  token?: string
}

export type inputConfig = VxeInputProps & {
  formConfig?: formConfig,
  tableConfig?: tableConfig
  updateFn?: (value: any) => void
  rangeModelValue?: any[]
  range?: boolean
  formitems?: formitem[]
  itemChange?: (value: any) => void
  field?: string
  baseInfoTable?: any
  isFocus?: boolean
} & VxeInputEventProps & { [key in VxeInputEmits[number]]?: any } & { options?: { key: string, value: string }[] } & SelectProps


export type buttonConfig = VxeButtonProps & { slots?: VxeButtonProps } & VxeButtonEventProps & {
  cButtonText?: string,
  cButtonName?: string
}

export type entityType = 'main' | 'detail' | 'search' | 'edit' | 'import'

export type baseInfoConfig = {
  tableName?: string
}

export type entityGroupConfig = {
  entityGroup?: any[]
} & TabsProps


export type propsConfig = {
  onClick?: (event: MouseEvent) => void,
  style?: StyleType,//
  onContextmenu?: (event: MouseEvent) => void,
  onMousedown?: (event: MouseEvent) => void
  class?: any//类型,
  directive?: Array<Array<Directive>>
  capture?: boolean
}


export type routeOpenConfig = { entityName: string, isEdit?: boolean, path?: string }


export type entityTableConfig = {
  searchFormFields: any
  columns: entityColumn[],
  editItems: formitem[],
  searchItems: formitem[]
}

export type entityState = 'scan' | 'add' | 'edit'//基于crud

export type tabFormConfig = {
  items: formitem[]
}

export type codeEditRender = {
  type: string
}

export type command = {
  uniqueId?: string
  targetEntityName?: string//目标页面
  targetEntityType?: string//目标页面类型
  targetEntityKey?: string
  runFun: (config: { entity: mainEntity | mainEditEntity | detailEntity, [key: string]: any }) => void
}

export type addTableRowConfig = {
  rows: any[],
  num: number,
  insertStatus: boolean
}
export type orderType = 'desc' | 'asc'
export type sortObj = { colName: string, order: orderType }
export enum paramType {
  'sqlType' = 3
}
export type whereObj = {
  name: string,
  value: string | number,
  paramType?: paramType,
  displayType: 'Equal' | 'thanorequal' | 'lessorequal'
}
export type dataSource = 'APS' | 'MRP'
export type getDataConfig = {
  "companyId": string,
  "order": orderType,
  "page": number,
  "rows": number,
  "sort": Array<sortObj>,
  "tableName": "t_SdOrder",
  "wheres": Array<whereObj>,
  "cOperater": string,
  "DBSource": dataSource
}

export type runBeforeConfig = {
  methodName: string,
  table?: basicEntity,
  [key: string]: any
}

export type runAfterConfig = runBeforeConfig
export type alignType = 'left' | 'center' | 'right'

export type fixedType = 'left' | 'right' | null

export type jumpConfig = {
  type?: entityState,
  wheres?: whereObj[]
}

export type curRowConfig = {
  row: any,
  column?: column
  table?: table
}

export type tableKeyType = keyof typeof getFn


export type getDataConfig = {

}

export type detailTableConfig = {
  "keyCodeColumn": string
  "clsKey": string,
  "keyCode": string,
  "cnName": string
  "tableName": string,
  "foreignKey": string,
  "needData": string
}

export type entityDialogConfig = {
  dialogName: string,
  dialogConfig: dialogConfig,
  closeOnDestroy?: boolean,
  dialogKey?: string
}

export type rowChangeType = 'next' | 'pre' | 'first' | 'last'


export type valueChangeParams = {
  data?: any
  table?: table,
  form?: form,
  value?: any,
  inputInstance?: input
}


export type addNodeData = {
  w: number,
  h: number,
  renderKey: string,
  renderFunName: string,
  tableConfig?: tableConfig,
  formConfig?: formConfig
}

export type contextListItem = {
  key: string,
  label: string,
  runFun: (value: contextItemValue) => void
}

export type contextList = Array<contextListItem>

export type contextItemValue = {
  contextMenu: contextMenu,
  item: any
}

export type nodeType = 'form' | 'input' | 'table'

export type entityItemConfig = {
  createConfig?: any
  nodeType?: nodeType
  renderComName?: string
  renderKey: string,
  renderCom: string | ((entityItem: basicEntityItem) => VNode),//
  renderComFun: string | ((entityItem: basicEntityItem) => VNode)
  renderDataFun?: (value1: basicEntity, value2: basicEntityItem) => any
  renderFunName: string,
  instance?: any
} & layoutItem

export type entityInitConfig = {
  entity?: basicEntity,
  entityItem?: basicEntityItem
}


export type tabItemConfig = {
  tabIndex?: number
  renderKey: string,
  renderCom?: string,//渲染组件名称
  renderComName?: string,
  renderFunName?: string,
  instance?: any,
  nodeType?: nodeType,
  createConfig?: any,
  key: string,
  tab: string | (() => VNode),//
  id?: string,
  active?: boolean,
  closable?: boolean,
  disabled?: boolean,
  renderDataFun?: (value: any) => any
  renderComFun?: (value: any) => any
}

export type createFn = {
  createDetailEntity: any,
  createMainEntity: any,
  createDetailEntityGroup: any,
  createButton: any,
  createInput: any,
  createTable: any,
  createMenu: any,
  createTab: any,
  createForm: any,
  form: any,
  table: any,
  input: any,
  menu: any,
  button: any
}