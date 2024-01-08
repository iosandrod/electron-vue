
//@ts-nocheck
import { basicEntity } from "@/schema/businessTable/basicEntity";
import { http } from "@/schema/http";
import { layoutItem, layoutItemConfig, mainTableInfo } from "@/types/schema";
import { tableData, tableInfo, tableinfo1 } from "./data";
import { table } from "@/schema/table";
import XEUtils from "xe-utils";
import { _columns, _columns1 } from "@/schema/entityColumn";
import { formatTableInfo } from "@/utils/utils";
import { mainEntity } from "@/schema/businessTable/mainEntity";
export const getTableInfo = async (entity?: basicEntity) => {

}
export const typeNode = {
    main: [
        {
            x: 0, y: 0, h: 40, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件
                renderFunName: 'initRenderButtonGroup',//数据初始化函数
            } as layoutItemConfig,
            renderKey: 'buttonGroup',
            renderComName: "instanceView",//组件
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        },
        {
            x: 0, y: 4, h: 300, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件
                renderFunName: 'initRenderTable',//数据初始化函数
            } as layoutItemConfig,
            renderKey: 'vxeGrid',
            renderComName: "instanceView",//组件
            renderFunName: 'initRenderTable',//数据初始化函数
        },
        {
            x: 0, y: 34, h: 400, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                // renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
                renderComName: "instanceView",
                renderFunName: "initRenderDetailEntity",
            } as layoutItemConfig,
            renderKey: 'dEntityInstance',
            renderComName: "instanceView",
            renderFunName: "initRenderDetailEntity",
        },
        // {
        //     x: 0, y: 4, h: 30, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "formView",//组件
        //         renderFunName: 'initRenderEditForm',//数据初始化函数 初始化编辑的表单的
        //     } as layoutItemConfig,
        // },
    ],
    detail: [
        // {
        //     x: 0, y: 0, h: 4, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "buttonGroupView",//组件
        //         renderFunName: 'initRenderButtonGroup',//数据初始化函数
        //     } as layoutItemConfig,
        // },
        // {
        //     x: 0, y: 4, h: 30, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "tableView",//组件
        //         renderFunName: 'initRenderTable',//数据初始化函数
        //     } as layoutItemConfig,
        // },
        {
            x: 0, y: 0, h: 40, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件
                renderFunName: 'initRenderButtonGroup',//数据初始化函数
            } as layoutItemConfig,
            renderKey: 'buttonGroup',
            renderComName: "instanceView",//组件
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        },
        {
            x: 0, y: 4, h: 300, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件
                renderFunName: 'initRenderTable',//数据初始化函数 
            } as layoutItemConfig,
            renderKey: 'vxeGrid',
            renderComName: "instanceView",//组件
            renderFunName: 'initRenderTable',//数据初始化函数 
        },
    ],
    search: [
        {
            x: 0, y: 0, h: 40, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "buttonGroupView",//组件
                renderFunName: 'initRenderButtonGroup',//数据初始化函数
            } as layoutItemConfig,
            renderComName: "buttonGroupView",//组件
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        },
        {
            x: 0, y: 4, h: 300, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "tableView",//组件
                renderFunName: 'initRenderTable',//数据初始化函数
            } as layoutItemConfig,
            renderComName: "tableView",//组件
            renderFunName: 'initRenderTable',//数据初始化函数
        },
        {
            x: 0, y: 34, h: 350, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
                renderFunName: "initRenderDetailEntity",
            } as layoutItemConfig,
            renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
            renderFunName: "initRenderDetailEntity",
        },
    ],
    edit: [
        {
            x: 0, y: 0, h: 40, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件 
                renderFunName: 'initRenderButtonGroup',//数据初始化函数
            } as layoutItemConfig,
            renderKey: 'buttonGroup',
            renderComName: "instanceView",//组件 
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        },
        {
            x: 0, y: 4, h: 300, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件
                renderFunName: 'initRenderEditForm',//数据初始化函数 初始化编辑的表单的
            } as layoutItemConfig,
            renderKey: "vxeForm",
            renderComName: "instanceView",//组件
            renderFunName: 'initRenderEditForm',//数据初始化函数 初始化编辑的表单的
        },
        {
            x: 0, y: 34, h: 350, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件,一般这种呢都是固定死的
                renderFunName: "initRenderDetailEntity",
            } as layoutItemConfig,
            renderKey: "dEntityInstance",
            renderComName: "instanceView",//组件,一般这种呢都是固定死的
            renderFunName: "initRenderDetailEntity",
        },
    ],
    import: [

    ]
}

