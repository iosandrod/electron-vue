import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import './samples/node-api'
import '@quasar/extras/material-icons/material-icons.css'
import "@/style/index.scss"
import "@/style/vxe-table/index.scss"
import "@/style.css"
import VXETable from 'vxe-table'
import router from './router'
import 'xe-utils'
import register from './plugin/register'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import VueGridLayout from 'vue-grid-layout'
import ganttastic from './components/gantt/vue-ganttastic'
import { getSystem } from './schema/system'
import { createFn } from './schema/createFn'
import { basicEntity } from './schema/businessTable/basicEntity'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}
basicEntity.prototype.createFn = createFn
const app = createApp(App)
app.config.globalProperties['system'] = getSystem()
app
  .use(VXETable)
  .use(Antd)
  .use(router)
  .use(register)
  .use(VueGridLayout)
  .use(ganttastic)
  // .use(VueMonacoEditorPlugin,)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
