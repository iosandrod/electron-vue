import { computed, defineComponent, h, nextTick, reactive } from "vue";
import { column } from "../column";
import { StyleType, buttonConfig, tabConfig } from "@/types/schema";
import { CheckboxGroup, VxeCheckbox } from "vxe-table";
import tableView from "../schemaComponent/tableView";
import { TabPaneProps } from "ant-design-vue";
import { createTab } from "../tab";
import tabView from "../schemaComponent/tabView";
import { createButton } from "../button";
import buttonView from "../schemaComponent/buttonView";

export default defineComponent({
    props: ['column', 'data'],
    setup(props, context) {
        const column = computed(() => {
            return props.column as column
        })
        const table = computed(() => {
            return column.value.table
        })//表格
        let field = column.value.columnConfig.field!
        let filterConfig = table.value?.tableConfig.filterConfig?.find(row => {
            return row.field == field
        })
        if (filterConfig == null) {
            table.value?.tableConfig.filterConfig?.push({
                field: field,
                filterType: "array",
                filterData: []
            })
            filterConfig = table.value?.tableConfig.filterConfig?.find(row => {
                return row.field == field
            })
        }
        const tableRef = column.value.table!.pageRef.filterTable


        const tabItems: TabPaneProps[] = [
            { key: 'array', tab: '过滤' },
            { key: 'cal', tab: '条件' }
        ]
        const activeKey = computed(() => {
            return filterConfig?.filterType || 'array'
        })
        const tabConfig = reactive<tabConfig>({
            tabItems: tabItems,
            activeKey: activeKey as any,
            onChange: (key: any) => {
                filterConfig!.filterType = key;
            },
            tabBarStyle: {
                margin: '0 0 0 0 !important',
                height: '20px'
            }
        })
        const tabInstance = createTab(tabConfig)
        const buttonArr: buttonConfig[] = [{
            content: "重置",
            onClick: () => {
                filterConfig?.filterData?.splice(0)
                tableRef?.setCheckBoxRecord([])
                setTimeout(() => {
                    const showData = column.value.table?.tableData.showData
                    const _column = column.value
                    const curData = [...new Set(showData!.map(row => {
                        let field = _column.columnConfig.field
                        return row[field!]
                    }).filter(row => row !== null && row !== undefined))].map(row => { return { value: row } })
                    tableRef!.setTableData(curData)
                    // })
                }, 0);
            },
        }, {
            content: "重置所有",
            onClick: () => {
                table.value?.tableConfig.filterConfig?.forEach(config => {
                    const filterData = config.filterData
                    filterData?.splice(0)
                    tableRef?.setCheckBoxRecord([])
                    setTimeout(() => {
                        const showData = column.value.table?.tableData.showData
                        const _column = column.value
                        const curData = [...new Set(showData!.map(row => {
                            let field = _column.columnConfig.field
                            return row[field!]
                        }).filter(row => row !== null && row !== undefined))].map(row => { return { value: row } })
                        tableRef?.setTableData(curData)
                    }, 0);
                })
            }
        },]
        const btnArr = buttonArr.map(btn => {
            return createButton(btn)
        }).map(btn1 => h(buttonView, { buttonInstance: btn1 }))
        const buttonIns = h('div', { style: { width: "100%", display: 'flex', flexDirection: "row", justifyContent: "space-between" } as StyleType }, btnArr)
        return () => {
            const tab = h(tabView, { tabInstance: tabInstance })
            const tableCom = h(tableView, { tableInstance: tableRef })
            return h('div', { style: { zIndex: 99999, height: '100%', width: '100%', display: 'flex', flexDirection: "column" } as StyleType }, [
                tab,
                tableCom,
                buttonIns
            ])
            // return h('div', Array(10000).fill(1))
        }
    }
})