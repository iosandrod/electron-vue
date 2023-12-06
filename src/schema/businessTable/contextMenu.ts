import { computed, h, nextTick, reactive, watchEffect } from "vue";
import { base } from "../base";
import { systemInstance } from "../system";
import { Dropdown, Menu } from "ant-design-vue";
import { position } from "@/types/schema";
import { getMouseEventPosition } from "@/utils/utils";

export class contextMenu extends base {
    contextMenuConfig = {
        list: [],//
        modalValue: false,
        position: { left: 0, top: 0 } as position
    }
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    initContextMenu() {
        const schema = this.schema
        const _contextMenuConfig = this.contextMenuConfig as any
        Object.keys(schema).forEach(key => {
            this.effectPool[`contextMenu${key}Effect`] = watchEffect(() => {
                _contextMenuConfig[key] = schema[key]
            })
        })
        this.initComponent()
    }
    openContext(event: MouseEvent) {
        const position = getMouseEventPosition(event)//获取位置
        this.contextMenuConfig.position = position
        this.contextMenuConfig.modalValue = true
    }
    initComponent() {
        const contextMenuConfig = this.contextMenuConfig
        const modelValue = computed({
            set: (value) => {
                contextMenuConfig.modalValue = value
            },
            get: () => {
                return contextMenuConfig.modalValue
            }
        })
        const items = computed(() => {
            return contextMenuConfig.list
        })
        const position = computed(() => {
            return contextMenuConfig.position
        })
        const vNode = () => {
            const menu = h(Menu, {
                onClick: (item: any) => {
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
        this.component = vNode
    }
}

export const createContextMenu = (schema: any) => {
    const menu = reactive(new contextMenu(schema, systemInstance))
    menu.initContextMenu()
    return menu
}