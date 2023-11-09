import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
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
createApp(App)
  .use(VXETable)
  .use(Antd)
  .use(router)
  .use(register)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })