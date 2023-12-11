import { computed, defineComponent, h, onMounted, reactive, render } from 'vue'
import { createMainEntity, mainEntity } from '../businessTable/mainEntity'
import entityView from './entityView'
import { TabPane, TabPaneProps, Tabs } from 'ant-design-vue'
import { StyleType } from '@/types/schema'

export default defineComponent({
    props: ['detailTable', 'mainEntity'],//
    setup(props, context) {
        const mainEntity = props.mainEntity as mainEntity//主表实例 
        const renderTab = mainEntity.renderDetailTable
        const detailTable = computed(() => {
            return mainEntity.detailTable || []
        })
        return () => {
            return h(Tabs, renderTab, () => {
                return detailTable.value.map(dTable => {
                    const renderTab = dTable.renderDetailTab
                    return h(TabPane, renderTab, () => {
                        return h(entityView, { entityInstance: dTable, })
                    })
                })
            })
        }
    },
})