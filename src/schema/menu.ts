import { computed, h, reactive, vShow, watchEffect, withDirectives } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { Menu, MenuItem, MenuItemProps, MenuProps, SubMenu, SubMenuProps } from "ant-design-vue";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { StyleType, menuConfig } from "@/types/schema";
import { ItemGroup } from "ant-design-vue/es/menu";
import menuItemView from "./schemaComponent/menuItemView";
import { VxeInput, VxeInputProps } from "vxe-table";

export class menu extends base<MenuProps> {
    renderInput: VxeInputProps = {}
    menuConfig: menuConfig = {
        mode: 'inline',
        data: [],//菜单数据
        titleKey: 'title',
        parentKey: 'parentId',//父级的key的string 父级字段名称
        key: "id",
        rootKey: "*",
        selectedKeys: [],
        collapseAll: false,
        vNode: undefined,
        inputValue: '',
        inlineCollapsed: false,
        showInput: true,
    }
    renderMenu: MenuProps = {}
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    initMenu() {
        const schema = this.schema!
        Object.keys(schema).forEach(key => {
            const _menuConfig: any = this.menuConfig
            this.effectPool[`menu${key}Effect`] = watchEffect(() => {
                _menuConfig[key] = schema[key]
            })
        })
        this.buildData()
        this.initRenderMenu()
        this.initRenderInput()
        this.initComponent()
    }
    buildData() {
        const menuConfig = this.menuConfig
        // const parentKey = menuConfig.parentKey!
        const rootKey = menuConfig.rootKey
        const key = menuConfig.key!
        const rootTitle = menuConfig.rootTitle || '菜单'
        menuConfig.vNode = createMenuItem({
            isVnode: true,//虚拟为true
            [key]: rootKey,//虚拟的key
            title: rootTitle
        }, this)//虚拟节点  
        menuConfig.vNode.buildData()
    }
    getFlatItem() {
        const vNode = this.menuConfig.vNode as menuItem
        const arr = vNode.getFlatItem()
        return arr
    }
    initRenderMenu() {
        const renderMenu = this.renderMenu
        const menuConfig = this.menuConfig
        renderMenu.mode = computed(() => {
            return menuConfig.mode
        }) as any
        const _this = this
        // renderMenu.mode = 'inline'
        renderMenu.multiple = computed(() => {
            const inputValue = menuConfig.inputValue!
            if (inputValue?.length > 0) {
                return false
            }
            return false
        }) as any
        renderMenu.openKeys = []
        renderMenu.activeKey = ''
        renderMenu.selectedKeys = computed({
            set(value1: any) {
                menuConfig.selectedKeys = value1 as any
            },
            get() {
                return menuConfig.selectedKeys
            }
        }) as any
        renderMenu.openKeys = computed({
            set(value: any) {
                // const allItem
                //@ts-ignore

                menuConfig.openKeys = value as any
            },
            get() {
                let collapseAll: boolean = menuConfig?.inputValue!?.length > 0
                if (collapseAll == false) {
                    collapseAll = menuConfig.collapseAll!
                }
                if (collapseAll == true) {
                    return _this.getFlatItem().map((row: any) => {
                        return row.renderMenuItem.key
                    })
                }
                return menuConfig.openKeys || []//返回key的值
            }
        }) as any
        //@ts-ignore  
        renderMenu.onOpenChange = (value) => {
            const _openChange = menuConfig.onOpenChange
            if (typeof _openChange == 'function') {
                _openChange(value)
            }
            let collapseAll: boolean = menuConfig?.inputValue!?.length > 0
            if (collapseAll == false) {
                collapseAll = menuConfig.collapseAll!
            }
            if (collapseAll == true) {
                return
            }
            const lastKey = menuConfig.openKeys! || []//上一次的openKey
            const newKey = [...lastKey, ...value].filter((v, i, arr) => {
                return arr.filter(row => row == v).length < 2
            })
            const item = this.getFlatItem().find((row: any) => {
                return row.renderMenuItem.key == newKey[0]
            }) as menuItem
            const keyArr = item?.getParentKeys() || []
            if (!value.includes(newKey[0])) {
                //如果是合并 
                keyArr.shift()//去除自身   
            }
            renderMenu.openKeys = keyArr
        }
        renderMenu.inlineCollapsed = computed(() => {
            return menuConfig.inlineCollapsed
        }) as any
        renderMenu['onUpdate:selectedKeys'] = (value) => {
            renderMenu.selectedKeys = value
        }

        // setTimeout(() => {
        //     renderMenu.selectedKeys = [1243]
        // }, 5000);
    }
    initRenderInput() {//输入框初始化
        const renderInput = this.renderInput as VxeInputProps
        renderInput.type = 'text'
        const menuConfig = this.menuConfig
        renderInput.modelValue = computed({
            set(value1) {
                // console.log(value1)
                menuConfig.inputValue = value1 as any
            },
            get() {
                return menuConfig.inputValue
            }
        }) as any
        //@ts-ignore
        renderInput.onChange = ({ value }: any) => {
            renderInput.modelValue = value
            this.inputChange()
        }
    }
    initComponent(): void {
        const menuConfig = this.menuConfig
        const _vNode = menuConfig.vNode as menuItem
        const renderMenu = this.renderMenu
        const vNode = () => {
            const menuCom = h(Menu, { ...renderMenu }, () => {
                return _vNode.children.map((node: any) => {
                    return node.component()
                })
            })
            // return menuCom
            return h('div', {
                style: {
                    display: 'flex',
                    flexDirection: "column",
                    width: "100%",
                    height: "100%"
                } as StyleType
            }, [h(VxeInput, {
                ...this.renderInput, style: {
                    width: "100%"
                } as StyleType
            }), menuCom])
        }
        this.component = vNode
    }
    inputChange() {
        this.menuConfig.vNode!.inputChange()
    }
}


