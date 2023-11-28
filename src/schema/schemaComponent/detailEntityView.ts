import { computed, defineComponent, h, onMounted, reactive, render } from 'vue'
import { createMainEntity } from '../businessTable/mainEntity'

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
            const component = entity.component
            if (component != null) {
                return true
            }
            return false
        })
        const component = computed(() => {
            const show = pageShow.value
            if (show == false) {
                return () => h('div')
            } else {
                return entity.component
            }
        })
        return { entity: entity, com: component }
    },
    render() {
        const com = this.com!
        return com()
    }
})