import { computed, defineComponent, h, onMounted, reactive, render } from 'vue'
import { createMainEntity, mainEntity } from '../businessTable/mainEntity'
import entityView from './entityView'
import { TabPane, TabPaneProps, Tabs } from 'ant-design-vue'
import { StyleType } from '@/types/schema'
import tableView from './tableView'

export default defineComponent({
    props: ['detailTable', 'mainEntity'],//
    setup(props, context) {
        const mainEntity = props.mainEntity as mainEntity//主表实例 
        const renderTab = mainEntity.renderDetailTable
        const detailTable = mainEntity.detailTable || []
        // const dTable = detailTable[0]
        // return () => {
        // if (dTable != null) {
        //     return h('div', { style: { height: "100%", width: '100%' } }, [[h(entityView, { entityInstance: dTable, key: dTable.entityName })]])
        // }
        // if (dTable != null) {
        //     return h('div', { style: { height: "100%", width: '100%' } }, [Array(10000).fill(1)])
        // }
        // }
        return () => {
            return h('div', { style: {} as StyleType },
                h(Tabs, renderTab, () => {
                    return detailTable.map(dTable => {
                        const renderTab = dTable.renderDetailTab
                        return h(TabPane, renderTab, () => {
                            return h(entityView, { entityInstance: dTable, key: dTable.entityName })
                            // return h('div', Array(10000).fill(1))
                        })
                    })
                })
            )
        }
        // return () => h(entityView, { entityInstance: detailTable[0] })
        // return () => h('div') h(entityView, { entityInstance: detailTable[0] })
    },
})