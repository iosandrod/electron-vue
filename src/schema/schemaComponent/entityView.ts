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
        // const pageShow = computed(() => {
        //     const state = entity.displayState
        //     return state !== 'destroy'
        // }) 
        // const component = computed(() => {
        //     const show = pageShow.value
        //     if (show == false) {
        //         return () => h('div')
        //     } else {
        //         return entity.component
        //     }
        // })
        // const testShow = ref(false)
        // setInterval(() => {
        //     testShow.value = !testShow.value
        // }, 2000)
        // return { entity: entity, com: component, }
        return { entity: entity }
    },
    render() {
        return this.entity.component()
        // return withDirectives(h('div', { style: { height: '200px', width: '200px', background: "red" } as StyleType }), [[vShow, this.testShow]])
    }
})