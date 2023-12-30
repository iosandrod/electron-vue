import { withDirectives, isVNode, createApp, ComponentOptions, computed, defineComponent, h, nextTick, reactive, resolveComponent, watchEffect, App, VueElement, shallowRef, vShow, VNode } from "vue";
import { base } from "./base";
import { system, getSystem } from "./system";
import VXETable, { VxeModalProps, VxeModalDefines, VxeModal, VxeModalInstance, VxeTable } from "vxe-table";
import { StyleType, concatAny, confirmConfig, dialogConfig, openDialogConfig } from "@/types/schema";
import { getDialogDestroyOnClose, getDialogHeight, getDialogLockView, getDialogMaskClosable, getDialogMinHeight, getDialogMinMask, getDialogMinWidth, getDialogModelValue, getDialogOnHide, getDialogOnShow, getDialogPosition, getDialogPrimaryId, getDialogResize, getDialogShowFooter, getDialogSlots, getDialogType, getDialogWidth } from "./dialogFn";
import { Subject } from "rxjs";
import register from "@/plugin/register";
import dialogComponent, { initFun } from "./dialogComponent";
import { tranPosition, tranPositionNumber } from "@/utils/utils";
// import { VxeModal } from 'vxe-table'
import { message } from 'ant-design-vue'
import { getRenderFn } from "./columnFn";
import dialogFooter from "./dialogFooter";
import dialogDefault from "./dialogDefault";
import dialogHeader from "./dialogHeader";
export class dialog extends base<concatAny<VxeModalDefines.ModalOptions>> {
    renderDialog: VxeModalDefines.ModalOptions = {}
    footerComponent?: (() => null) | (() => VNode) = () => null
    headerComponent?: (() => null) | (() => VNode) = () => null
    defaultComponent?: (() => null) | (() => VNode) = () => null
    childDialog: dialog[] = []//子节点
    parentDialog?: dialog
    dialogPool?: DialogPool
    dialogComponent: any = shallowRef(dialogComponent)
    modalInstance?: VxeModalInstance
    dialogData = {}
    // dialogConfig: concatAny<VxeModalProps & { dialogPrimaryName?: string }> = {//modalData 是模态框的存储数据
    dialogConfig: dialogConfig = {
        dialogName: '',
        modelValue: false,//默认是不打开弹框
        buttons: [],//
        transfer: true,
        position: 'center',
        type: "modal",
        maskClosable: true,
        destroyOnClose: true,
        // height: '200px',
        height: "400px",
        width: '100px',
        showFooter: true,
        dialogPrimaryName: `${Date.now()}`,//这个是唯一，很重要
        resize: true,
        minWidth: '100px',
        minHeight: '200px',
        mask: false,
        hasOpen: false,
        lockView: true,
        modalData: {}
    }
    dialogName?: string
    constructor(dialogName: string = 'codeEdit', schema: concatAny<VxeModalProps>, system: system) {
        super(system, schema)
        this.dialogName = dialogName
    }
    async initDialog() {
        const schema = this.schema
        if (schema != null && Object.keys(schema).length > 0) {
            for (const key of Object.keys(schema)) {
                const _value = schema[key]
                if (key == 'position') {
                    continue
                }
                if (_value != null) {
                    this.effectPool[`dialog${key}Effect`] = watchEffect(() => {
                        this.dialogConfig[key] = schema[key]
                    })
                }
            }
            //修改位置配置配置 
            this.effectPool['positionEffect'] = watchEffect(() => {
                const position = this.dialogConfig.position
                if (typeof position == 'object') {
                    nextTick(() => {
                        const modalInstance = this.modalInstance
                        if (modalInstance != null) {
                            const _position = tranPositionNumber(position as any)
                            const box = modalInstance.getBox()
                            if (box != null) {
                                modalInstance.setPosition(_position.top, _position.left)
                            }
                        }
                    })
                }
            })
        }
        this.initRenderDialog()
        this.initHeaderComponent()
        this.initDefaultComponent()
        this.initFooterComponent()
        this.initComponent()
        this.runInitFun()
    }
    runInitFun() {
        const dialog = this
        const dialogName = dialog.dialogName!
        const initFn: any = initFun
        const targetFn = initFn[dialogName]
        if (typeof targetFn == 'function') {
            targetFn(dialog)
        }

    }
    //缓存起来
    async initDialogPrimaryId() {

    }
    async initRenderDialog() {
        const dialog = this
        const _this = this
        const renderDialog = this.renderDialog
        renderDialog.type = getDialogType(this) as any
        renderDialog.showFooter = getDialogShowFooter(this) as any
        // renderDialog.slots = getDialogSlots(this) as any
        renderDialog.slots = {
            header: () => {
                return h(dialogHeader, { dialog: _this })
            },
            default: () => {
                return h(dialogDefault, { dialog: _this })
            },
            footer: () => {
                return h(dialogFooter, { dialog: _this })
            }
        }
        renderDialog.id = this.dialogConfig.dialogPrimaryName
        renderDialog.height = getDialogHeight(this) as any
        renderDialog.width = getDialogWidth(this) as any
        renderDialog.resize = getDialogResize(this) as any
        renderDialog.minWidth = getDialogMinWidth(this) as any
        renderDialog.minHeight = getDialogMinHeight(this) as any
        renderDialog.minHeight = getDialogMinWidth(this) as any
        renderDialog.mask = getDialogMinMask(this) as any
        renderDialog.maskClosable = getDialogMaskClosable(this) as any
        renderDialog.modelValue = getDialogModelValue(this) as any
        renderDialog.onHide = getDialogOnHide(this) as any
        renderDialog.onShow = getDialogOnShow(this) as any
        renderDialog.destroyOnClose = true
        renderDialog.lockView = getDialogLockView(this) as any
        renderDialog.position = getDialogPosition(this) as any
        renderDialog.transfer = Boolean(this.dialogConfig.transfer)
    }
    async initHeaderComponent() {
        const dialog = this
        const vNode = () => {
            return h('div', ['header'])
        }
        this.headerComponent = vNode
    }
    async initDefaultComponent() {
        const dialog = this
        const vNode = () => {
            let com: any = null
            const dialogComponent = dialog.dialogComponent
            const dialogName = dialog.dialogName! as keyof typeof dialogComponent
            const defaultCom = dialogComponent[dialogName]?.default
            if (defaultCom != null) {
                const modalData = dialog.dialogConfig.modalData
                const outSizeDiv = getRenderFn('div', {
                    style: {
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        width: "100%",
                        height: "100%",
                        maxHeight: '800px',
                        overflow: 'auto'
                    } as StyleType
                })
                com = outSizeDiv(
                    h(defaultCom, { dialog: dialog, modalData: modalData })
                )
            } else {
                com = h('div', ['弹框'])
            }
            return com
        }
        this.defaultComponent = vNode
    }
    async initFooterComponent() {
        const dialog = this
        const vNode = () => {
            let com: any = null
            const dialogComponent = dialog.dialogComponent
            const dialogName = dialog.dialogName! as keyof typeof dialogComponent
            const _com = dialogComponent[dialogName] as any
            const defaultCom = _com?.footer
            if (defaultCom != null) {
                const modalData = dialog.dialogConfig.modalData
                com = h(defaultCom, { dialog: dialog, modalData: modalData })
            } else {
                com = h('div', ['footer'])
            }
            return com
        }
        this.footerComponent = vNode
    }
    async initComponent(): Promise<void> {
        const _this = this
        const show = computed(() => {
            return _this.displayState == 'show'
        })
        const destroy = computed(() => {
            return _this.displayState == 'destroy'
        })
        const renderDialog = this.renderDialog
        const vNode = () => {
            //返回虚拟节点
            if (destroy.value == true) {
                return null
            }
            return withDirectives(h('div', [h(VxeModal, { ...renderDialog },)]), [[vShow, show.value]])
        }
        this.component = vNode
    }
    //打开弹框
    async open() {
        this.dialogConfig.modelValue = true
        const modelValue = this.dialogConfig.modelValue
        if (modelValue == true) {
            return
            //已经打开过了就无法再打开了
        }
        this.dialogConfig.modelValue = true
    }
    async close() {
        this.dialogConfig.modelValue = false
    }
    //确认弹框
    async confirm() {
        console.log('confirm')
    }
    async destroy() {
        this.dialogConfig.modelValue = false
        const _this = this
        setTimeout(() => {
            const index = _this.system.dialogPool.findIndex(dialog => dialog == _this)
            _this.system.dialogPool.splice(index, 1)
        }, 200);
    }
    getTableView() {
    }
}


// export const dialogPool = reactive(new DialogPool())


export const createDialog = (schemaName: string = 'codeEdit', schema: concatAny<VxeModalProps & {
    table?: any,
    openBefore?: () => Promise<boolean> | void,//打开之前
    closeBefore?: () => Promise<void> | void//关闭之前
}>, global: boolean = true) => {
    //schemaName这个是弹框的名称
    const Dialog = reactive(new dialog(schemaName, schema, getSystem()))
    Dialog.initDialog()
    return Dialog
}

export const addDialog = (dialog: dialog) => {

}

export const openDialog = (config: openDialogConfig) => {

}

export const closeDialog = (key: string) => {

}

export const destroyDialog = (key: string) => {

}


export const confirm = async (confirmConfig: confirmConfig) => {

}