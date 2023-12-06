<template>
  <template v-if="systemInstance.displayState !== 'destroy'"></template>
  <a-layout
    v-show="systemInstance.displayState == 'show'"
    style="height: 100%;"
  >
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
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      ></a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { systemInstance } from '@/schema/system'
const pageConfig = computed(() => {
  return systemInstance.pageConfig
})
const collapsed = ref<boolean>(false)
</script>
<style lang="scss">
.site-layout .site-layout-background {
  background: #fff;
}
</style>
