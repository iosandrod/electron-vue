import { tableData2 } from "./data";


export const tableData3 = Array(100).fill(1).reduce((res, item) => {
    let data = JSON.parse(JSON.stringify(tableData2))
    res.push(...data)
    return res
}, [])   