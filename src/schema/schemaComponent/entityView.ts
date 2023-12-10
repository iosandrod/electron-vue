import { computed, defineComponent, h, onMounted, reactive, ref, render, resolveComponent, vShow, withDirectives } from 'vue'
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
        return { entity: entity }
    },
    render() {
        return this.entity.component()
        // return withDirectives(h('div', { style: { height: '200px', width: '200px', background: "red" } as StyleType }), [[vShow, this.testShow]])
    }
})