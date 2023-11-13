<template>
  <div>
    <form-view :data="formData" :items="formItems" titleColon></form-view>
    <!-- <vxe-form :data="formData" :items="formItems" titleColon @submit="submitEvent" @reset="resetEvent">
        </vxe-form> -->
    <!-- <vxe-button @click="testClick">button</vxe-button>
    <vxe-input placeholder=""></vxe-input>
    <div v-for="item in testArr" :key="item">{{ item }}</div> -->
    <!-- <a-select
      v-model:value="value"
      show-search
      placeholder="Select a person"
      style="width: 200px;"
      :options="options"
      :filter-option="filterOption"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    ></a-select> -->
    <table-view v-bind="gridOptions"></table-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, toRaw, watchEffect } from 'vue'
import { VXETable, VxeGridProps } from 'vxe-table'
import * as electron from 'electron'
import { tableConfig } from '@/types/schema'
import { SelectProps } from 'ant-design-vue'
const formData = ref({
  name: 'xiaofeng',
  sex: '0',
  role: 'shutiao',
  job: 'teacher',
})

watchEffect(() => {
  console.log(JSON.stringify(formData.value))
})
const formItems = ref([
  {
    field: 'name',
    title: '名称',
    span: 8,
    type: 'string',
    placeholder: '请输入名称',
  },
  {
    field: 'sex',
    title: '性别',
    type: 'select',
    span: 8,
    options: [
      { value: '0', label: '女' },
      { value: '1', label: '男' },
    ],
  },
  {
    field: 'role',
    title: '角色',
    span: 8,
  },
  {
    field: 'job',
    type: 'baseInfo',
    title: '工作',
    span: 8,
  },
])
// setTimeout(() => {
//   formItems.value[1].type = 'select'
// }, 3000)

const options = ref<SelectProps['options']>([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
])
const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}
const handleBlur = () => {
  console.log('blur')
}
const handleFocus = () => {
  console.log('focus')
}
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
const gridOptions = reactive<tableConfig>({
  onCellClick: () => {
    console.log('cellClick111')
  },
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
const value = ref<string | undefined>(undefined)
</script>
