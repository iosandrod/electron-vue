<template>
  <div>
    <vxe-button @click="btnClick">button</vxe-button>
    <vxe-button @click="btnClick1">btnClick1</vxe-button>
    <vxe-button @click="btnClick2">btnClick2</vxe-button>
    <vxe-button @click="btnClick3">button</vxe-button>
    <!-- <layoutGridView :pageTree="pageTree"></layoutGridView> -->
    <!-- <form-view :items="formItems" :data="formData"></form-view> -->
    <div style="width: 100%; height: 100px;" v-if="showValue">
      <!-- <table-view ref="tableView1" :tableInstance="table"></table-view> -->
      <!-- <gantt></gantt> -->
      <!-- <component :is="com"></component> -->
      <!-- <component :is="table.component"></component> -->
      <!-- <table-view :tableInstance="table"></table-view> -->
      <entity-view ref="entity" :entityInstance="_entity"></entity-view>
      <!-- <component :is="vNode"></component> -->
      <!-- <layout-grid-view :pageTree="mainEntity.pageTree"></layout-grid-view> -->
      <!-- <template v-if="mainEntity.displayState != 'destroy'"></template> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { createPage, nodeConfig } from '@/schema/businessTable/pageTree'
import layoutGridView from '@/schema/schemaComponent/layoutGridView'
import tableView from '@/schema/schemaComponent/tableView'
import { createTable } from '@/schema/table'
import { StyleType, tableConfig } from '@/types/schema'
import { getCurrentInstance, h, onMounted, reactive, ref } from 'vue'
import gantt from '@/components/gantt/GanttPlayground.vue'
import { createMainEntity } from '@/schema/businessTable/mainEntity'
import { getTableConfig } from '@/api/httpApi'
import { Keyboard } from 'vxe-table'
import { KeyboardEvent } from 'electron'
import { _columns } from '@/schema/entityColumn'
import { mainEntity } from '@/schema/businessTable/mainEntity'
import Mousetrap from 'mousetrap'
import { tableData, tableData2 } from '@/api/data'
import { tableData3 } from '@/api/data2'
import { createDialog, confirm } from '@/schema/dialog'
// console.log(_columns, 'testColumns')
const entity = ref(null)
const _entity = createMainEntity('t_SdOrder', null)
const { proxy: instance } = getCurrentInstance()!
// onMounted(() => {
//   console.log(instance.$refs.tableView1, 'testTableDiv')
// })
const showValue = ref(true)
async function btnClick() {
  showValue.value = !showValue.value
  // let data = await getTableConfig('123')
}
function btnClick2() {
  let _entity: any = instance?.$refs.entity
  const _entity1 = _entity?.entity
  _entity1.getPageData()
}
let state = false
function btnClick1() {
  // if (table.tableState == 'scan') {
  //   table.tableState = 'fullEdit'
  // } else {
  //   table.tableState = 'scan'
  // }
  //@ts-nocheck
  const _entity: any = instance?.$refs.entity
  const _entity1 = _entity.entity as mainEntity
  // console.log(_entity1, 'testEntity')
  // console.log(_entity)
  // _entity1.layoutConfig.isDraggable = !_entity1.layoutConfig.isDraggable
  // _entity1.layoutConfig.isResizable = !_entity1.layoutConfig.isResizable
  // let tableState = _entity1.pageRef.vxeGrid.tableState
  // if (tableState == 'scan') {
  //   _entity1.pageRef.vxeGrid.setTableEdit('fullEdit')
  // } else {
  //   _entity1.pageRef.vxeGrid.setTableEdit('scan')
  // }
  // _entity1.layoutConfig.isDraggable = !_entity1.layoutConfig.isDraggable
  // _entity1.layoutConfig.isResizable = !_entity1.layoutConfig.isResizable
  // const dEntity=_entity
  // pageTree
  const dEntity = _entity1.getDetailEntity('t_SdOrderEntry')
  dEntity.setCurrentEntityDesign(!state)
}
Mousetrap.bind('ctrl+left', function () {
  console.log('ctrl a')
})
const nodeArr: Array<nodeConfig> = reactive([
  {
    nodeConfig: { x: 0, y: 0, w: 2, h: 2, i: '1', nodeName: 'tableView' },
    nodeData: {
      onCellClick: () => {},
      onCellMenu: () => {},
      border: true,
      height: '400px',
      columnConfig: {
        resizable: true,
      },
      columns: _columns(),
      data: tableData2,
    } as tableConfig,
  },
  {
    nodeConfig: { x: 2, y: 0, w: 2, h: 4, i: '1', nodeName: '' },
    nodeData: {},
  },
  {
    nodeConfig: { x: 4, y: 0, w: 2, h: 5, i: '2', nodeName: '' },
    nodeData: {},
  },
])
const com = h(tableView, nodeArr[0].nodeData)
// const pageTree = createPage(nodeArr)
const table = createTable(nodeArr[0].nodeData)
//律师
//回应
const formData = ref({
  name: 'xiaofeng',
  sex: '0',
  role: 'shutiao',
  job: 'teacher',
})
const formItems = ref([
  {
    field: 'name',
    title: '名称',
    span: 8,
    type: 'string',
    placeholder: '请输入名称',
    layout: { x: 0, y: 0, w: 2, h: 2, i: '0', nodeName: 'tableView' },
  },
  {
    field: 'sex',
    title: '性别',
    type: 'select',
    span: 8,
    layout: { x: 2, y: 0, w: 2, h: 4, i: '1', nodeName: '' },
    options: [
      { value: '0', label: '女' },
      { value: '1', label: '男' },
    ],
  },
  {
    field: 'role',
    type: 'baseInfo',
    title: '角色',
    span: 8,
    layout: { x: 4, y: 0, w: 2, h: 5, i: '2', nodeName: '' },
  },
  // {
  //   field: 'job',
  //   type: 'baseInfo',
  //   title: '工作',
  //   span: 8,
  // },
])
function btnClick3() {
  // console.log('btnClick3')
  // const _dialog = createDialog('confirmBox', {
  //   message: '是否执行',
  //   height: '200px',
  //   width: '200px',
  // })
  // console.log(_dialog, 'testDialog')
  // _dialog.open()
  // confirm({})
}
// const mainEntity = createMainEntity({})
onMounted(() => {})
const vNode = h(
  'div',
  {
    ref: 'testDiv',
    style: { width: '100px', height: '100px', background: 'red' } as StyleType,
    class: ['h-10', 'w-10', 'bg-red'],
    onVnodeMounted: [
      (vNode) => {
        // const { proxy: instance } = getCurrentInstance()!
        // const instance = getCurrentInstance()!
        // console.log(instance, 'testInstance')
        console.log(vNode, 'testVNode')
        // const $refs = instance?.$refs as any
        // const testDiv = $refs.testDiv
        // console.log(testDiv)
        // console.log('mounted')
      },
    ],
  },
  [
    h(tableView, {
      ...nodeArr[0].nodeData,
      onVnodeMounted: (vNode: any) => {
        console.log('testTableVNode', vNode)
      },
    }),
  ],
)
// console.log(mainEntity)
</script>

<style scoped></style>
