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
          <div class="w-full bg-gray-400" style="height: 30px;">
            <tab-view :tabInstance="systemInstance.pageRef.tabRef"></tab-view>
          </div>
          <div><vxe-button @click="designEntity">进入设计</vxe-button></div>
          <div class="flex-1 w-full">
            <!-- <router-view :key="$route.fullPath"></router-view> -->
            <!-- 路由组件 -->
            <component :is="com" :key="$route.name"></component>
            <!-- <keep-alive>
            </keep-alive> -->
          </div>
          <!-- is tab -->
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, getCurrentInstance, h, isProxy, ref } from 'vue'
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
import { mainEntity } from '@/schema/businessTable/mainEntity';
const pageConfig = computed(() => {
  return systemInstance.pageConfig
})
const { proxy: instance } = getCurrentInstance()!
const com = computed(() => {
  const route = instance?.$route
  const name = route?.name! as string
  const entity = systemInstance.entityVetor[name]
  if (entity == null) {
    return h(RouterView)
  }
  return h(entityView, { entityInstance: entity })
})
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
const collapsed = ref<boolean>(false)
</script>
<style lang="scss">
.site-layout .site-layout-background {
  background: #fff;
}
</style>
