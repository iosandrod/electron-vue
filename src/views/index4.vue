<template>
  <div>
    <vxe-button @click="btnClick">button</vxe-button>
    <template v-if="modalValue">
      <!-- <form-view
        :data="formData"
        :items="formItems"
        titleColon
        @submit="submitEvent"
        @reset="resetEvent"
      ></form-view> -->
      <table-view v-bind="options"></table-view>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { VXETable, VxeFormPropTypes, VxeFormEvents } from 'vxe-table'
const modalValue = ref(true)
function btnClick() {
  modalValue.value = !modalValue.value
}
interface FormDataVO {
  name: string
  nickname: string
  sex: string
  role: string
  fat: boolean
  age: number
  val1: string[]
  val2: boolean
  val3: string
  flag: boolean
  region: string
}

const formData = reactive<any>({
  name: '111',
  nickname: '111',
  sex: '1111',
  role: '1111',
  fat: true,
})

const formItems = ref<any>([
  {
    field: 'name',
    title: '名称',
    span: 8,
    type: 'string',
    itemRender: { name: '$input', props: { placeholder: '请输入名称' } },
  },
  {
    field: 'sex',
    title: '性别',
    span: 8,
    type: 'select',
    options: [
      { value: '0', label: '女' },
      { value: '1', label: '男' },
    ],
  },
  {
    field: 'role',
    title: '角色',
    span: 8,
    type: 'string',
    itemRender: { name: '$input', props: { placeholder: '请输入角色' } },
  },
  {
    field: 'birthday',
    title: '生日',
    type: 'datetime',
    span: 8,
  },
  {
    field: 'fat',
    title: '吖吖',
    type: 'bool',
    span: 8,
  },
])
const options = reactive({
  onCellClick: () => {},
  onCellMenu: () => {},
  border: true,
  height: '400px',
  columnConfig: {
    resizable: false,
  },
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
const submitEvent: VxeFormEvents.Submit = () => {
  VXETable.modal.message({ content: '保存成功', status: 'success' })
}

const resetEvent: VxeFormEvents.Reset = () => {
  VXETable.modal.message({ content: '重置事件', status: 'info' })
}
</script>
