<template>
  <div>
    <vxe-button @click="fn1">fn1</vxe-button>
    <entity-view :entityInstance="$props.entityInstance"></entity-view>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, h, ref } from 'vue'
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
const props = defineProps({
  testProps: {},
  entityInstance: {},
})
const { proxy: instance } = getCurrentInstance()!
function fn1() {
  instance?.$router.push({ path: '/index8' })
}
</script>
