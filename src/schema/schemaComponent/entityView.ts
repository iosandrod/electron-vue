import { computed, defineComponent, h, onMounted, reactive, ref, render, resolveComponent, vShow, withDirectives } from 'vue'
import { createMainEntity } from '../businessTable/mainEntity'
import { StyleType } from '@/types/schema'

export default defineComponent({
    props: ['tableInfo', 'entityName', 'entityType', 'entityInstance'],//
    setup(props, context) {
        const entityName = props.entityName || 't_SdOrder'
        const tableInfo = props.tableInfo //使用静态数据 
        let entity: any = null
        if (props.entityInstance != null) {
            // entity = computed(() => {
            //     return props.entityInstance
            // })
            entity = props.entityInstance
        } else {
            entity = createMainEntity(entityName, tableInfo)
        }
        return { entity: entity }
    },
    render() {
        let component = this.entity?.component
        return component()
        // if (component) {
        //     return component()
        // }
        // return h('div')
    }
})