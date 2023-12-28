import { computed, defineComponent, h, isProxy, resolveComponent, watchEffect } from "vue";
import { formitem } from "../formitem";
import { getRenderFn } from "../columnFn";
import { StyleType } from "@/types/schema";
import { styleBuilder } from "@/utils/utils";
import inputView from "../schemaComponent/inputView";
import { input } from "../input";

export default defineComponent({
    props: ['params', 'formitem', 'data'],
    setup(props, context) {
        // const params = props.params
        const formitem: formitem = props.formitem
        const data = computed(() => {
            return props.params?.data || props.data
        })
        const title = computed(() => {
            return formitem.itemConfig.title
        })
        const showTitle = formitem.itemConfig.showTitle!
        return () => {
            const formitemCom = resolveComponent('vxe-form-item')

            const itemCom = h(formitemCom, formitem.renderItem, {
                default: () => {
                    const titleDiv = h('div', { style: { height: '100%', width: "100%", display: 'flex', flexDirection: 'row', alignItems: 'center' } as StyleType }, [title.value])
                    let titleCom = getRenderFn('div', {
                        style: {
                            width: '130px',
                            // height: "100%",
                            display: 'flex',
                            alignItems: "center",
                            overflow: "hidden"
                        } as StyleType
                    })([titleDiv])
                    const style = styleBuilder.setFull().setFlexRow().getStyle()
                    const outSizeDivFn = getRenderFn('div', { style })
                    if (showTitle == false) {
                        titleCom = null
                    }
                    let defaultRenderCom = h(inputView, { inputInstance: formitem.pageRef.inputInstance, data: data.value, })
                    const editCom = outSizeDivFn([titleCom, defaultRenderCom])
                    return editCom
                }
            })
            return itemCom
        }
    }
})