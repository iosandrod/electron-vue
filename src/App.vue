<template>
  <div v-if="show" class="w-screen h-screen">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const show = ref(false)
onMounted(() => {
  console.log('show')
})
</script>

<style lang="scss"></style>
