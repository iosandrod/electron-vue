import { reactive, watchEffect } from "vue";
import { base } from "./base";
import { systemInstance } from "./system";
import { MenuProps } from "ant-design-vue";

export class menu extends base<MenuProps> {
    menuConfig: MenuProps & { data?: [], parentKey?: string, treeData?: menuItem } = {
        mode: 'horizontal',
        data: [],//菜单数据
        parentKey: 'id',//父级的key的string
        treeData: []
    }
    renderMenu: any = {}
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
        this.initComponent()
    }
    buildData() { }
    initRenderMenu() {
        const renderMenu = this.renderMenu
    }
    initComponent(): void {
        const vNode = () => {
            return null
        }
        this.component = vNode
    }
}

export const createMenu = (schema: any) => {
    const _menu = reactive(new menu(schema, systemInstance))
    _menu.initMenu()
    return _menu
}

export class menuItem extends base {
    children: menuItem[] = []
    constructor(schema: any, system: any) {
        super(system, schema)
    }
    initMenuItem(data: []) { }
    insertChildren()//插入子节点
    { }
}