import { computed, defineComponent, h, isProxy } from "vue";
import { systemInstance } from "../system";
import instanceView from "./instanceView";
import { dialog } from "../dialog";

export default defineComponent({
    props: ['dialogPool'],
    setup(props) {
        const _system = systemInstance
        let dialogPool = props.dialogPool || _system.dialogPool
        // if (!Array.isArray(dialogPool)) {
        //     dialogPool = Object.values(dialogPool)
        // }
        return () => {
            return h('div', {},
                dialogPool.map((dialog: dialog) => {
                    return h(instanceView, {
                        instance: dialog,
                        key: dialog.dialogConfig.dialogPrimaryName
                    })
                }))
        }
    }
})