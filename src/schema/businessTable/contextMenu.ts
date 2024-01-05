import { resolveComponent, Teleport, computed, h, isProxy, nextTick, reactive, toRef, watchEffect, withDirectives } from "vue";
import { base } from "../base";
import { systemInstance } from "../system";
import { Dropdown, Menu } from "ant-design-vue";
import { StyleType, position } from "@/types/schema";
import { getMouseEventPosition } from "@/utils/utils";
import { VxePulldown, VxePulldownInstance } from "vxe-table";
import { table } from "../table";
export class contextMenu extends base {
    getTable?: () => table//
    getParent?: () => any
    pageRef: { menuInstance?: VxePulldownInstance } = {
    }
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
        event.preventDefault()
        const position = getMouseEventPosition(event)//获取位置
        this.contextMenuConfig.position = position
        // const modalValue = this.contextMenuConfig.modalValue
        // if (modalValue == true) {
        //     this.contextMenuConfig.modalValue = false
        //     setTimeout(() => {
        //         this.contextMenuConfig.modalValue = true
        //     }, 100);
        //     return
        // }
        // const isShow = menuInstance?.isPanelVisible()
        // console.log(isShow, this.pageRef)
        // this.contextMenuConfig.modalValue = true
        // setTimeout(() => {
        // }, 1000);
        const menuInstance = this.pageRef.menuInstance
        menuInstance?.showPanel()
    }
    closeContext() {
        const position = getMouseEventPosition(event)//获取位置
        this.contextMenuConfig.position = position
        // const modalValue = this.contextMenuConfig.modalValue
        // if (modalValue == true) {
        //     this.contextMenuConfig.modalValue = false
        //     setTimeout(() => {
        //         this.contextMenuConfig.modalValue = true
        //     }, 100);
        //     return
        // }
        // const isShow = menuInstance?.isPanelVisible()
        // console.log(isShow, this.pageRef)
        // this.contextMenuConfig.modalValue = true
        // setTimeout(() => {
        // }, 1000);
        const menuInstance = this.pageRef.menuInstance
        menuInstance?.hidePanel()
    }
    initComponent() {
        const contextMenuConfig = this.contextMenuConfig
        const position = computed(() => {
            return contextMenuConfig.position
        })
        const _this = this
        const vNode = () => {
            const pulldown = withDirectives(
                h(VxePulldown, {
                    transfer: true,
                    ref: 'pulldown',
                    destroyOnClose: true,
                }, {
                    default: () => {
                        return h('div', {
                            style: {
                            } as StyleType
                        }, [])
                    },
                    dropdown: () => {
                        const menu = withDirectives(
                            h(Menu, {
                                onClick: async (item: any) => {
                                    _this.itemClick(item)
                                    _this.closeContext()
                                },
                                mode: 'vertical',
                                items: contextMenuConfig.list,
                                ref: "menuInstance"
                            }), [[{
                                mounted: (div, ins) => {
                                }, unmounted: () => {

                                }
                            }]]
                        )
                        return menu
                    },
                }), [[{
                    mounted: (div, ins) => {
                        _this.pageRef.menuInstance = ins.instance?.$refs.pulldown as any
                    },
                    unmounted: () => {
                        _this.pageRef.menuInstance = null as any
                    }
                }]]
            )

            return h(Teleport, {
                to: 'body'
            }, {
                default: () => {
                    return [h('div', {
                        style: {
                            zIndex: 99999, position: "fixed",
                            left: `${position.value.left}px`,
                            top: `${position.value.top}px`,
                        } as StyleType
                    }, [pulldown])]//pulldown 
                }
            }
            )
        }
        this.component = vNode
    }
    async itemClick(item: any) {
        const _item = item.item
        const originItemValue = _item.originItemValue
        const runFun = originItemValue.runFun
        if (typeof runFun == 'function') {
            runFun({ contextMenu: this, item: originItemValue })
        }
    }
    findItemByKey(key: string) {
        const list = this.schema.list || []
        console.log(list)
        const targetList = list.find((item: any) => {
            return item.key == key
        })
        return targetList
    }
}

export const createContextMenu = (schema: any, parent?: any) => {
    const menu = reactive(new contextMenu(schema, systemInstance))
    menu.getParent = () => parent
    menu.initContextMenu()
    return menu
}