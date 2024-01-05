
//@ts-nocheck
import { basicEntity } from "@/schema/businessTable/basicEntity";
import { http } from "@/schema/http";
import { layoutItem, layoutItemConfig, mainTableInfo } from "@/types/schema";
import { tableData, tableInfo, tableinfo1 } from "./data";
import { table } from "@/schema/table";
import XEUtils from "xe-utils";
import { _columns, _columns1 } from "@/schema/entityColumn";
import { formatTableInfo } from "@/utils/utils";
export const getTableInfo = async (entity?: basicEntity) => {

}
export const typeNode = {
    main: [
        // {
        //     x: 0, y: 0, h: 4, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "instanceView",//组件
        //         renderFunName: 'initRenderButtonGroup',//数据初始化函数
        //     } as layoutItemConfig,
        //     renderKey: 'buttonGroup',
        //     renderComName: "instanceView",//组件
        //     renderFunName: 'initRenderButtonGroup',//数据初始化函数
        // },
        // {
        //     x: 0, y: 4, h: 30, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "instanceView",//组件
        //         renderFunName: 'initRenderTable',//数据初始化函数
        //     } as layoutItemConfig,
        //     renderKey: 'vxeGrid',
        //     renderComName: "instanceView",//组件
        //     renderFunName: 'initRenderTable',//数据初始化函数
        // },
        // {
        //     x: 0, y: 34, h: 40, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         // renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
        //         renderComName: "instanceView",
        //         renderFunName: "initRenderDetailEntity",
        //     } as layoutItemConfig,
        //     renderKey: 'dEntityInstance',
        //     renderComName: "instanceView",
        //     renderFunName: "initRenderDetailEntity",
        // },
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
            x: 0, y: 0, h: 4, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件
                renderFunName: 'initRenderButtonGroup',//数据初始化函数
            } as layoutItemConfig,
            renderKey: 'buttonGroup',
            renderComName: "instanceView",//组件
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        },
        {
            x: 0, y: 4, h: 30, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
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
            x: 0, y: 0, h: 4, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "buttonGroupView",//组件
                renderFunName: 'initRenderButtonGroup',//数据初始化函数
            } as layoutItemConfig,
            renderComName: "buttonGroupView",//组件
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        },
        {
            x: 0, y: 4, h: 30, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "tableView",//组件
                renderFunName: 'initRenderTable',//数据初始化函数
            } as layoutItemConfig,
            renderComName: "tableView",//组件
            renderFunName: 'initRenderTable',//数据初始化函数
        },
        {
            x: 0, y: 34, h: 35, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
                renderFunName: "initRenderDetailEntity",
            } as layoutItemConfig,
            renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
            renderFunName: "initRenderDetailEntity",
        },
    ],
    edit: [
        {
            x: 0, y: 0, h: 4, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件 
                renderFunName: 'initRenderButtonGroup',//数据初始化函数
            } as layoutItemConfig,
            renderKey: 'buttonGroup',
            renderComName: "instanceView",//组件 
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        },
        {
            x: 0, y: 4, h: 30, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "instanceView",//组件
                renderFunName: 'initRenderEditForm',//数据初始化函数 初始化编辑的表单的
            } as layoutItemConfig,
            renderKey: "vxeForm",
            renderComName: "instanceView",//组件
            renderFunName: 'initRenderEditForm',//数据初始化函数 初始化编辑的表单的
        },
        {
            x: 0, y: 34, h: 35, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
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


