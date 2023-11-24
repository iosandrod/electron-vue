<script setup lang="ts">
import { getCurrentInstance, onMounted, ref, watchEffect } from 'vue'
import { useFocus } from '@vueuse/core'

const text = ref()
const input = ref()
const button = ref()
const { proxy: instance } = getCurrentInstance()! as any

// const { focused: paragraphFocus } = useFocus(instance?.$refs.text)
onMounted(() => {
  const { focused: paragraphFocus } = useFocus(instance?.$refs.text)
  watchEffect(() => {
    console.log(paragraphFocus.value)
  })
})
// const { focused: inputFocus } = useFocus(input, { initialValue: true })
// const { focused: buttonFocus } = useFocus(button)
</script>

<template>
  <div>
    <div ref="text" class="px-2 rounded demo-el" tabindex="0">
      Paragraph that can be focused
    </div>
  </div>
</template>

<style scoped>
.demo-el:focus {
  opacity: 0.7;
  box-shadow: 0 0 2px 1px var(--vp-c-brand);
}
</style>
