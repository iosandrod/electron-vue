<template>
  <div>
    <vxe-button @click="buttonClick">button</vxe-button>
    <template v-if="modalValue">
      <!-- <div v-for="item in arr" :key="item">
        <div>{{ item }}</div>
      </div> -->
      <!-- <index2 :arr="arr"></index2> -->
      <table-view v-bind="gridOptions"></table-view>
      <!-- <vxe-grid v-bind="gridOptions"></vxe-grid> -->
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, toRaw, watchEffect, h, onMounted, onUnmounted } from 'vue'
import { VXETable, VxeGridProps } from 'vxe-table'
import * as electron from 'electron'
import { dialogConfig, tableConfig } from '@/types/schema'
import { SelectProps } from 'ant-design-vue'
import { createDialog } from '@/schema/dialog'
import index2 from './index2.vue'
// const show=ref
const vall = ref(true)
const modalValue = ref(true)

// const dialog = createDialog(filterConfig.props, {}, 'columnFilter')
function buttonClick() {
  modalValue.value = !modalValue.value
}
onMounted(() => {
  console.log('mounted')
})
onUnmounted(() => {
  console.log('unmounted')
})
const gridOptions = reactive<tableConfig>({
  onCellClick: () => { },
  onCellMenu: () => { },
  border: true,
  height: 300,
  columns: [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'name' },
    { field: 'sex', title: 'sex' },
    { field: 'address', title: 'Address' },
  ],
  data: [
    {
      id: 10001,
      name: 'Test1',
      nickname: 'T1',
      role: 'Develop',
      sex: 'Man',
      age: 28,
      address: 'Shenzhen',
    },
    {
      id: 10002,
      name: 'Test2',
      nickname: 'T2',
      role: 'Test',
      sex: 'Women',
      age: 22,
      address: 'Guangzhou',
    },
    {
      id: 10003,
      name: 'Test3',
      nickname: 'T3',
      role: 'PM',
      sex: 'Man',
      age: 32,
      address: 'Shanghai',
    },
    {
      id: 10004,
      name: 'Test4',
      nickname: 'T4',
      role: 'Designer',
      sex: 'Women',
      age: 23,
      address: 'Shenzhen',
    },
    {
      id: 10005,
      name: 'Test5',
      nickname: 'T5',
      role: 'Develop',
      sex: 'Women',
      age: 30,
      address: 'Shanghai',
    },
    {
      id: 10006,
      name: 'Test6',
      nickname: 'T6',
      role: 'Designer',
      sex: 'Women',
      age: 21,
      address: 'Shenzhen',
    },
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
})
</script>
