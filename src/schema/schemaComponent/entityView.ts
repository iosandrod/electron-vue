import { computed, defineComponent, h, onMounted, reactive, render } from 'vue'
import { createMainEntity } from '../businessTable/mainEntity'

export default defineComponent({
    props: ['tableInfo', 'entityName', 'entityType'],
    setup(props, context) {
        const entityName = props.entityName || 't_SdOrder'
        const entityType = props.entityType
        const tableInfo = props.tableInfo || {}//使用静态数据
        const entity = createMainEntity(tableInfo, entityName)//表信息
        const pageShow = computed(() => {
            const component = entity.component
            if (component != null) {
                return true
            }
            return false
        })
        const component = computed(() => {
            const show = pageShow.value
            console.log('change show', show)
            if (show == false) {
                return () => h('div')
            } else {
                return entity.component
            }
        })
        // return () => {
        //     let com = component.value
        //     return com!()
        // }
        return { entity: entity, com: component }
    },
    render() {
        const com = this.com!
        return com()
    }
})