
//@ts-nocheck
import { basicEntity } from "@/schema/businessTable/basicEntity";
import { http } from "@/schema/http";
import { layoutItem } from "@/types/schema";
import { tableData, tableInfo, tableinfo1 } from "./data";
import { table } from "@/schema/table";
import XEUtils from "xe-utils";
import { _columns, _columns1 } from "@/schema/entityColumn";
export const getTableInfo = async (entity?: string) => {
    if (entity == 't_SdOrder') {
        const columns = _columns()
        //模拟销售订单的表格数据
        let tableObj = {
            tableName: "t_SdOrder",// 
            entityName: 't_SdOrder',//
            componentName: "layoutGrid",//这个对应
            nodeArr: [{
                nodeName: "tableView",
                nodeData: {
                    columns: columns,
                    data: tableData
                },
                nodeConfig: {
                    x: 0,
                    y: 0,
                    w: 24,
                    h: 4,
                    i: XEUtils.uniqueId(),
                } as layoutItem,//节点配置,
            },
            ]//节点数据
        }//节点数据
        return tableObj
    } else if (entity == 't_SdOrderEntry') {
        return getDetailTableInfo(entity)
    }

}

export const getDetailTableInfo = async (entity: any) => {
    const columns = _columns1()
    let tableObj = {
        tableName: "t_SdOrderEntry",
        entityName: "t_SdOrder",
        componentName: 'layoutGrid',
        nodeArr: [{
            nodeName: "tableView",
            nodeData: {
                columns: columns,
                data: tableData
            },
            nodeConfig: {
                x: 0,
                y: 0,
                w: 24,
                h: 4,
                i: XEUtils.uniqueId(),
            } as layoutItem,//节点配置,
        },]//节点数据
    }
    return [tableObj]
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
export const getTableConfig = async (tableName?: string) => {
    const nestAxios = http

    try {
        if (tableName == 't_SdOrder') {

            const _info = tableInfo
            return _info
        } else if (tableName == 't_SdOrderEntry') {
            const _info1 = tableinfo1
            return _info1
        }
        // let _fn = runFun.toString() 
        // let data = await nestAxios.post('/entity/runFunction', {
        //     params: _fn,
        //     requestData: { tableName: "t_SdOrder", companyId: '0018', Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxIiwiaWF0IjoiMTcwMDQ2MjcxNCIsIm5iZiI6IjE3MDA0NjI3MTQiLCJleHAiOiIxNzAwNTM0NzE0IiwiaXNzIjoidm9sLmNvcmUub3duZXIiLCJhdWQiOiJ2b2wuY29yZSJ9.5K-AtxKPbQeykCYQERFlkQj4hosnFT_mm-Aml1d28y4" }
        // })
        // return data
    } catch (error) {
        console.error(error.message)
    }
}

export const getTableData = (table: table) => {
    return { url: '', params: {} }
}


/* 

{
            nodeName: "formView",
            nodeData: {
                items: [
                    {
                        field: 'name',
                        title: '名称',
                        span: 8,
                        type: 'string',
                        placeholder: '请输入名称',
                        layout: { x: 0, y: 0, w: 2, h: 2, i: '0', nodeName: 'tableView' },
                    },
                    {
                        field: 'sex',
                        title: '性别',
                        type: 'select',
                        span: 8,
                        layout: { x: 2, y: 0, w: 2, h: 4, i: '1', nodeName: '' },
                        options: [
                            { value: '0', label: '女' },
                            { value: '1', label: '男' },
                        ],
                    },
                    {
                        field: 'role',
                        type: 'baseInfo',
                        title: '角色',
                        span: 8,
                        layout: { x: 4, y: 0, w: 2, h: 5, i: '2', nodeName: '' },
                    },
                ],
                data: {
                    name: 'xiaofeng',
                    sex: '0',
                    role: 'shutiao',
                    job: 'teacher',
                }
            },
            nodeConfig: {
                x: 0,
                y: 0,
                w: 4,
                h: 4,
                i: XEUtils.uniqueId(),
            } as layoutItem,//节点配置,
        }
*/
