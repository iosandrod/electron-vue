import { computed, defineComponent, h, isProxy, watchEffect } from "vue";
import { formitem } from "../formitem";
import { getRenderFn } from "../columnFn";
import { StyleType } from "@/types/schema";
import { styleBuilder } from "@/utils/utils";
import inputView from "../schemaComponent/inputView";
import { input } from "../input";

export default defineComponent({
    props: ['params', 'formitem'],
    setup(props, context) {
        // const params = props.params
        const formitem: formitem = props.formitem
        const data = computed(() => {
            return props.params.data
        })
        const title = computed(() => {
            return formitem.itemConfig.title
        })
        const field = formitem.itemConfig.field!
        const showTitle = formitem.itemConfig.showTitle!
        const inputInstance = formitem.pageRef.inputInstance as input
        return () => {
            let titleCom = getRenderFn('div', {
                style: {
                    width: '30%',
                    height: "100%",
                    display: 'flex',
                    alignItems: "center",
                    overflow: "hidden"
                } as StyleType
            })([title.value])
            const style = styleBuilder.setFull().setFlexRow().getStyle()
            const outSizeDivFn = getRenderFn('div', { style })
            if (showTitle == false) {
                titleCom = null
            }
            let defaultRenderCom = h(inputView, { inputInstance: formitem.pageRef.inputInstance, data: data.value, })
            const editCom = outSizeDivFn([titleCom, defaultRenderCom])
            return editCom
        }
    }
})