import { computed, h, isProxy, reactive, vShow, watchEffect, withDirectives } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { Menu, MenuItem, MenuItemProps, MenuProps, SubMenu, SubMenuProps } from "ant-design-vue";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { StyleType, formConfig, menuConfig } from "@/types/schema";
import { ItemGroup, ItemType } from "ant-design-vue/es/menu";
import menuItemView from "./schemaComponent/menuItemView";
import { VxeInput, VxeInputProps } from "vxe-table";
import { createInput, input } from "./input";
import inputView from "./schemaComponent/inputView";
import { createContextMenu } from "./businessTable/contextMenu";
import instanceView from "./schemaComponent/instanceView";
import { createForm, form } from "./form";
import { menuData, menuData1 } from "@/api/data3";

export class menu extends base<MenuProps> {
    renderInput: VxeInputProps = {}
    currentMenuItem = {}
    renderAddForm: formConfig = {
        items: []
    }
    getCurrentContextItem?: () => menuItem
    renderContext = {
        list: [{
            key: 'addItem',
            disabled: false,
            // icon: () => h(MailOutlined),
            label: '添加子节点',
            runFun: (value: any) => {
                const contextMenu = value.contextMenu
                const menu = contextMenu.getParent()
                const _this = menu as menu
                const currentMenuItem = _this.getCurrentContextItem!()
                const data = menuData
                const someItem = JSON.parse(JSON.stringify(data[Math.floor(Math.random() * 6)]))
                if (currentMenuItem == null) {
                    _this.addMenuItem(someItem, null as any)
                } else {
                    _this.addMenuItem(someItem, currentMenuItem)
                }
            }
        },
        {
            key: 'deleteItem',
            label: '删除该节点',
            disabled: false,
            onClick: (value: any) => {

            },
        },] as ItemType[]
    }
    pageRef: { editForm?: form, formInstance?: form, contextMenu?: menu, contextInstance?: menu, inputInstance?: input } = {

    }
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
        isDesign: true
    }
    renderMenu: MenuProps = {}
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    openContext($event: any) {
        const menuConfig = this.menuConfig
        if (menuConfig.isDesign == false) {
            return
        }
        const pageRef = this.pageRef
        const contextInstance = pageRef.contextInstance
        if (contextInstance) {
            contextInstance.openContext($event)
        }
    }
    addMenuItem(item: any, parentItem: menuItem) {
        const menuConfig = this.menuConfig
        if (parentItem == null) {
            const vNode = menuConfig.vNode
            vNode?.addMenuItem(item)
        } else {
            console.log(parentItem, 'pItem')
            const _item = menuData1.find(row => {
                console.log(`${row.parentId}` == `${parentItem.schema.id}`)
                return row.parentId == parentItem.schema.id
            })
            parentItem.addMenuItem(_item)
        }
    }
    initMenu() {
        const schema = this.schema!
        Object.keys(schema).forEach(key => {
            const _menuConfig: any = this.menuConfig
            this.effectPool[`menu${key}Effect`] = watchEffect(() => {
                _menuConfig[key] = schema[key]
            })
        })
        this.initRenderForm()
        this.buildData()
        this.initRenderMenu()
        this.initRenderInput()
        this.initRenderContext()
        this.initComponent()
    }
    initRenderForm() {
        const renderAddForm = this.renderAddForm
    }
    initRenderContext() {
        const renderContext = this.renderContext
        const contextInstance = createContextMenu(renderContext)
        contextInstance.getParent = () => {
            return this
        }
        //@ts-ignore
        this.pageRef.contextInstance = contextInstance
    }
    initRenderEditForm() {
        const menuConfig = this.menuConfig
        const formitems = menuConfig.formitems || []//构建一个form
        const editform = createForm({ item: formitems })
        this.pageRef.editForm = editform as any
    }
    buildData() {
        const menuConfig = this.menuConfig
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
        const inputInstance = createInput(renderInput)
        this.pageRef.inputInstance = inputInstance
    }
    menuItemClick(item: menuItem) {
        const menuConfig = this.menuConfig
        const clickFn = menuConfig.itemClick
        if (typeof clickFn == 'function') {
            clickFn(item)
        }
    }
    initComponent(): void {
        const menuConfig = this.menuConfig
        const _vNode = menuConfig.vNode as menuItem
        const renderMenu = this.renderMenu
        const _this = this
        const vNode = () => {
            const menuCom = h(Menu, {
                ...renderMenu,
            }, () => {
                return _vNode.children.map((node: any) => {
                    // return node.component()
                    return h(menuItemView, { menuItem: node })
                })
            })
            const contextMenu = h(instanceView, { instance: _this.pageRef.contextInstance })
            return h('div', {
                onContextmenu: ($event: MouseEvent) => {
                    _this.getCurrentContextItem = () => null as any
                    _this.openContext($event)
                },
                style: {
                    display: 'flex',
                    flexDirection: "column",
                    width: "100%",
                    height: "100%"
                } as StyleType
            }, [
                h(inputView, { inputInstance: _this.pageRef.inputInstance, style: { height: '30px' } })
                , menuCom, contextMenu
            ])
        }
        this.component = vNode
    }
    inputChange() {
        this.menuConfig.vNode!.inputChange()
    }
}


