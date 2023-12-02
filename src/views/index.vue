<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, toRaw, watchEffect } from 'vue'
import { VXETable, VxeGridProps } from 'vxe-table'
import * as electron from 'electron'
import { tableConfig } from '@/types/schema'
import { SelectProps } from 'ant-design-vue'
const modalValue = ref(true)
const formData = ref({
  name: 'xiaofeng',
  sex: '0',
  role: 'shutiao',
  job: 'teacher',
})
function buttonClick() {
  modalValue.value = !modalValue.value
}
// watchEffect(() => {
//   console.log(JSON.stringify(formData.value))
// })
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

const value = ref<string | undefined>(undefined)
</script>