export const getEntityConfig = async (entityType) => {
    let _itemArr = JSON.parse(JSON.stringify(typeNode[entityType]))
    return _itemArr
    // return []
}

export const getDetailTableInfo = async (entity: any) => {
    const itemArr: layoutItem = [{
        x: 0, y: 0, h: 4, w: 24, layoutItemConfig: {
            renderComName: "tableView",//组件
            renderFunName: 'initRenderTable'//数据初始化函数
        } as layoutItemConfig,
    }]
    return itemArr
}

const runFun = async function getOrderData() {
    let _this = this
    let body = _this.getReqBody()
    let requestData = body.requestData
    let axiosInstance = _this.getAxiosInstance('default')
    let tableName = requestData.tableName
    let companyId = requestData.companyId
    let Authorization = requestData.Authorization
    let url = `/api/builder/LoadTableInfo?tableName=${tableName}`
    let config = {
        headers: {
            CompanyId: companyId,
            Authorization: Authorization
        }
    }
    let result = await axiosInstance.post(url, {}, config)
    return result
}
export const getTableConfig = async (tableName?: string, origin = false) => {//获取配置
    try {
        const tableInfo = await http.postZkapsApi(`/api/builder/LoadTableInfo?tableName=${tableName}&bDesign=1`)
        const _tableInfo = tableInfo.data
        const _info = await formatTableInfo(_tableInfo) as mainTableInfo
        const xTableInfo = _info.xTableInfo//
        const detailTable = xTableInfo?.detailTable || []
        const _detailTable = await Promise.all(detailTable?.map(async (table) => {
            let _config = await getTableConfig(table.tableName)
            _config.detailTableConfig = table
            _config.tableButtons = JSON.parse(JSON.stringify(_info.tableButtons))
            return _config
        }))//子表配置
        _info.detailTable = _detailTable
        return _info
    } catch (error) {
        console.log(error)
    }
}



export const getTableData = async (entity: basicEntity) => {
    const tableInfo = entity.tableInfo
    const system = entity.system
    const systemConfig = system.systemConfig
    const companyId = systemConfig.companyConfig.companyId
    const order = tableInfo?.sortOrder || 'desc'
    const colName = tableInfo?.sortName || tableInfo?.tableColumns.find(col => col.isKey == true)?.columnName || ''
    const page = 1
    const rows = 100
    const tableName = tableInfo?.tableName
    let TableEntity = 't_PubEntry'
    const params = {
        companyId,
        order,
        page,
        rows,
        sort: [
            {
                colName,
                order
            }
        ],
        tableName,
        wheres: []
    }
    const url = `/api/${TableEntity}/getPageData`
    return { url, params }
}




