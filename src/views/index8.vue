<template>
  <div @contextmenu="contextMenu.openContext($event)" class="w-full h-full overflow-auto">
    <vxe-button @click="btnClick">button</vxe-button>
    <vxe-button @click="btnClick1">btnClick1</vxe-button>
    <vxe-button @click="btnClick2">btnClick2</vxe-button>
    <vxe-button @click="btnClick3">btnClick3</vxe-button>
    <vxe-button @click="btnClick4">btnClick4</vxe-button>
    <vxe-button @click="btnClick5">btnClick5</vxe-button>
    <vxe-button @click="btnClick6">merge</vxe-button>
    <vxe-button @click="btnClick7">local</vxe-button>
    <vxe-button @click="btnClick8">login</vxe-button>
    <vxe-button @click="btnClick9">route9</vxe-button>
    <vxe-button @click="btnClick10">route10</vxe-button>
    <!-- <vxe-input
      @change="inputChange"
      v-model="_menu.menuConfig.inputValue"
    ></vxe-input> -->
    <!-- <layoutGridView :pageTree="pageTree"></layoutGridView> -->
    <!-- <form-view :items="formItems" :data="formData"></form-view> -->
    <!-- <div class="w-10 h-10 bg-red-700">123</div> -->
    <!-- <component :is="vNode"></component> -->
    <div style="" class="w-full h-full" v-if="showValue">
      <!-- <div
        class="relative w-full h-full mt-8 bg-red-500 ml-11"
        style="
          transform: translateX(50px);
          position: relative; /* 设置相对定位 */
        "
      >
        <teleport to="body" :disabled="false">
          <div class="fixed top-0 left-0 bg-blue-800 w-9 h-9"></div>
        </teleport>
        <context-menu-view
          :contextMenuInstance="contextMenu"
        ></context-menu-view>
      </div> -->
      <!-- <table-view ref="tableView1" :tableInstance="table"></table-view> -->
      <!-- <gantt></gantt> -->
      <!-- <form-view :formInstance="_form"></form-view> -->
      <!-- <component :is="com"></component> -->
      <!-- <component :is="table.component"></component> -->
      <table-view :tableInstance="table"></table-view>
      <!-- <table-view
        :columns="table.tableConfig.columns.map((col) => col.renderColumn)"
        :data="table.tableData.data"
        :height="100"
        :scrollX="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
        :scrollY="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
      ></table-view> -->
      <!-- <table-view
        :columns="testTableViewData.columns"
        :data="testTableViewData.data"
        :scrollX="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
        :scrollY="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
        :height="100"
      ></table-view> -->
      <!-- <input-view v-model="testValue" :inputInstance="_input"></input-view> -->
      <!-- <entity-view ref="entity" :entityInstance="_entity"></entity-view> -->
      <!-- <component :is="vNode"></component> -->
      <!-- <menu-view :menuInstance="_menu"></menu-view> -->
      <!-- <layout-grid-view :pageTree="mainEntity.pageTree"></layout-grid-view> -->
      <!-- <template v-if="mainEntity.displayState != 'destroy'"></template> -->
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
import { menuData, tableMenuData, } from '@/api/data3'
import { testTableViewData } from '@/api/data5'
import { createContextMenu } from '@/schema/businessTable/contextMenu'
import { useLocalStorage } from '@vueuse/core'
import { RouteRecordSingleView } from 'vue-router'
import entityView from '@/schema/schemaComponent/entityView'
import Index9 from './index9.vue'
import { VxeInput } from 'vxe-table'
import { createForm } from '@/schema/form'
const entity = ref(null)
const testValue = ref('')
const _entity = createMainEntity('t_SdOrder', null)
const { proxy: instance } = getCurrentInstance()!
const _menu = createMenu({
  data: JSON.parse(JSON.stringify(menuData)),
  key: 'id',
  parentKey: 'parentId', //
  titleKey: 'menuName',
  rootKey: '0',
  rootTitle: '系统菜单',
} as any)
const contextMenu = createContextMenu({
  list: JSON.parse(JSON.stringify(tableMenuData)),
})
function inputChange({ value }: any) {
  _menu.inputChange()
}
const showValue = ref(true)
// const vNode = h('div', {
//   // 通过directives属性设置v-show指令
//   class: ['h-10 w-10 bg-red-700'],
//   directives: [
//     {
//       name: 'v-show',
//       value: showValue.value,
//     },
//   ],
// })
const _inputConfig = reactive({
} as any)
//@ts-ignore
const value = ref('1111')
_inputConfig.modelValue = computed(() => {
  return value.value
})
_inputConfig['onChange'] = (value1: any) => {
  console.log(value.value)
}
// _inputConfig.onChange = (value1: any) => {
//   //@ts-ignore
//   // console.log(value1, 'testValue')
//   // console.log(_inputConfig.modelValue) 
//   nextTick(() => {
//     console.log(value.value, 'changeValue')
//   })
// }
const _data = reactive({
  name: '',
  nickname: '',
  sex: '0',
  role: '',
  age: '',
  val1: '[]',
  val2: 'false',
  val3: '',
  flag: 'false',
  region: ''
})
const formConfig = reactive({
  data: _data,
  items: [{
    field: 'name', type: "select", options: [{
      key: "xiaofeng",
      value: "晓峰"
    }, {
      key: "xiaoming",
      value: "小明"
    }], title: '名称', span: 6, onChange: (): void => { console.log(_data) }
  },
  { field: 'sex', type: 'baseInfo', title: '性别', span: 6, onChange: () => { console.log(_data) } },
  { field: 'role', type: 'string', title: '角色', span: 6, onChange: () => { console.log(_data) } },
  { field: 'age', type: 'string', title: '年龄', span: 6, onChange: () => { console.log(_data) } },
  { field: 'val1', type: 'string', title: '复选框-组', span: 6, onChange: () => { console.log(_data) } },
  { field: 'val2', type: 'string', title: '复选框', span: 6, onChange: () => { console.log(_data) } },
  { field: 'val3', type: 'string', title: '单选框', span: 6, onChange: () => { console.log(_data) } },
  { field: 'flag', type: 'string', title: '开关', span: 6, onChange: () => { console.log(_data) } },
  { field: 'region', type: 'string', title: '地区', span: 6, onChange: () => { console.log(_data) } },
  ]
})
// const _form = createForm(formConfig)
const vNode = h(VxeInput, { modelValue: '123123' })
const _input = createInput(_inputConfig)
_input.getData = () => {
  return value
}
_input.getField = () => {
  return 'value'
}

