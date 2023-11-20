<template>
  <div>
    <vxe-button @click="btnClick">button</vxe-button>
    <vxe-button @click="btnClick1">button</vxe-button>
    <!-- <layoutGridView :pageTree="pageTree"></layoutGridView> -->
    <!-- <table-view v-bind="nodeArr[0].nodeData"></table-view> -->
    <!-- <component :is="com"></component> -->
    <table-view :tableInstance="table"></table-view>
    <!-- <form-view :items="formItems" :data="formData"></form-view> -->
    <template v-if="showValue">
      <template v-if="mainEntity.displayState != 'destroy'">
        <!-- <layout-grid-view :pageTree="mainEntity.pageTree"></layout-grid-view> -->
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { createPage, nodeConfig } from '@/schema/businessTable/pageTree'
import layoutGridView from '@/schema/schemaComponent/layoutGridView'
import tableView from '@/schema/schemaComponent/tableView'
import { createTable } from '@/schema/table'
import { tableConfig } from '@/types/schema'
import { h, onMounted, reactive, ref } from 'vue'
import { createMainEntity } from '@/schema/businessTable/mainEntity'
import { getTableConfig } from '@/api/httpApi'
const showValue = ref(true)
async function btnClick() {
  // showValue.value = !showValue.value
  let data = await getTableConfig('123')
  console.log(data)
}
function btnClick1() {
  if (table.tableState == 'scan') {
    table.tableState = 'singleRowEdit'
  } else {
    table.tableState = 'scan'
  }
}
const nodeArr: Array<nodeConfig> = reactive([
  {
    nodeConfig: { x: 0, y: 0, w: 2, h: 2, i: '1', nodeName: 'tableView' },
    nodeData: {
      onCellClick: () => {},
      onCellMenu: () => {},
      border: true,
      columnConfig: {
        resizable: false,
      },
      columns: [
        { field: 'name', title: 'name', type: 'string', editType: 'baseInfo' },
        { field: 'sex', title: 'sex' },
        { field: 'address', title: 'Address' },
      ],
      data: [
        {
          id: 10007,
          name: 'Test7',
          nickname: 'T7',
          role: 'Test',
          sex: 'Man',
          age: 29,
          address: 'Shenzhen',
        },
        {
          id: 10008,
          name: 'Test8',
          nickname: 'T8',
          role: 'Develop',
          sex: 'Man',
          age: 35,
          address: 'Shenzhen',
        },
        {
          id: 10008,
          name: 'Test8',
          nickname: 'T8',
          role: 'Develop',
          sex: 'Man',
          age: 35,
          address: 'Shenzhen',
        },
        {
          id: 10008,
          name: 'Test8',
          nickname: 'T8',
          role: 'Develop',
          sex: 'Man',
          age: 35,
          address: 'Shenzhen',
        },
        {
          id: 10008,
          name: 'Test8',
          nickname: 'T8',
          role: 'Develop',
          sex: 'Man',
          age: 35,
          address: 'Shenzhen',
        },
      ],
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
const pageTree = createPage(nodeArr)
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

const mainEntity = createMainEntity({})
onMounted(() => {})
console.log(mainEntity)
</script>

<style scoped></style>
