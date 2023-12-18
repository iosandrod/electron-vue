import { defineComponent } from 'vue'
import { menu } from '../menu'
import { TabsProps } from 'ant-design-vue'
import { h } from 'vue'
import { tabsProps } from 'ant-design-vue/es/tabs/src/Tabs'
import { createTab } from '../tab'
export default defineComponent({
    props: ['tabInstance', 'tabBarStyle', 'activeKey', 'tabItems', 'onChange', 'onTabClick'] as Array<keyof TabsProps | 'tabInstance' | 'tabItems'>,
    setup(props) {
        let _tab = props.tabInstance as menu
        if (_tab == null) {
            _tab = createTab({
                ...props, tabBarStyle: {
                    margin: '0 0 0 0 !important',
                    height: '20px'
                }
            }) as any
        }
        return _tab.component
    }
})