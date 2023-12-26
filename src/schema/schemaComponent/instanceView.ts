import { defineComponent } from 'vue'
import { menu } from '../menu'
import { TabsProps } from 'ant-design-vue'
import { h } from 'vue'
import { tabsProps } from 'ant-design-vue/es/tabs/src/Tabs'
import { createTab, tab } from '../tab'
export default defineComponent({
    props: ['instance'] as Array<keyof TabsProps | 'instance' | 'tabInstance' | 'tabItems'>,
    setup(props) {
        const instance = props.instance
        return instance.component
    }
})