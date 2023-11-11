<template>
  <div>
    <!-- <form-view :data="formData" :items="formItems" titleColon @submit="submitEvent" @reset="resetEvent">
        </form-view> -->
    <!-- <vxe-form :data="formData" :items="formItems" titleColon @submit="submitEvent" @reset="resetEvent">
        </vxe-form> -->
    <vxe-button @click="testClick">button</vxe-button>
    <vxe-input placeholder=""></vxe-input>
    <div v-for="item in testArr" :key="item">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, markRaw, toRaw } from 'vue'
import { VXETable } from 'vxe-table'
import * as electron from 'electron'
const formData = reactive({
  name: '',
  nickname: '',
  sex: '0',
  role: '',
  age: 22,
  val1: [],
  val2: false,
  val3: '',
  flag: false,
  region: '',
})
const formItems = ref([
  {
    title: '左侧',
    span: 12,
    children: [
      {
        field: 'name',
        title: '名称',
        span: 8,
        itemRender: { name: '$input', props: { placeholder: '请输入名称' } },
      },
      {
        field: 'sex',
        title: '性别',
        span: 8,
        itemRender: {
          name: '$select',
          options: [
            { value: '0', label: '女' },
            { value: '1', label: '男' },
          ],
          props: { placeholder: '请选择性别' },
        },
      },
      {
        field: 'role',
        title: '角色',
        span: 8,
        itemRender: { name: '$input', props: { placeholder: '请输入角色' } },
      },
      {
        field: 'age',
        title: '年龄',
        span: 24,
        itemRender: {
          name: '$input',
          props: { type: 'number', placeholder: '请输入年龄' },
        },
      },
      {
        field: 'val1',
        title: '复选框-组',
        span: 12,
        itemRender: {
          name: '$checkbox',
          options: [
            { label: '爬山', value: '11' },
            { label: '健身', value: '22' },
          ],
        },
      },
      {
        field: 'val2',
        title: '复选框',
        span: 12,
        itemRender: { name: '$checkbox' },
      },
      {
        field: 'val3',
        title: '单选框',
        span: 12,
        itemRender: {
          name: '$radio',
          options: [
            { label: '是', value: 'Y' },
            { label: '否', value: 'N' },
          ],
        },
      },
      {
        field: 'flag',
        title: '开关',
        span: 24,
        itemRender: {
          name: '$switch',
          props: { openLabel: '是', closeLabel: '否' },
        },
      },
    ],
  },
  {
    title: '右侧',
    span: 12,
    children: [
      {
        field: 'nickname',
        title: '昵称',
        span: 24,
        itemRender: { name: '$input', props: { placeholder: '请输入昵称' } },
      },
    ],
  },
  {
    align: 'center',
    span: 24,
    itemRender: {
      name: '$buttons',
      children: [
        { props: { type: 'submit', content: '配置式表单', status: 'primary' } },
        { props: { type: 'reset', content: '重置' } },
      ],
    },
  },
])
const submitEvent = () => {
  VXETable.modal.message({ content: '保存成功', status: 'success' })
}
const resetEvent = () => {
  VXETable.modal.message({ content: '重置事件', status: 'info' })
}
const oArr = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
]
const testArr = ref(oArr)
console.log(testArr.value)
function testClick(params: any) {
  //   electron.ipcRenderer.send('message-to-main', {
  //     name: 'xiaofeng',
  //     value: 'xiaoming',
  //   })
  const _arr = toRaw(testArr.value)
  const _arr1 = toRaw(testArr.value)
  //   console.log(_arr1)
  console.log(_arr == oArr)
  electron.ipcRenderer.send('message-to-main', _arr1)
}
electron.ipcRenderer.on('main-to-message', (event, value) => {
  console.log(value, 'testValue')
})
</script>
