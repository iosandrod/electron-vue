<template>
  <div>
    <vxe-button @click="btnClick">button</vxe-button>
    <template v-if="showValue">
      <layoutGridView :pageTree="pageTree"></layoutGridView>
      <!-- <table-view v-bind="nodeArr[0].nodeData"></table-view> -->
      <!-- <component :is="com"></component> -->
      <!-- <table-view :tableInstance="table"></table-view> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import { createPage, nodeConfig } from '@/schema/businessTable/pageTree'
import layoutGridView from '@/schema/schemaComponent/layoutGridView'
import tableView from '@/schema/schemaComponent/tableView'
import { createTable } from '@/schema/table'
import { tableConfig } from '@/types/schema'
import { h, reactive, ref } from 'vue'
const showValue = ref(false)
function btnClick() {
  showValue.value = !showValue.value
}
const nodeArr: Array<nodeConfig> = reactive([
  {
    nodeConfig: { x: 0, y: 0, w: 2, h: 2, i: '0', nodeName: 'tableView' },
    nodeData: {
      onCellClick: () => {},
      onCellMenu: () => {},
      border: true,
      columnConfig: {
        resizable: false,
      },
      columns: [
        { field: 'name', title: 'name' },
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
  //   { nodeConfig: { x: 6, y: 0, w: 2, h: 3, i: '3' }, nodeData: {} },
  //   { nodeConfig: { x: 8, y: 0, w: 2, h: 3, i: '4' }, nodeData: {} },
  //   { nodeConfig: { x: 10, y: 0, w: 2, h: 3, i: '5' }, nodeData: {} },
  //   { nodeConfig: { x: 0, y: 5, w: 2, h: 5, i: '6' }, nodeData: {} },
  //   { nodeConfig: { x: 2, y: 5, w: 2, h: 5, i: '7' }, nodeData: {} },
  //   { nodeConfig: { x: 4, y: 5, w: 2, h: 5, i: '8' }, nodeData: {} },
  //   { nodeConfig: { x: 6, y: 4, w: 2, h: 4, i: '9' }, nodeData: {} },
  //   { nodeConfig: { x: 8, y: 4, w: 2, h: 4, i: '10' }, nodeData: {} },
  //   { nodeConfig: { x: 10, y: 4, w: 2, h: 4, i: '11' }, nodeData: {} },
  //   { nodeConfig: { x: 0, y: 10, w: 2, h: 5, i: '12' }, nodeData: {} },
  //   { nodeConfig: { x: 2, y: 10, w: 2, h: 5, i: '13' }, nodeData: {} },
  //   { nodeConfig: { x: 4, y: 8, w: 2, h: 4, i: '14' }, nodeData: {} },
  //   { nodeConfig: { x: 6, y: 8, w: 2, h: 4, i: '15' }, nodeData: {} },
  //   { nodeConfig: { x: 8, y: 10, w: 2, h: 5, i: '16' }, nodeData: {} },
  //   { nodeConfig: { x: 10, y: 4, w: 2, h: 2, i: '17' }, nodeData: {} },
  //   { nodeConfig: { x: 0, y: 9, w: 2, h: 3, i: '18' }, nodeData: {} },
  //   { nodeConfig: { x: 2, y: 6, w: 2, h: 2, i: '19' }, nodeData: {} },
])
const com = h(tableView, nodeArr[0].nodeData)
const pageTree = createPage(nodeArr)
const table = createTable(nodeArr[0].nodeData)
//律师
//回应
</script>

<style scoped></style>