export const getDeleteModel = async (_this: basicEntity, code?: string) => {
    const clsKey = _this.getTableInfoKey('key')
    const keyCode = _this.getTableInfoKey("keyCode")
    let operateUser = _this.utils.constant.operator
    let userName = _this.getTableInfoKey("userName")
    let _table = _this.getTableInfoKey("xTableInfo")
    let billTypeID = _this.getTableInfoKey('billTypeID')
    let tableEntity = _this.getTableInfoKey("tableEntity")
    let realTableName = _this.getTableInfoKey('realTableName')
    tableEntity = tableEntity || realTableName
    let url = `/api/${tableEntity}/Delete`
    let curRow = _this.getTableInfoKey('curRow')
    let cVouchType = _this.getTableInfoKey('cVouchType')
    curRow = JSON.parse(JSON.stringify(curRow))
    let saveModel = curRow
    let companyId = _this.getTableInfoKey("companyId")
    const dbServer = _this.getTableInfoKey("dbServer")
    _this.tableConfig.columns.forEach(col => {
        col.formatSaveData(curRow)
    })
    let detailTableData = _this.detailTable?.map(table => {
        let deleteBill = table.getTableInfoKey('deleteBill')
        if (deleteBill == false) {
            return null
        }
        return table.getTableInfoKey("realTableName")
    }).filter(row => row != null).join(',')
    let params = {
        mainData: saveModel,
        table: _table,
        detailData: [],
        companyId: companyId,
        tableName: realTableName,
        cVouchType: cVouchType,
        iInterID: saveModel[clsKey],
        DelKeys: [],
        cBillCode: saveModel[keyCode],
        cMainPrimaryCol: clsKey,
        sSqlsList: [], //保存后执行SQL,同一事务
        sSqlBefore: [], //保存前执行SQL,同一事务
        cFlag: '1',
        cOperater: userName,
        DBSource: dbServer,   //第三方数据库链接
        cDetailTables: detailTableData //'t_WorkOrderEntry,t_WorkOrderRoute,t_WorkOrderResource'
    }
    return { url, params }
}


export const getAuditCurRow = (_this: mainEntity) => {
    let type = '1'
    let data = _this.getTableInfoKey('selectRows')
    let curRow = _this.getTableInfoKey("curRow")
    let _data = data
    if (_data.length == 0) {
        _data = [curRow]
    }
    let tableKey = _this.getTableInfoKey("key")
    let IbillTypeID = _this.getTableInfoKey("billTypeID")
    let realTableName = _this.getTableInfoKey("realTableName")
    let userAccount = _this.getTableInfoKey("userName")
    const currentDate = _this.getTableInfoKey("currentDate")
    const keyCode = _this.getTableInfoKey('keyCode')
    let postData = _data.map((row) => {
        let obj = [
            {
                name: 'iInterID',
                value: row[tableKey]
            }, //主键ID
            {
                name: 'cVouchType',
                value: IbillTypeID
            }, //单据类型
            {
                name: 'cMainTableName',
                value: realTableName
            }, //对应表名
            {
                name: 'cMainPrimaryCol',
                value: tableKey
            }, //主键子段
            {
                name: 'cFlag',
                value: type
            },
            {
                name: 'cChecker',
                value: userAccount
            },
            {
                name: 'dCheckDate',
                value: currentDate
            },
            {
                name: 'cBillCode',
                value: row[keyCode]
            },
            {
                name: 'iAuditTypeID',
                value: row.iAuditTypeID || -1
            },
            {
                name: 'AuditStatus',
                // value: AuditStatus || ''
                value: ''
            },
            {
                name: 'AuditResult',
                value: ''
            }
        ]
        return obj
    })
    let url = `/api/Sys_Role/ExecuteAudit`
    let params = postData
    return {
        url,
        params
    }
}

export const getUnAuditCurRow = (_this: mainEntity) => {
    let type = '0'
    let data = _this.getTableInfoKey('selectRows')
    let curRow = _this.getTableInfoKey("curRow")
    let _data = data
    if (_data.length == 0) {
        _data = [curRow]
    }
    let tableKey = _this.getTableInfoKey("key")
    let IbillTypeID = _this.getTableInfoKey("billTypeID")
    let realTableName = _this.getTableInfoKey("realTableName")
    let userAccount = _this.getTableInfoKey("userName")
    const currentDate = _this.getTableInfoKey("currentDate")
    const keyCode = _this.getTableInfoKey('keyCode')
    let postData = _data.map((row) => {
        let obj = [
            {
                name: 'iInterID',
                value: row[tableKey]
            }, //主键ID
            {
                name: 'cVouchType',
                value: IbillTypeID
            }, //单据类型
            {
                name: 'cMainTableName',
                value: realTableName
            }, //对应表名
            {
                name: 'cMainPrimaryCol',
                value: tableKey
            }, //主键子段
            {
                name: 'cFlag',
                value: type
            },
            {
                name: 'cChecker',
                value: userAccount
            },
            {
                name: 'dCheckDate',
                value: currentDate
            },
            {
                name: 'cBillCode',
                value: row[keyCode]
            },
            {
                name: 'iAuditTypeID',
                value: row.iAuditTypeID || -1
            },
            {
                name: 'AuditStatus',
                // value: AuditStatus || ''
                value: ''
            },
            {
                name: 'AuditResult',
                value: ''
            }
        ]
        return obj
    })
    let url = `/api/Sys_Role/ExecuteAudit`
    let params = postData
    return {
        url,
        params
    }
}

