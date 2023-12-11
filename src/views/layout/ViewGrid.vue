<template>
  <div class="flex flex-col w-full h-full">
    <div>
      <vxe-button @click="">特制按钮</vxe-button>
    </div>
    <entity-view :entityInstance="props.entityInstance"></entity-view>
  </div>
</template> 

<script setup lang="ts">
import * as utils from '@/utils/utils'
const props = defineProps({
  entityInstance: {},
})
const system = utils.useSystem()
function fn1() {
}
function fn2() { }
function fn3() {
}

function fn4() {
}
</script>
<style scoped></style>
