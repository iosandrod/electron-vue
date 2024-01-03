import { vLoading } from "@/diretive/loading/src/directive";
import { StyleType } from "@/types/schema";
import { defineComponent, h, ref, withDirectives } from "vue";
import { VxeButton } from "vxe-table";

export default defineComponent({
    setup() {
        const loading = ref(false)
        return () => {
            const loadingDiv = withDirectives(h('div', { style: { width: "100px", height: "100px", background: 'red' } as StyleType }), [[vLoading, loading.value]])
            // const loadingDiv = h('div', { style: { width: "100px", height: "100px", background: 'red' } as StyleType })
            const btn = h(VxeButton, {
                content: "loading", onClick: () => {
                    loading.value = !loading.value
                }
            })
            return h('div', [loadingDiv, btn])
        }
    }
})