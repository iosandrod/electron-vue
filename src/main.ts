import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
import './samples/node-api'
import "vxe-table/lib/style.css"
import '@quasar/extras/material-icons/material-icons.css'
import "@/style/index.scss"
import "@/style/vxe-table/index.scss"
// import 'quasar/src/css/index.sass'
import "@/style.css"
import { Quasar } from 'quasar'
import XEUtils from 'xe-utils'
import VXETable from 'vxe-table'
import router from './router'
import 'xe-utils'
import register from './plugin/register'
createApp(App)
  .use(Quasar, {})
  .use(VXETable)
  .use(router)
  .use(register)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })