
export const tableHeaderMenu = [
    {
        key: '1',
        label: '打开搜索框',
        title: '打开搜索框',
        runFun: (value: any) => {
            const contextMenu = value.contextMenu
            const table = contextMenu.getTable()
            table.openGlobalWhere()
        }
    },
]

export const tableBodyMenu = [
    {
        key: '1',
        label: '复制',
        title: '复制',
    },
]