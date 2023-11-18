import { defineComponent, h } from 'vue'
import { } from 'vue-grid-layout'
import { createLayout } from '../layoutGrid'
export default defineComponent({
    props: ['pageTree'],//虚拟节点
    setup(props, context) {
        const layoutGrid = createLayout(props.pageTree)
        return layoutGrid.component
    }
})