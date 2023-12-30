import { computed, defineComponent, h, isProxy } from "vue";
import { systemInstance } from "../system";
import instanceView from "./instanceView";
import { dialog } from "../dialog";

export default defineComponent({
    setup(props) {
        console.log('render dialog')
        const _system = systemInstance
        const dialogPool = _system.dialogPool
        return () => {
            return h('div', {},
                dialogPool.map((dialog: dialog) => {
                    return h(instanceView, { instance: dialog, key: dialog.dialogConfig.dialogPrimaryName })
                }))
        }
    }
})