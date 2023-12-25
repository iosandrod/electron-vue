
export const tableHeaderMenu = [
    {
        key: '1',
        label: 'Navigation One',
        title: 'Navigation One',
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
        label: 'Navigation One',
        title: 'Navigation One',
    },
]