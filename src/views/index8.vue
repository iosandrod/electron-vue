<template>
  <div class="w-full h-full overflow-auto">
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
    <div style="" class="w-full h-full" v-if="showValue">
      <!-- <input-view v-model="testValue" :inputInstance="_input"></input-view> -->
      <instance-view :instance="_form"></instance-view>
      <!-- <codeEditCom :inputInstance="_input" :style="{
        height: '500px',
        width: '1200px',
      }"></codeEditCom> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { createPage, nodeConfig } from '@/schema/businessTable/pageTree'
import tableView from '@/schema/schemaComponent/tableView'
import { createTable } from '@/schema/table'
import testIndex from './index12'
import { codeEditCom } from '@/schema/editClass/codeEdit'
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
import { inputComItems } from '@/schema/entityDesignCom/inputCom'
const entity = ref(null)
const testValue = ref('')
const _entity = createMainEntity('t_SdOrder', null)
const { proxy: instance } = getCurrentInstance()!

function inputChange({ value }: any) {
  _menu.inputChange()
}
const showValue = ref(true)
const _inputConfig = reactive({
} as any)
_inputConfig.type = 'codeEdit'
//@ts-ignore
const value = ref('1111')
_inputConfig.modelValue = computed(() => {
  return value.value
})
_inputConfig['onChange'] = (value1: any) => {
  console.log(value.value)
}
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
  _entity1.getTableData()
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
async function btnClick9(params: any) {
  if (state == true) {
    _entity.setEntityEdit('fullEdit')
  } else {
    _entity.setEntityEdit('scan')
  }
  state = !state
}
async function btnClick10() {
  if (state == true) {
    table.tableConfig.columns.forEach((col: any) => {
      if (col.columnConfig.editType == 'select') {
        col.columnConfig.options = [{ label: 'sfdsf11', value: 'sdfsdf11' }]

      }
    })
  } else {
    table.tableConfig.columns.forEach((col: any) => {
      if (col.columnConfig.editType == 'select') {
        col.columnConfig.options = [{ label: 'sfdsf11', value: 'sdfsdf11' }]
      }
    })
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
let _testTableViewData = reactive(testTableViewData)
const table = createTable(_testTableViewData)
table.tableState = 'fullEdit'
// const _form = createForm()
//律师
const _form = createForm({
  items: inputComItems as any,
})
//回应 

function btnClick3() { }
</script>

<style scoped></style>
