<template>
  <div v-if="show" class="w-screen h-screen" style="">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { systemInstance } from './schema/system'
const show = ref(false)
onMounted(async () => {
  await systemInstance.systemInit()
  show.value = true
})
</script>

<style lang="scss"></style>
