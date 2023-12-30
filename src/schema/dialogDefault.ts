import { defineComponent } from "vue";
import { dialog } from "./dialog";

export default defineComponent({
    props: ['dialog'],
    setup(props) {
        const dialog = props.dialog as dialog
        return dialog.defaultComponent
    }
}) 