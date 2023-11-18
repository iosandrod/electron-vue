<template>
  <a-space direction="vertical" style="width: 100%;">
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%;"
      placeholder="select one country"
      :options="options"
    >
      <template #option="{ value: val, label, icon }">
        <!-- <span role="img" :aria-label="val">{{ icon }}</span> -->
        {{ 'woshishabi' }}
      </template>
      <template #tagRender="{ value: val, label, closable, onClose, option }">
        <a-tag :closable="closable" style="margin-right: 3px;" @close="onClose">
          {{ label }}&nbsp;&nbsp;
          <span role="img" :aria-label="val">{{ option.icon }}</span>
        </a-tag>
      </template>
    </a-select>
    <span>Note: v-slot:tagRender support from v3.0</span>
  </a-space>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

const value = ref(['china'])

const options = ref([
  {
    value: 'china',
    label: 'China (中国)',
    icon: '🇨🇳',
  },
  {
    value: 'usa',
    label: 'USA (美国)',
    icon: '🇺🇸',
  },
  {
    value: 'japan',
    label: 'Japan (日本)',
    icon: '🇯🇵',
  },
  {
    value: 'korea',
    label: 'Korea (韩国)',
    icon: '🇨🇰',
  },
])
watch(value, (val) => {
  console.log(`selected:`, val)
})
</script>
