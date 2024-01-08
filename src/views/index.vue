<template>
  <template v-if="systemInstance.displayState !== 'destroy'"></template>
  <a-layout v-show="systemInstance.displayState == 'show'" style="height: 100%;">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="flex flex-col h-full">
        <div class="logo" :style="{ height: pageConfig.headerHeight }" />
        <div class="flex-1 bg-white">
          <menu-view :menuInstance="systemInstance.pageRef.menuRef"></menu-view>
        </div>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0;">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{
        margin: '24px 16px',
        padding: '24px',
        background: '#fff',
        minHeight: '280px',
      }">
        <div class="flex flex-col w-full h-full">
          <div class="w-full " style="height: 30px;">
            <tab-view :tabInstance="systemInstance.pageRef.tabRef"></tab-view>
          </div>
          <div>
            <!-- <vxe-button @click="designEntity">进入设计</vxe-button>
            <vxe-button @click="openDialog">打开弹框</vxe-button>
            <vxe-button @click="getTableData">获取数据</vxe-button>
            <vxe-button @click="routeOpen">路由跳转</vxe-button>
            <vxe-button @click="changeEditType1">改变编辑框类型</vxe-button>
            <vxe-button @click="changeEditType1111">scrollTo11</vxe-button>
            <vxe-button @click="changeEditType11111">进入编辑路由</vxe-button>
            <vxe-button @click="changeEditType111111111111">新增节点</vxe-button> -->
          </div>
          <div class="flex-1 w-full">
            <!-- <component :is="vNode1"></component> -->
            <!-- <instance-view :instance="_entity"></instance-view> -->
            <router-view></router-view>
            <!-- <instance-view :instance="_tab"></instance-view> -->
          </div>
        </div>
        <dialogPoolView></dialogPoolView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, h, isProxy, ref } from 'vue'
import dialogPoolView from '@/schema/schemaComponent/dialogPoolView'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { systemInstance } from '@/schema/system'
import Index1 from './index1.vue';
import { RouterView } from 'vue-router';
import entityView from '@/schema/schemaComponent/entityView';
import { createMainEntity, mainEntity } from '@/schema/businessTable/mainEntity';
import XEUtils from 'xe-utils';
import { layoutItemConfig, tabItemConfig } from '@/types/schema';
import { http } from '@/schema/http'
import { createTab } from '@/schema/tab';
const pageConfig = computed(() => {
  return systemInstance.pageConfig
})
const { proxy: instance } = getCurrentInstance()!

let state = false
function designEntity() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  if (entity) {
    state = !state
    entity.setCurrentEntityDesign(state)
  }
}
function openDialog() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  if (entity) {
    entity.openDialog('searchDialog')
  }
}

const _tab = createTab({
  tabItems: [{
    renderKey: '3',
    key: '3',
    renderCom: '',
    renderComName: '',
    tab: "第一"
  }, {
    renderKey: '4',
    key: '4',
    renderCom: '',
    renderComName: '',
    tab: "第二"
  }] as tabItemConfig[]
})


function getTableData() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  if (entity) {
    entity.getTableData()
  }
}
function routeOpen() {
  systemInstance.routeOpen('index8')
}
let state1 = false

let state11 = false
function changeEditType1() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const vxeGrid = entity.pageRef.vxeGrid
  if (state11) {
    entity?.changeColumnEditType('cSdOrderNo', 'baseInfo')
    // vxeGrid?.setEntityEdit('fullEdit') 
    // vxeGrid?.changeColumnEditType('cSdOrderNo', 'baseInfo')
    // console.log(vxeGrid)
  } else {
    entity?.changeColumnEditType('cSdOrderNo', 'string')
    // vxeGrid?.setEntityEdit('scan')
    // vxeGrid?.changeColumnEditType('cSdOrderNo', 'string')
    // console.log(vxeGrid)
  }
  state11 = !state11
}


const obj = {
  x: 0, y: 4, h: 30, w: 24, i: XEUtils.uniqueId(), layoutItemConfig: {
    renderComName: "tableView",//组件
    renderFunName: 'initRenderTable',//数据初始化函数
  } as layoutItemConfig
} as any

function changeEditType1111() {

  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const vxeGrid = entity.pageRef.vxeGrid
  if (state11) {
    entity.addEntityItem(obj)
  } else {
    entity.removeEntityItem(obj)
  }
  state11 = !state11
}
function changeEditType11111() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const entityName = entity.entityName
  const system = entity.system!
  if (state11) {
    system.routeOpen({ entityName: entityName, isEdit: true })
    // entity.addEntityItem(obj)
  } else {
    // entity.removeEntityItem(obj)
  }
  state11 = !state11
}

const _entity = createMainEntity('t_SdOrder')
_entity.setCurrentEntityDesign(true)
async function changeEditType111111111111() {
  // await systemInstance.confirmForm()
  _entity.addNewNode()
  // _entity.addEntityItem()
}
const collapsed = ref<boolean>(false)
</script>
<style lang="scss">
.site-layout .site-layout-background {
  background: #fff;
}
</style>
