<template>
    <div>
        <vxe-modal v-model="val1" width="600" show-footer>
            <template #title>
                <span style="color:red">自定义标题</span>
            </template>
            <template #corner>
                <vxe-icon name="bell-fill"></vxe-icon>
                <vxe-icon name="minus"></vxe-icon>
            </template>
            <template #default>
                <vxe-table show-overflow auto-resize height="300" :data="tableData">
                    <vxe-column type="seq" width="60"></vxe-column>
                    <vxe-column field="name" title="Name"></vxe-column>
                    <vxe-column field="sex" title="Sex"></vxe-column>
                    <vxe-column field="age" title="Age"></vxe-column>
                </vxe-table>
            </template>
            <template #footer>
                <vxe-button @click="cancelEvent">关闭</vxe-button>
                <vxe-button @click="cancelEvent">取消</vxe-button>
                <vxe-button status="primary" @click="confirmEvent">确定</vxe-button>
            </template>
        </vxe-modal>
    </div>
</template>
  
<script lang="ts" setup>
import { computed, ref } from 'vue'
const props = defineProps({
    entity: {}
})
const entity = props.entity
const val1 = computed(() => {
    return Boolean(entity.testDialog)
})
const tableData = ref([])

const cancelEvent = () => {
    entity.testDialog = false
}

const confirmEvent = () => {
    entity.testDialog = false
}
</script> 