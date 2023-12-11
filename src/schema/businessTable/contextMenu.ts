import { resolveComponent, Teleport, computed, h, isProxy, nextTick, reactive, toRef, watchEffect } from "vue";
import { base } from "../base";
import { systemInstance } from "../system";
import { Dropdown, Menu } from "ant-design-vue";
import { StyleType, position } from "@/types/schema";
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
        // console.log(this.contextMenuConfig.position, 'testPosition')
        this.contextMenuConfig.modalValue = true
    }
    initComponent() {
        const contextMenuConfig = this.contextMenuConfig

        const position = computed(() => {
            return contextMenuConfig.position
        })
        const _this = this
        const modelValue = computed({
            set: (value) => {
                _this.contextMenuConfig.modalValue = value
            },
            get: () => {
                const show = _this.contextMenuConfig.modalValue
                return show
            }
        })
        const menu = h(Menu, {
            onClick: (item: any) => {
                nextTick(() => {
                    modelValue.value = false
                })
            },
            mode: 'vertical',
            items: contextMenuConfig.list,
        })
        const vNode = () => {
            const polldown = h(Dropdown, {
                trigger: ['contextmenu',],
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
                            top: `${position.value.top}px`,
                            background: 'red'
                        } as StyleType
                    }, [])
                },
                overlay: () => {
                    return menu
                }
            })

            return h(Teleport, {
                to: 'body'
            }, {
                default: () => {
                    return [h('div', {
                        style: { zIndex: 99999 } as StyleType
                    }, [polldown])]
                }
            }
            )
        }
        this.component = vNode
    }
}

export const createContextMenu = (schema: any) => {
    const menu = reactive(new contextMenu(schema, systemInstance))
    menu.initContextMenu()
    return menu
}