export class menuItem extends base {
    menuItemConfig = {}
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
        const schema = this.schema
        const menuItemConfig: any = this.menuItemConfig
        for (const key of Object.keys(schema)) {
            this.effectPool[`menuItem${key}Effect`] = watchEffect(() => {
                menuItemConfig[key] = schema[key]
            })
        }
        this.initRenderMenuItem()
        this.initComponent()
    }
    initRenderMenuItem() {
        const _this = this
        const schema: any = this.menuItemConfig
        const renderMenuItem = this.renderMenuItem
        const menu = this.getMenu()
        const titleKey = menu.menuConfig.titleKey || 'title'
        // const parentKey = menu.menuConfig.parentKey
        const key = menu.menuConfig.key!
        renderMenuItem.title = schema[titleKey]
        renderMenuItem.id = `${schema[key]}`
        //@ts-ignore
        renderMenuItem.key = schema[key]
        //@ts-ignore
        renderMenuItem.onContextmenu = ($event: MouseEvent) => {
            $event.stopPropagation()
            const menu = _this.getMenu()
            menu.getCurrentContextItem = () => { return this }
            menu.openContext($event)
        }
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
    addMenuItem(item: any) {
        // const menuItemConfig = this.menuItemConfig as any
        // const key = this.getMenu().menuConfig.key! 
        // const keyValue = menuItemConfig[key]
        // item[key] = item[key] + Math.floor(Math.random() * 100)
        // console.log(item, this.schema)
        const newItem = createMenuItem(item, this.getMenu())
        newItem.getParent = () => {
            return this
        }
        // this.children = [...this.children, newItem]
        this.children.push(newItem)
    }
    deleteMenuItem() {

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
        const _this = this
        const showItem = computed(() => {
            return _this.displayState == 'show' && _this.children.length == 0
        })
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
            if (_this.children.length > 0) {
                const node = h(SubMenu, { ...renderMenuItem, }, () => {
                    return _this.children.map((chi: menuItem) => {
                        return h(menuItemView, { menuItem: chi })
                    })
                })
                const node1 = h('div', [node])
                return withDirectives(node1, [[vShow, show.value]])
            } else {
                const node = h(MenuItem, renderMenuItem, () => {
                    return h('div', {
                        onClick: ($event: MouseEvent) => {
                            const menu = _this.getMenu()
                            menu.menuItemClick(_this)
                        },
                    }, [renderMenuItem.title])
                })
                const node1 = h('div', [node])
                return withDirectives(node1, [[vShow, showItem.value]])
            }

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