async function btnClick() {
  showValue.value = !showValue.value
}
function btnClick2() {
  let _entity: any = instance?.$refs.entity
  const _entity1 = _entity?.entity
  _entity1.getPageData()
}
let state = false
function btnClick1() {
  const _entity: any = instance?.$refs.entity
  const _entity1 = _entity.entity as mainEntity
  _entity1.layoutConfig.isDraggable = !_entity1.layoutConfig.isDraggable
  _entity1.layoutConfig.isResizable = !_entity1.layoutConfig.isResizable
}
function btnClick5() {
  table.setMergeConfig()
}
function btnClick6() {
  _entity.setMergeConfig()
}
function btnClick4() {
  const _entity: any = instance?.$refs.entity
  const _entity1 = _entity.entity as mainEntity
  const vxeGrid = _entity1.pageRef.vxeGrid!
  if (vxeGrid.displayState == 'show') {
    vxeGrid.displayState = 'destroy'
  } else {
    vxeGrid.displayState = 'show'
  }
}
const localValue = useLocalStorage('value', 'xiaofeng')
async function btnClick7() {
  const tableName = 't_SdOrder'
  const url = `/api/builder/LoadTableInfo?tableName=${tableName}`
  const _data = await http.postZkapsApi(url)
  console.log(_data)
}
function btnClick8() {
  // localStorage.setItem('value', 'xiaoming')
  http.login()
}
// async function btnClick9() {
//   const $router = instance?.$router!
//   const entity1 = createMainEntity('t_SdOrder')
//   const obj = {
//     component: Index9 as any,
//     path: '/index9',
//     props: () => {
//       return { testProps: 'xiaofeng', entityInstance: entity1 }
//     },
//   } as RouteRecordSingleView
//   $router.addRoute('index', obj)
//   nextTick(() => {
//     $router.push({
//       path: '/index9',
//     })
//   })
// }
async function btnClick9(params: any) {
  // formConfig.data = {}
  // _form.formConfig.data = {}
  if (state == true) {
    _entity.setTableEdit('fullEdit')
  } else {
    _entity.setTableEdit('scan')
  }
  state = !state
}
async function btnClick10() {
  if (state == true) {
    // _testTableViewData.columns[0].editType = 'string'
    // table.changeColumnEditType('name', 'string')
    table.tableConfig.columns.forEach((col: any) => {
      if (col.columnConfig.editType == 'select') {
        col.columnConfig.options = [{ label: 'sfdsf11', value: 'sdfsdf11' }]
        // col.options = [{ label: 'sfdsf', value: 'sdfsdf' }]
        // col.renderFormitem.options.push({ label: "sdfsdf", value: 'sdfsd' })
        // col.renderFormitem.options = [{ label: "sdfsdf", value: 'sdfsd' }]

      }
    })
  } else {
    table.tableConfig.columns.forEach((col: any) => {
      if (col.columnConfig.editType == 'select') {
        col.columnConfig.options = [{ label: 'sfdsf11', value: 'sdfsdf11' }]
        // col.renderFormitem.options.push({ label: "sdfsdf", value: 'sdfsd' })
        // col.renderFormitem.options = [{ label: "sdfsdf", value: 'sdfsd' }]
      }
    })
    // _testTableViewData.columns[0].editType = 'baseInfo'
    // table.changeColumnEditType('name', 'select')
  }
  state = !state
}
Mousetrap.bind('ctrl+left', function () {
  console.log('ctrl a')
})
const nodeArr: Array<nodeConfig> = reactive([
  {
    nodeConfig: { x: 2, y: 0, w: 2, h: 4, i: '1', nodeName: '' },
    nodeData: {},
  },
  {
    nodeConfig: { x: 4, y: 0, w: 2, h: 5, i: '2', nodeName: '' },
    nodeData: {},
  },
])
// const com = h(tableView, nodeArr[0].nodeData)
// const pageTree = createPage(nodeArr)
let _testTableViewData = reactive(testTableViewData)
const table = createTable(_testTableViewData)
table.tableState = 'fullEdit'

//律师
//回应 

function btnClick3() { }
</script>

<style scoped></style>
