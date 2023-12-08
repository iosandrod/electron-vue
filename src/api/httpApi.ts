
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
    const itemArr: layoutItem = [{
        x: 0, y: 0, h: 10, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
            renderComName: "buttonGroupView",//组件 
            renderFunName: 'initRenderButtonGroup',//数据初始化函数
        } as layoutItemConfig,
    }, {
        x: 0, y: 0, h: 10, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
            renderComName: "tableView",//组件
            renderFunName: 'initRenderTable',//数据初始化函数
        } as layoutItemConfig,
    }, {
        x: 0, y: 0, h: 10, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
            renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
            renderFunName: "initRenderDetailEntity",
        } as layoutItemConfig
    },]
    const _itemArr = JSON.parse(JSON.stringify(itemArr))
    return _itemArr
}


export const getEntityConfig = async (entity?: basicEntity) => {
    const itemArr: layoutItem = [
        // {
        //     x: 0, y: 0, h: 2, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "buttonGroupView",//组件
        //         renderFunName: 'initRenderButtonGroup',//数据初始化函数
        //     } as layoutItemConfig,
        // },
        // {
        //     x: 0, y: 2, h: 3, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "formView",//组件
        //         renderFunName: 'initRenderEditForm',//数据初始化函数 初始化编辑的表单的
        //     } as layoutItemConfig,
        // },
        {
            x: 0, y: 5, h: 25, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
                renderComName: "tableView",//组件
                renderFunName: 'initRenderTable',//数据初始化函数
            } as layoutItemConfig,
        },
        // {
        //     x: 0, y: 8, h: 5, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
        //         renderComName: "detailEntityView",//组件,一般这种呢都是固定死的
        //         renderFunName: "initRenderDetailEntity",
        //     } as layoutItemConfig
        // },
    ]
    const _itemArr = JSON.parse(JSON.stringify(itemArr))
    if (entity?.entityType == 'detail') {
        _itemArr.pop()
    }
    return _itemArr
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
        if (tableName == 't_SdOrder') {//这个是表的数据
            let _tableInfo = JSON.parse(JSON.stringify(tableInfo))
            const _info = await formatTableInfo(_tableInfo) as mainTableInfo
            const xTableInfo = _info.xTableInfo//
            const detailTable = xTableInfo?.detailTable || []
            const _detailTable = await Promise.all(detailTable?.map(async (table) => {
                let _config = await getTableConfig(table.tableName)
                _config.tableButtons = JSON.parse(JSON.stringify(_info.tableButtons))
                return _config
            }))//子表配置
            _info.detailTable = _detailTable
            return _info
        } else if (tableName == 't_SdOrderEntry') {
            const _info1 = await formatTableInfo(tableinfo1) as mainTableInfo
            return _info1
        }
    } catch (error) {
        console.error(error.message)
    }
}

export const getTableData = (table: table) => {
    return { url: '', params: {} }
}