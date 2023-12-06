import { computed, defineComponent, h, nextTick } from 'vue'
import { table } from '../table'
import { VxePulldown } from 'vxe-table'
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
} from '@ant-design/icons-vue'
import { Menu, Dropdown } from 'ant-design-vue'
import { StyleType } from '@/types/schema'
export default defineComponent({
    props: ['table'],
    setup(props, context) {
        const table: table = props.table
        const menuConfig = table.menuConfig
        const modelValue = computed({
            get() {
                const show = menuConfig.bodyMenu.show
                return show
            },
            set(value) {
                menuConfig.bodyMenu.show = value
            }
        })
        const position = computed(() => {
            return menuConfig.bodyMenu.position
        })
        const items = computed(() => {//
            return [
                {
                    key: '1',
                    // icon: () => h(MailOutlined),
                    label: 'Navigation One',
                    title: 'Navigation One',
                },
                {
                    key: 'sub1',
                    // icon: () => h(AppstoreOutlined),
                    label: 'Navigation Three',
                    title: 'Navigation Three',
                    children: [
                        {
                            key: '3',
                            label: 'Option 3',
                            title: 'Option 3',
                        },
                    ],
                },
                {
                    key: 'sub2',
                    // icon: () => h(SettingOutlined),
                    label: 'Navigation Four',
                    title: 'Navigation Four',
                    children: [
                        {
                            key: '7',
                            label: 'Option 7',
                            title: 'Option 7',
                        },
                    ],
                },
            ]
        })
        return () => {
            const menu = h(Menu, {
                onClick: (item) => {
                    nextTick(() => {
                        modelValue.value = false
                    })
                },
                mode: 'vertical',
                items: items.value,
            })
            const polldown = h(Dropdown, {
                trigger: ['contextmenu', 'hover'],
                "onUpdate:open": (value) => {
                    modelValue.value = value
                },
                open: modelValue.value
            }, {
                default: () => {
                    return h('div', {
                        style: {
                            width: "250px",
                            position: "fixed",
                            left: `${position.value.left}px`,
                            top: `${position.value.top}px`
                        }
                    })
                },
                overlay: () => {
                    return menu
                }
            })
            return h('div', {
            }, [polldown
            ])
        }
    }
})
/* 
 <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px;"
    mode="vertical"
    :items="items"
    @click="handleClick"
  />
*/