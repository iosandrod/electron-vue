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
            <vxe-button @click="designEntity">进入设计</vxe-button>
            <vxe-button @click="openDialog">打开弹框</vxe-button>
            <vxe-button @click="changeForm">改变form</vxe-button>
            <vxe-button @click="visibleNode">改变node</vxe-button>
            <vxe-button @click="getTableData">获取数据</vxe-button>
            <vxe-button @click="routeOpen">路由跳转</vxe-button>
            <vxe-button @click="changeEditType">改变类型</vxe-button>
            <vxe-button @click="changeEditType1">改变编辑框类型</vxe-button>
            <vxe-button @click="changeEditType11">改变类型11</vxe-button>
            <vxe-button @click="changeEditType111">scrollTo</vxe-button>
            <vxe-button @click="changeEditType1111">scrollTo11</vxe-button>
            <vxe-button @click="changeEditType11111">进入编辑路由</vxe-button>
            <vxe-button @click="changeEditType111111">修改编辑状态</vxe-button>
            <vxe-button @click="changeEditType1111111">添加弹框</vxe-button>
            <vxe-button @click="changeEditType11111111">删除弹框</vxe-button>
            <vxe-button @click="changeEditType111111111">默认值</vxe-button>
            <vxe-button @click="changeEditType1111111111">默认值11</vxe-button>
            <vxe-button @click="changeEditType11111111111">默认值111</vxe-button>
            <vxe-button @click="changeEditType111111111111">新增节点</vxe-button>
            <!-- 
              changeEditType11111111
             -->
          </div>
          <div class="flex-1 w-full">
            <!-- <component :is="vNode1"></component> -->
            <instance-view :instance="_entity"></instance-view>
            <!-- <router-view></router-view> -->
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
import { layoutItemConfig } from '@/types/schema';
import { http } from '@/schema/http'
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
function changeForm() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  if (entity) {
    let col = entity.tableInfo?.tableColumns.find(col => {
      return col.columnName == 'cStatus'
    })!
    if (col.editType != 'string') {
      col.editType = 'string'
    } else {
      col.editType = 'select'
    }
  }
}
function visibleNode() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  if (entity) {
    if (
      entity.pageRef.vxeGrid?.displayState == 'hidden'
    ) {
      entity.pageRef.vxeGrid.displayState = 'show'
    } else {
      entity.pageRef.vxeGrid!.displayState = 'hidden'
    }
  }
}
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
function changeEditType() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const vxeGrid = entity.pageRef.vxeGrid
  if (state1) {
    vxeGrid?.setEntityEdit('fullEdit')
    // vxeGrid?.changeColumnEditType('cCustName', 'select')
  } else {
    vxeGrid?.setEntityEdit('scan')
    // vxeGrid?.changeColumnEditType('cCustName', 'string')
  }
  state1 = !state1
}
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

function changeEditType11() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const vxeGrid = entity.pageRef.vxeGrid
  if (state11) {
    entity.tableConfig.columns!.forEach((col: any) => {
      if (col.editType == 'select') {
        col.options = [{ label: '小风1', value: 'xiaofeng1' }, { label: '小峰1', value: 'xiaofeng11' }]
      }
    })
    // vxeGrid?.setEntityEdit('fullEdit')
  } else {
    // vxeGrid?.setEntityEdit('scan')
    entity.tableConfig.columns!.forEach((col: any) => {
      if (col.editType == 'select') {
        col.options = [{ label: '小风11', value: 'xiaofeng11' }, { label: '小峰11', value: 'xiaofeng111' }]
      }
    })
  }
  state11 = !state11
}

function changeEditType111() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const vxeGrid = entity.pageRef.vxeGrid
  if (state11) {
    vxeGrid?.scrollToPosition(100, 100)
  } else {
    vxeGrid?.scrollToPosition(100, 100)
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
function changeEditType111111() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const entityName = entity.entityName
  const system = entity.system!
  if (state11) {
    entity.entityState = 'scan'
    // entity.addEntityItem(obj)
  } else {
    // entity.removeEntityItem(obj)
    entity.entityState = 'edit'
  }
  state11 = !state11
}
async function changeEditType1111111() {
  await systemInstance.confirm()
  console.log('testAwait')
}
function changeEditType11111111() {
  systemInstance.removeGlobalDialog('')
}
async function changeEditType111111111() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const entityName = entity.entityName
  const system = entity.system!
  const model = await entity.getDefaultModel()
  // console.log(model, 'testModel')
  if (state11) {
    // entity.addEntityItem(obj)
    entity.addTableRow(10)
  } else {
    // entity.removeEntityItem(obj)
  }
  state11 = !state11
}
async function changeEditType1111111111() {
  http.getTableInfo('t_SdOrder').then(res => {
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
}
async function changeEditType11111111111() {
  const systemConfig = systemInstance.systemConfig
  const key = systemConfig.activeKey
  const entity = systemInstance.entityVetor[key]
  const entityName = entity.entityName
  const system = entity.system!
  const model = await entity.getDefaultModel()
  if (state11) {
    // entity.addTableRow(10)
    entity.openDialogEditPage({ type: "add" })
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