export class menuItem extends base {
    children: menuItem[] = []
    renderMenuItem: MenuItemProps = {}
    renderSubMenu: SubMenuProps = {}
    getMenu: () => menu = () => {
        return {} as any
    }
    getParent: () => menuItem = () => { return {} as any }
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    inputChange(value = this.getMenu().menuConfig.inputValue): boolean {
        const renderMenuItem = this.renderMenuItem
        const title = renderMenuItem.title as string
        if (this.schema.isVnode == true) {
            this.children.forEach(chi => {
                chi.inputChange()
            })
            return false
        }
        if (this.children.length == 0) {
            if (!title.includes(value!)) {
                this.displayState = 'hidden'
                return false
            } else {
                this.displayState = 'show'
                return true
            }
        }
        const status = this.children.reduce((res, item) => {
            const _status = item.inputChange()//true or false
            if (res == true) {
                return res
            }
            if (_status == true) {
                return true
            }
            return res
        }, false)
        if (status == true) {
            this.displayState = 'show'
        } else {
            this.displayState = 'hidden'
        }
        return status
    }
    initMenuItem(data: []) {
        //
        this.initRenderMenuItem()
        this.initComponent()
    }
    initRenderMenuItem() {
        const schema = this.schema
        const renderMenuItem = this.renderMenuItem
        const menu = this.getMenu()
        const titleKey = menu.menuConfig.titleKey || 'title'
        // const parentKey = menu.menuConfig.parentKey
        const key = menu.menuConfig.key!
        renderMenuItem.title = schema[titleKey]
        renderMenuItem.id = `${schema[key]}`
        //@ts-ignore
        renderMenuItem.key = schema[key]
        const renderSubMenu = this.renderSubMenu
        // renderSubMenu.title = schema[titleKey]
    }
    buildData() {
        const schema = this.schema!
        const menu = this.getMenu()//获取menuData的数据
        const parentKey = menu.menuConfig.parentKey || 'parentId'//默认是id
        const key = menu.menuConfig.key!
        const parentId = schema[key]//获取父级ID
        const menuData = menu.menuConfig.data
        const children = menuData?.filter((row: any) => {
            const chId = row[parentKey]
            return chId != null && chId == parentId
        })//构建children
        const _children = children?.map((row: any) => {
            const _row = createMenuItem(row, this.getMenu())
            _row.getParent = () => {
                return this
            }
            return _row
        })
        this.children = _children!
        if (this.children.length > 0) {
            this.children.forEach(row => {
                row.buildData()//构建树的数据  
            })
        }//
    }
    insertChildren()//插入子节点
    {

    }
    getFlatItem(): any[] {
        if (this.schema.isVnode == true) {
            return [...this.children.reduce((res: any[], item) => {
                const arr = item.getFlatItem()
                res.push(...arr)
                return res
            }, [])]
        }
        return [this, ...this.children.reduce((res: any[], item) => {
            const arr = item.getFlatItem()
            res.push(...arr)
            return res
        }, [])]
    }
    getParentKeys(): any {
        const parent = this.getParent()
        //@ts-ignore
        const key = this.renderMenuItem.key
        if (parent && parent?.schema?.isVnode !== true) {
            return [key, ...parent.getParentKeys()]
        }
        return [key]
    }
    initComponent() {
        const renderMenuItem = this.renderMenuItem
        const renderCom = computed(() => {
            const children = this.children
            if (children?.length > 0) {
                return SubMenu
            } else {
                return MenuItem
            }
        })
        const _this = this
        const show = computed(() => {
            return _this.displayState == 'show'
        })
        const destroy = computed(() => {
            return _this.displayState == 'destroy'
        })
        const vNode = () => {
            if (destroy.value == true) {
                return null
            }
            const node = h(renderCom.value, renderMenuItem, () => {
                if (this.children.length > 0) {
                    return this.children.map((chi: any) => {
                        return h(menuItemView, { menuItem: chi })
                    })
                } else {
                    return h('div', [renderMenuItem.title])
                }
            })
            const node1 = h('div', [node])
            return withDirectives(node1, [[vShow, show.value]])
        }
        this.component = vNode//初始化节点
    }
}

export const createMenuItem = (schema: any, menu: menu) => {
    const _item = reactive(new menuItem(schema, systemInstance))
    _item.getMenu = () => { return menu }
    _item.initMenuItem(menu.menuConfig.data!)
    return _item
}
export const createMenu = (schema: menuConfig) => {
    const _menu = reactive(new menu(schema, systemInstance))
    _menu.initMenu()
    return _menu
}