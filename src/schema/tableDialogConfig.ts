import { getDialogMaskHidden } from "@/utils/utils"
import { table } from './table'
import { dialogConfig, pickKey, tableConfig } from "@/types/schema"
export const createDialogConfig = (table: table) => {
    const config = {
        bodyMenuDialogConfig: {
            props: {
                onShow: getDialogMaskHidden((params: any) => { }),
                onHide: (params) => { },
                showHeader: false,
                position: { top: '0px', left: '0px' } as any,
                lockView: false,
                type: "modal",
                height: '300px', width: '150px', mask: false,
                modelValue: false,
                maskClosable: true,
                destroyOnClose: true,
                modalData: {
                    table: table, tableConfig: {
                        onCellClick: () => {
                        },
                        onCellDblclick: () => {
                            console.log('cellDbClick')
                        },
                        data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                        ], columns: [
                            { field: 'name', title: '', width: 100, showHeader: false }],
                        showHeader: true,
                        showFilterDialog: false,//显示过滤框
                        showBodyMenuDialog: false,//显示body menu弹框
                        showHeaderMenuDialog: false,//显示头部menu弹框
                    } as pickKey<tableConfig>,
                }
            } as dialogConfig, context: {}, dialogName: 'tableMenu'
        },
        headerMenuDialogConfig: {
            props: {
                onShow: getDialogMaskHidden((params: any) => { }),
                onHide: (params) => { },
                showHeader: false,
                position: { top: '0px', left: '0px' } as any,
                lockView: false,
                type: "modal",
                height: '300px', width: '150px', mask: false,
                modelValue: false,
                maskClosable: true,
                destroyOnClose: true,
                modalData: {
                    table: table, tableConfig: {
                        data: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                        ], columns: [
                            { field: 'name', title: '', width: 100, showHeader: false }],
                        showHeader: true,
                        showFilterDialog: false,//显示过滤框
                        showBodyMenuDialog: false,//显示body menu弹框
                        showHeaderMenuDialog: false,//显示头部menu弹框
                    } as pickKey<tableConfig>,
                }
            } as dialogConfig, context: {}, dialogName: 'tableMenu'
        }
    }
    return config
}