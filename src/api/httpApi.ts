import { basicEntity } from "@/schema/businessTable/basicEntity";
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




export const getTableConfig = (tableName: string) => {

}