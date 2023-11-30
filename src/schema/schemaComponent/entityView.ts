import { computed, defineComponent, h, onMounted, reactive, render, resolveComponent, withDirectives } from 'vue'
import { createMainEntity } from '../businessTable/mainEntity'
import { StyleType } from '@/types/schema'

export default defineComponent({
    props: ['tableInfo', 'entityName', 'entityType', 'entityInstance'],//
    setup(props, context) {
        const entityName = props.entityName || 't_SdOrder'
        // const entityType = props.entityType
        const tableInfo = props.tableInfo //使用静态数据
        let entity: any = null
        if (props.entityInstance != null) {
            entity = props.entityInstance
        } else {
            entity = createMainEntity(entityName, tableInfo)
        }
        const pageShow = computed(() => {
            const state = entity.displayState
            return state == 'show'
        })
        const component = computed(() => {
            const show = pageShow.value
            if (show == false) {
                return () => h('div')
            } else {
                return entity.component
                // return vNode
            }
        })
        return { entity: entity, com: component }
    },
    render() {
        const com = this.com!
        return com()
    }
})