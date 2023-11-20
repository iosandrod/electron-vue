import { App } from 'vue'
import tableView from '@/schema/schemaComponent/tableView'
import formView from '@/schema/schemaComponent/formView'
import buttonView from '@/schema/schemaComponent/buttonView'
import selectView from '@/schema/editComponent/selectView'
import layoutGridView from '@/schema/schemaComponent/layoutGridView'
export default {
    install(app: App) {
        app.component('table-view', tableView)
        app.component('form-view', formView)
        app.component('button-view', buttonView)
        app.component('select-view', selectView)
        app.component('layout-grid-view', layoutGridView)
    }
}

export const comVetor = {
    tableView,
    formView,
    buttonView,
    selectView,
    layoutGridView
}