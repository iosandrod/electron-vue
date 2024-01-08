import { computed, defineComponent, h } from 'vue'
import { basicEntity } from '../businessTable/basicEntity'
import { StyleType } from '@/types/schema'
import { entityButton } from '../entityButton'
import buttonView from './buttonView'
import { createTab } from '../tab'
import { button } from '../button'
import tabView from './tabView'


export default defineComponent({
    props: ['entity', 'buttons'],
    setup(props, context) {
        const buttons = props.buttons
        const _tabItem = [...buttons].map((btn: any) => {
            //@ts-ignore 
            // return { key: btn.buttonConfig.cButtonName, tab: btn.component }
            return { key: btn.buttonConfig.cButtonName, tab: btn.component }
        })
        const buttonTab = createTab({
            //@ts-ignore
            tabItems: _tabItem,
            tabBarStyle: {
                margin: '0 0 0 0 !important',
                height: '35px'
            },
            tabMarginHidden: true,
        })
        return () => {
            return h(tabView, { tabInstance: buttonTab })
        }
    }
})