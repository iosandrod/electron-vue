import { App } from 'vue'
import tableView from '@/schema/schemaComponent/tableView'
import formView from '@/schema/schemaComponent/formView'
import buttonView from '@/schema/schemaComponent/buttonView'
import selectView from '@/schema/editComponent/selectView'
import layoutGridView from '@/schema/schemaComponent/layoutGridView'
import entityView from '@/schema/schemaComponent/entityView'
import detailEntityView from '@/schema/schemaComponent/detailEntityView'
import buttonGroupView from '@/schema/schemaComponent/buttonGroupView'
import menuView from '@/schema/schemaComponent/menuView'
import contextMenuView from '@/schema/schemaComponent/contextMenuView'
import tabView from '@/schema/schemaComponent/tabView'
import inputView from '@/schema/schemaComponent/inputView'
export default {
    install(app: App) {
        app.component('table-view', tableView)
        app.component('form-view', formView)
        app.component('button-view', buttonView)
        app.component('select-view', selectView)
        app.component('layout-grid-view', layoutGridView)
        app.component('entity-view', entityView)
        app.component('menu-view', menuView)
        app.component('context-menu-view', contextMenuView)
        app.component('tab-view', tabView)
        app.component('input-view', inputView)
    }
}

export const comVetor = {
    tabView,
    contextMenuView,
    tableView,
    formView,
    buttonView,
    selectView,
    layoutGridView,
    detailEntityView: detailEntityView,
    buttonGroupView: buttonGroupView,
    menuView: menuView
}