<template>
  <div @contextmenu="contextMenu.openContext($event)" class="flex flex-col w-full h-full ">
    <vxe-button @click="btnClick">button</vxe-button>

    <!-- <vxe-input
      @change="inputChange"
      v-model="_menu.menuConfig.inputValue"
    ></vxe-input> -->
    <!-- <layoutGridView :pageTree="pageTree"></layoutGridView> -->
    <!-- <form-view :items="formItems" :data="formData"></form-view> -->
    <!-- <div class="w-10 h-10 bg-red-700">123</div> -->
    <!--  <table-view :tableInstance="table"></table-view> -->

    <!-- <component :is="vNode"></component> -->
    <div style="" class="flex-1 w-full" v-if="showValue">
      <!-- <div
        class="relative w-full h-full mt-8 bg-red-500 ml-11"
        style="
          transform: translateX(50px);
          position: relative; /* 设置相对定位 */
        "
      >
        <teleport to="body" :disabled="false">
          <div class="fixed top-0 left-0 bg-blue-800 w-9 h-9"></div>
        </teleport>
        <context-menu-view
          :contextMenuInstance="contextMenu"
        ></context-menu-view>
      </div> -->
      <!-- <table-view ref="tableView1" :tableInstance="table"></table-view> -->
      <!-- <gantt></gantt> -->
      <!-- <form-view :formInstance="_form"></form-view> -->
      <!-- <component :is="com"></component> -->
      <!-- <component :is="table.component"></component> -->
      <table-view :tableInstance="table1"></table-view>
      <!-- <table-view
        :columns="table.tableConfig.columns.map((col) => col.renderColumn)"
        :data="table.tableData.data"
        :height="100"
        :scrollX="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
        :scrollY="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
      ></table-view> -->
      <!-- <table-view
        :columns="testTableViewData.columns"
        :data="testTableViewData.data"
        :scrollX="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
        :scrollY="{
          enabled: true,
          mode: 'default',
          gt: 0,
        }"
        :height="100"
      ></table-view> -->
      <!-- <input-view v-model="testValue" :inputInstance="_input"></input-view> -->
      <!-- <entity-view ref="entity" :entityInstance="_entity"></entity-view> -->
      <!-- <component :is="vNode"></component> -->
      <!-- <menu-view :menuInstance="_menu"></menu-view> -->
      <!-- <layout-grid-view :pageTree="mainEntity.pageTree"></layout-grid-view> -->
      <!-- <template v-if="mainEntity.displayState != 'destroy'"></template> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { createPage, nodeConfig } from '@/schema/businessTable/pageTree'
import tableView from '@/schema/schemaComponent/tableView'
import { createTable } from '@/schema/table'
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
import { treeTableConfig } from '@/api/data6'
const entity = ref(null)
const testValue = ref('')
const _entity = createMainEntity('t_SdOrder', null)
const { proxy: instance } = getCurrentInstance()!
const _menu = createMenu({
  data: JSON.parse(JSON.stringify(menuData)),
  key: 'id',
  parentKey: 'parentId', //
  titleKey: 'menuName',
  rootKey: '0',
  rootTitle: '系统菜单',
} as any)
const contextMenu = createContextMenu({
  list: [],
})
function inputChange({ value }: any) {
  _menu.inputChange()
}
function btnClick() {

}
const showValue = ref(true)
// const vNode = h('div', {
//   // 通过directives属性设置v-show指令
//   class: ['h-10 w-10 bg-red-700'],
//   directives: [
//     {
//       name: 'v-show',
//       value: showValue.value,
//     },
//   ],
// })

let _testTableViewData = reactive(treeTableConfig)
const table = createTable(_testTableViewData)

let _testTableViewData1 = reactive(testTableViewData)
const table1 = createTable(_testTableViewData1)

//律师
//回应 

function btnClick3() { }
</script>

<style scoped></style>
