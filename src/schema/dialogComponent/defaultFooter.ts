import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: ['dialog', 'modalData'],
    setup(props, context) {
        const dialog = props.dialog
        const modalData = props.modalData
        const buttons = computed(() => {

        })
    }
})