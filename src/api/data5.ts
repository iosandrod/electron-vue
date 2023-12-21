import { table } from "@/schema/table"

export const testTableViewData = {
    onCellClick: () => { },
    onCellMenu: () => { },
    border: true,
    height: '400px',
    columnConfig: {
        resizable: false,
    },
    columns: [
        {
            field: 'name', title: 'name', type: 'string',
            editType: "select",
            options: [
                { label: "大于", value: ">" },
                { label: "等于", value: '=' },
                { label: "小于", value: "<" },
                { label: "包含", value: "%" }
            ],
            onChange: (value: any) => {
                // const table = value.table as table
                // const value1 = value.value
                // if (value1 == '=') {
                //     table.changeColumnEditType('sex', 'baseInfo')
                // } else {
                //     table.changeColumnEditType('sex', 'string')
                // }
                // table.changeColumnEditType('select')
            }
        },
        {
            field: 'sex', title: 'sex',
            // editType: 'string',
            onChange: (value) => {
                console.log(value)
            },
            // getRowEditType: (row: any, col: any) => {
            //     if (row['name'] == '=') {
            //         return 'baseInfo'
            //     }
            //     return 'string'
            // }
        },
        { field: 'address', title: 'Address' },
    ],
    data: [
        {
            id: 10001,
            name: 'Test1',
            nickname: 'T1',
            role: 'Develop',
            sex: 'Man',
            age: 28,
            address: 'Shenzhen',
        },
        {
            id: 10002,
            name: 'Test2',
            nickname: 'T2',
            role: 'Test',
            sex: 'Women',
            age: 22,
            address: 'Guangzhou',
        },
        {
            id: 10003,
            name: 'Test3',
            nickname: 'T3',
            role: 'PM',
            sex: 'Man',
            age: 32,
            address: 'Shanghai',
        },
        //     {
        //         id: 20000,
        //         name: 'Test4',
        //         nickname: 'T4',
        //         role: 'Designer',
        //         sex: 'Women',
        //         age: 23,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10005,
        //         name: 'Test5',
        //         nickname: 'T5',
        //         role: 'Develop',
        //         sex: 'Women',
        //         age: 30,
        //         address: 'Shanghai',
        //     },
        //     {
        //         id: 10006,
        //         name: 'Test6',
        //         nickname: 'T6',
        //         role: 'Designer',
        //         sex: 'Women',
        //         age: 21,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10007,
        //         name: 'Test7',
        //         nickname: 'T7',
        //         role: 'Test',
        //         sex: 'Man',
        //         age: 29,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10008,
        //         name: 'Test8',
        //         nickname: 'T8',
        //         role: 'Develop',
        //         sex: 'Man',
        //         age: 35,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10001,
        //         name: 'Test1',
        //         nickname: 'T1',
        //         role: 'Develop',
        //         sex: 'Man',
        //         age: 28,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10002,
        //         name: 'Test2',
        //         nickname: 'T2',
        //         role: 'Test',
        //         sex: 'Women',
        //         age: 22,
        //         address: 'Guangzhou',
        //     },
        //     {
        //         id: 10003,
        //         name: 'Test3',
        //         nickname: 'T3',
        //         role: 'PM',
        //         sex: 'Man',
        //         age: 32,
        //         address: 'Shanghai',
        //     },
        //     {
        //         id: 10004,
        //         name: 'Test4',
        //         nickname: 'T4',
        //         role: 'Designer',
        //         sex: 'Women',
        //         age: 23,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10005,
        //         name: 'Test5',
        //         nickname: 'T5',
        //         role: 'Develop',
        //         sex: 'Women',
        //         age: 30,
        //         address: 'Shanghai',
        //     },
        //     {
        //         id: 10006,
        //         name: 'Test6',
        //         nickname: 'T6',
        //         role: 'Designer',
        //         sex: 'Women',
        //         age: 21,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10007,
        //         name: 'Test7',
        //         nickname: 'T7',
        //         role: 'Test',
        //         sex: 'Man',
        //         age: 29,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10008,
        //         name: 'Test8',
        //         nickname: 'T8',
        //         role: 'Develop',
        //         sex: 'Man',
        //         age: 35,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10001,
        //         name: 'Test1',
        //         nickname: 'T1',
        //         role: 'Develop',
        //         sex: 'Man',
        //         age: 28,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10002,
        //         name: 'Test2',
        //         nickname: 'T2',
        //         role: 'Test',
        //         sex: 'Women',
        //         age: 22,
        //         address: 'Guangzhou',
        //     },
        //     {
        //         id: 10003,
        //         name: 'Test3',
        //         nickname: 'T3',
        //         role: 'PM',
        //         sex: 'Man',
        //         age: 32,
        //         address: 'Shanghai',
        //     },
        //     {
        //         id: 10004,
        //         name: 'Test4',
        //         nickname: 'T4',
        //         role: 'Designer',
        //         sex: 'Women',
        //         age: 23,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10005,
        //         name: 'Test5',
        //         nickname: 'T5',
        //         role: 'Develop',
        //         sex: 'Women',
        //         age: 30,
        //         address: 'Shanghai',
        //     },
        //     {
        //         id: 10006,
        //         name: 'Test6',
        //         nickname: 'T6',
        //         role: 'Designer',
        //         sex: 'Women',
        //         age: 21,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10007,
        //         name: 'Test7',
        //         nickname: 'T7',
        //         role: 'Test',
        //         sex: 'Man',
        //         age: 29,
        //         address: 'Shenzhen',
        //     },
        //     {
        //         id: 10008,
        //         name: 'Test8',
        //         nickname: 'T8',
        //         role: 'Develop',
        //         sex: 'Man',
        //         age: 35,
        //         address: 'Shenzhen',
        //     },
    ],
}