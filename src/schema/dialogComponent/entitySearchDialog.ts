import { computed, defineComponent, h } from 'vue'
import { dialog } from '../dialog'
import { VxeButton } from 'vxe-table'
import { message } from 'ant-design-vue'
import { mainEntity } from '../businessTable/mainEntity'
import formView from '../schemaComponent/formView'
const obj: any = {

}

obj.default = defineComponent({
    props: ['dialog', 'modalData', 'dialogConfig'],
    setup(props, context) {
        const modalData = props.modalData as any
        const entity = modalData.entity as mainEntity
        const formRef = entity.pageRef.searchForm
        return () => {
            return h(formView, { formInstance: formRef })
        }
    },
})

obj.header = defineComponent({
    props: ['dialog', 'modalData'],
    setup(props, context) {
        const dialog = props.dialog
    },
    render() {
        return h('div', { class: ['ml-3'] }, ['查询弹框'])
    }
})

obj.footer = defineComponent({
    props: ['dialog'],
    setup(props, context) {
        const dialog = props.dialog as dialog
        const buttons = computed(() => {
            const _buttons = dialog.dialogConfig.buttons || []
            return _buttons
        })
        return () => {
            return h('div', {}, buttons.value.map(btn => {
                return h(VxeButton, {
                    onClick: async () => {
                        const btnFun = btn.btnFun as Function
                        if (typeof btnFun == 'function') {
                            await btnFun(dialog)
                        } else {
                            message.error('未找到执行函数')
                        }
                    }
                }, () => h('div', [btn.text || '']))
            }))
        }
    },
})
export default obj