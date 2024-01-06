import { computed, defineComponent, nextTick, onMounted, onUnmounted, toRaw, watchEffect } from 'vue'
import { menu } from '../menu'
import { TabsProps } from 'ant-design-vue'
import { h } from 'vue'
import { tabsProps } from 'ant-design-vue/es/tabs/src/Tabs'
import { createTab, tab } from '../tab'
import { input } from '../input'
import { table } from '../table'
export default defineComponent({
    props: ['instance', 'data', 'table'] as Array<keyof TabsProps | 'table' | 'instance' | 'data' | 'field' | 'tabInstance' | 'tabItems'>,
    setup(props) {
        const instance = props.instance
        let com: any = instance?.renderComponent
        if (com == null) {
            com = () => {
                return h('div', {})
            }
        }
        // return com
        return { instance: props.instance }
    },
    render() {
        const component = this.instance?.renderComponent
        if (component == null) {
            return h('div', {})
        }
        return this.instance.renderComponent()
    },
})