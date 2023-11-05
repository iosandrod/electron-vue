import { App } from 'vue'
import tableView from '@/schema/schemaComponent/tableView'
import formView from '@/schema/schemaComponent/formView'
export default {
    install(app: App) {
        app.component('table-view', tableView)
        app.component('form-view', formView)
    }
}