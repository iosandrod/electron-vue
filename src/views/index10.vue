<template>
  <div class="w-full h-full" id="">
    <div class="w-full h-full" ref="container">
      <input-view :inputInstance="input"></input-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createPage, nodeConfig } from '@/schema/businessTable/pageTree'
import tableView from '@/schema/schemaComponent/tableView'
import { createTable } from '@/schema/table'
import {
  computed,
  getCurrentInstance,
  h,
  isProxy,
  nextTick,
  onMounted,
  reactive,
  ref,
  vShow,
  withDirectives,
} from 'vue'
import { createMainEntity } from '@/schema/businessTable/mainEntity'
import { getTableConfig } from '@/api/httpApi'
import { _columns } from '@/schema/entityColumn'
import { mainEntity } from '@/schema/businessTable/mainEntity'
import Mousetrap from 'mousetrap'
import { tableData, tableData2 } from '@/api/data'
import { tableData3 } from '@/api/data2'
import { createDialog, confirm } from '@/schema/dialog'
import { createInput } from '@/schema/input'
import { http } from '@/schema/http'
import { createMenu } from '@/schema/menu'
import { menuData, } from '@/api/data3'
import { testTableViewData } from '@/api/data5'
import { createContextMenu } from '@/schema/businessTable/contextMenu'
import { useLocalStorage } from '@vueuse/core'
import { RouteRecordSingleView } from 'vue-router'
import entityView from '@/schema/schemaComponent/entityView'
import Index9 from './index9.vue'
import { VxeInput } from 'vxe-table'
import { createForm } from '@/schema/form'
import { treeTableConfig } from '@/api/data6'
import * as monaco from 'monaco-editor'
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
// const container = ref(null)
// self.MonacoEnvironment = {
//   getWorker(_, label) { 
//     if (label === 'json') {
//       return new jsonWorker()
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return new cssWorker()
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return new htmlWorker()
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return new tsWorker()
//     }
//     return new editorWorker()
//   }
// }
const { proxy: instance } = getCurrentInstance()!
const input = createInput({
  //@ts-ignore
  type: "codeEdit",
  field: "test"
})
onMounted(() => {
  // console.log(monaco, 'testCo')
  // const divIns = (instance?.$refs.container) as any
  // const edit = monaco.editor.create(divIns, {
  //   value: "function hello() {\n\talert('Hello world!');\n}",
  //   language: 'javascript',
  // })
  // edit.onDidChangeModelContent((value) => {
  //   const context = edit.getValue()
  //   console.log(context, 'testContext')
  // })
  // console.log(edit, 'testEdit')
})
</script>

<style scoped></style>
