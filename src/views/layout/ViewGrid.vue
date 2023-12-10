<template>
  <div class="flex flex-col w-full h-full">
    <div>
      <vxe-button @click="">特制按钮</vxe-button>
    </div>
    <entity-view :entityInstance="props.entityInstance"></entity-view>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  entityInstance: {},
})
function fn1() {
  console.log('fn1')
}
function fn2() {}
function fn3() {
  console.log()
}
</script>
<style scoped></style>
