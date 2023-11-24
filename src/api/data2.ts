import { tableData2 } from "./data";


export const tableData3 = Array(1).fill(0).reduce((res, item) => {
    let data = JSON.parse(JSON.stringify(tableData2))
    res.push(...data)
    return res
}, [])   