//@ts-nocheck
import { basicEntity } from "@/schema/businessTable/basicEntity";
import { http } from "@/schema/http";
import { layoutItem } from "@/types/schema";

export const getTableInfo = async (entity: basicEntity) => {
    //模拟销售订单的表格数据
    let tableObj = {
        tableName: "t_SdOrder",
        entityName: 't_SdOrder',
        componentName: "layoutGrid",//这个对应
        columns: [
            {
                field: "",
                type: "",
                editType: '',
                baseInfoTable: {},//json数据结构
                options: {},//下拉框数据,json数据结构
            }
        ],
        nodeArr: [{
            id: 2,
            nodeData: {
                columns: [
                    { field: 'name', title: 'name', type: 'string', editType: 'baseInfo' },
                    { field: 'sex', title: 'sex' },
                    { field: 'address', title: 'Address' },
                ],
                data: [
                    {
                        id: 10007,
                        name: 'Test7',
                        nickname: 'T7',
                        role: 'Test',
                        sex: 'Man',
                        age: 29,
                        address: 'Shenzhen',
                    },
                    {
                        id: 10008,
                        name: 'Test8',
                        nickname: 'T8',
                        role: 'Develop',
                        sex: 'Man',
                        age: 35,
                        address: 'Shenzhen',
                    },
                    {
                        id: 10008,
                        name: 'Test8',
                        nickname: 'T8',
                        role: 'Develop',
                        sex: 'Man',
                        age: 35,
                        address: 'Shenzhen',
                    },
                ]
            },
            nodeConfig: {
                x: 0,
                y: 0,
                w: 4,
                h: 4,
                i: '1',
                nodeName: "tableView"
            } as layoutItem,//节点配置,
        },
        {
            id: 2,
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
                x: 4,
                y: 4,
                w: 4,
                h: 4,
                i: '2',
                nodeName: "formView"
            } as layoutItem,//节点配置,
        }]//节点数据
    }
    return tableObj
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
        let _fn = runFun.toString()
        let data = await nestAxios.post('/entity/runFunction', {
            params: _fn,
            requestData: { tableName: "t_SdOrder", companyId: '0018', Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxIiwiaWF0IjoiMTcwMDQ2MjcxNCIsIm5iZiI6IjE3MDA0NjI3MTQiLCJleHAiOiIxNzAwNTM0NzE0IiwiaXNzIjoidm9sLmNvcmUub3duZXIiLCJhdWQiOiJ2b2wuY29yZSJ9.5K-AtxKPbQeykCYQERFlkQj4hosnFT_mm-Aml1d28y4" }
        })
        return data
    } catch (error) {
        console.error(error.message)
    }
}