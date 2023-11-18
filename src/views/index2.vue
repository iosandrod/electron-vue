<template>
  <div>
    <table-view v-bind="gridOptions"></table-view>
    <!-- <div v-for="item in arr" :key="item">
      <div>
        <div>
          {{ item }}
        </div>
        <div>
          {{ item }}
        </div>
        <div>
          {{ item }}
        </div>
        <div>
          {{ item }}
        </div>
        <div>
          {{ item }}
        </div>
      </div>
    </div> -->
    <vxe-button @click="clickFn">button</vxe-button>
    <!-- <vxe-modal
      :model-value="modalValue"
      title="阻止关闭"
      width="400"
      height="200"
      :destroy-on-close="true"
      show-zoom
      esc-closable
      :transfer="true"
      :mask="false"
      resize
      :slots="slots"
      :lock-view="false"
    ></vxe-modal> -->
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from '@/types/schema'
import { h, reactive, ref, onUnmounted } from 'vue'
onUnmounted(() => {
  modalValue.value = false
})
type indexProp = {
  arr: Array<number>
}
const props = defineProps<indexProp>()
const arr = props.arr
const slots = {
  default: (params: any) => {
    const arr = Array(1000)
      .fill(0)
      .map((v, i) => i)
    return h(
      'div',
      {},
      arr.map((v) => h('div', {}, [v])),
    )
  },
}
const modalValue = ref(true)
// setTimeout(() => {
//   modalValue.value = false
// }, 8000)
const gridOptions = reactive<tableConfig>({
  onCellClick: () => {},
  onCellMenu: () => {},
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
function clickFn() {
  console.log('clickFn')
  modalValue.value = false
}
</script>

<style scoped></style>