export const getBillOpenCurRow = (_this: mainEntity) => {
    let type = '3'
    let data = _this.getTableInfoKey('selectRows')
    let curRow = _this.getTableInfoKey("curRow")
    let _data = data
    if (_data.length == 0) {
        _data = [curRow]
    }
    let tableKey = _this.getTableInfoKey("key")
    let IbillTypeID = _this.getTableInfoKey("billTypeID")
    let realTableName = _this.getTableInfoKey("realTableName")
    let userAccount = _this.getTableInfoKey("userName")
    const currentDate = _this.getTableInfoKey("currentDate")
    const keyCode = _this.getTableInfoKey('keyCode')
    let postData = _data.map((row) => {
        let obj = [
            {
                name: 'iInterID',
                value: row[tableKey]
            }, //主键ID
            {
                name: 'cVouchType',
                value: IbillTypeID
            }, //单据类型
            {
                name: 'cMainTableName',
                value: realTableName
            }, //对应表名
            {
                name: 'cMainPrimaryCol',
                value: tableKey
            }, //主键子段
            {
                name: 'cFlag',
                value: type
            },
            {
                name: 'cChecker',
                value: userAccount
            },
            {
                name: 'dCheckDate',
                value: currentDate
            },
            {
                name: 'cBillCode',
                value: row[keyCode]
            },
            {
                name: 'iAuditTypeID',
                value: row.iAuditTypeID || -1
            },
            {
                name: 'AuditStatus',
                // value: AuditStatus || ''
                value: ''
            },
            {
                name: 'AuditResult',
                value: ''
            }
        ]
        return obj
    })
    let url = `/api/Sys_Role/ExecuteAudit`
    let params = postData
    return {
        url,
        params
    }
}

export const getBillCloseCurRow = (_this: mainEntity) => {
    let type = '2'
    let data = _this.getTableInfoKey('selectRows')
    let curRow = _this.getTableInfoKey("curRow")
    let _data = data
    if (_data.length == 0) {
        _data = [curRow]
    }
    let tableKey = _this.getTableInfoKey("key")
    let IbillTypeID = _this.getTableInfoKey("billTypeID")
    let realTableName = _this.getTableInfoKey("realTableName")
    let userAccount = _this.getTableInfoKey("userName")
    const currentDate = _this.getTableInfoKey("currentDate")
    const keyCode = _this.getTableInfoKey('keyCode')
    let postData = _data.map((row) => {
        let obj = [
            {
                name: 'iInterID',
                value: row[tableKey]
            }, //主键ID
            {
                name: 'cVouchType',
                value: IbillTypeID
            }, //单据类型
            {
                name: 'cMainTableName',
                value: realTableName
            }, //对应表名
            {
                name: 'cMainPrimaryCol',
                value: tableKey
            }, //主键子段
            {
                name: 'cFlag',
                value: type
            },
            {
                name: 'cChecker',
                value: userAccount
            },
            {
                name: 'dCheckDate',
                value: currentDate
            },
            {
                name: 'cBillCode',
                value: row[keyCode]
            },
            {
                name: 'iAuditTypeID',
                value: row.iAuditTypeID || -1
            },
            {
                name: 'AuditStatus',
                // value: AuditStatus || ''
                value: ''
            },
            {
                name: 'AuditResult',
                value: ''
            }
        ]
        return obj
    })
    let url = `/api/Sys_Role/ExecuteAudit`
    let params = postData
    return {
        url,
        params
    }
}