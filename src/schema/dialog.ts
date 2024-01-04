import { withDirectives, isVNode, createApp, ComponentOptions, computed, defineComponent, h, nextTick, reactive, resolveComponent, watchEffect, App, VueElement, shallowRef, vShow, VNode, ref } from "vue";
import { base } from "./base";
import { system, getSystem } from "./system";
import VXETable, { VxeModalProps, VxeModalDefines, VxeModal, VxeModalInstance, VxeTable, VxeButton } from "vxe-table";
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
import instanceView from "./schemaComponent/instanceView";
import dialogCorner from "./dialogCorner";
import { getIcon } from "./icon";
export class dialog extends base<concatAny<VxeModalDefines.ModalOptions>> {
    renderDialog: VxeModalDefines.ModalOptions = {}
    footerComponent?: (() => null) | (() => VNode) = () => null
    headerComponent?: (() => null) | (() => VNode) = () => null
    defaultComponent?: (() => null) | (() => VNode) = () => null
    cornerComponent?: (() => null) | (() => VNode) = () => null
    childDialog: dialog[] = []//子节点
    parentDialog?: dialog
    // dialogPool?: DialogPool
    dialogComponent: any = shallowRef(dialogComponent)
    modalInstance?: VxeModalInstance
    dialogData = {}
    pageRef: { dialog?: VxeModalInstance } = {

    }
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
                        const modalInstance = this.pageRef.dialog
                        if (modalInstance != null) {
                            const _position = tranPositionNumber(position as any)
                            modalInstance.setPosition(_position.top, _position.left)
                        }
                    })
                }
            })
        }
        this.initRenderDialog()
        this.initHeaderComponent()
        this.initDefaultComponent()
        this.initFooterComponent()
        this.initCornerComponent()
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
        renderDialog.showClose = true
        renderDialog.slots = {
            header: () => {
                return h(dialogHeader, { dialog: _this })
            },
            default: () => {
                return h(dialogDefault, { dialog: _this })
            },
            footer: () => {
                return h(dialogFooter, { dialog: _this })
            },
            corner: () => {
                return h(dialogCorner, { dialog: _this })
            }
        }
        renderDialog.onBeforeHide = () => {
            const onBeforeHide: any = _this.dialogConfig.onBeforeHide
            if (typeof onBeforeHide == 'function') {
                onBeforeHide(_this)
            }
        }
        renderDialog.id = this.dialogConfig.dialogPrimaryName
        renderDialog.height = getDialogHeight(this) as any
        renderDialog.width = getDialogWidth(this) as any
        renderDialog.resize = _this.dialogConfig.resize
        renderDialog.minHeight = _this.dialogConfig.minHeight
        renderDialog.minWidth = _this.dialogConfig.minWidth
        renderDialog.mask = getDialogMinMask(this) as any
        renderDialog.maskClosable = getDialogMaskClosable(this) as any
        renderDialog.modelValue = computed({
            get: () => {
                const dialogConfig = dialog.dialogConfig
                return dialogConfig.modelValue
            },
            set: (value) => {
                dialog.dialogConfig.modelValue = value
            }
        }) as any
        renderDialog.onHide = (params: any) => {
            const onHide = dialog.dialogConfig.onHide
            if (typeof onHide == 'function') {
                onHide(params)
            }
        }
        renderDialog.onShow = (params: any) => {
            const onShow = dialog.dialogConfig.onShow
            if (typeof onShow == 'function') {
                onShow(params)
            }
        }
        renderDialog.destroyOnClose = true
        renderDialog.lockView = _this.dialogConfig.lockView
        renderDialog.position = getDialogPosition(this) as any
        renderDialog.transfer = Boolean(this.dialogConfig.transfer)
    }
    async initHeaderComponent() {
        const dialog = this
        const _this = dialog
        const headerTitle = computed(() => {
            return _this.dialogConfig.title || '弹框'
        })
        const vNode = () => {
            const closeIcon = h('div', [getIcon({
                style: { cursor: 'pointer' },
                onClick: () => {
                    _this.close()
                }
            }, 'vxe-icon-close')()])
            const titleCom = h('div', [headerTitle.value])
            return h('div', {
                style: {
                    height: '30px',
                    width: "100%",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    alignItems: "center",
                    paddingRight: '10px'
                } as StyleType
            }, [titleCom, closeIcon])
            // return null
        }
        this.headerComponent = vNode
    }
    async initDefaultComponent() {
        const dialog = this
        const vNode = () => {
            let com: any = null
            const dialogComponent = dialog.dialogComponent
            const dialogName = dialog.dialogName! as keyof typeof dialogComponent
            const defaultCom = dialogComponent[dialogName]?.default || instanceView
            const instance = dialog.dialogConfig.instance//内部的实例
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
                h(defaultCom, { dialog: dialog, modalData: modalData, instance: instance })
            )
            return com
        }
        this.defaultComponent = vNode
    }
    async initCornerComponent() {
        const _this = this
        const vNode = () => {
            return h('div', ['X'])
        }
        this.cornerComponent = vNode
    }
    async initFooterComponent() {
        const dialog = this
        const _this = dialog
        const dialogConfig = _this.dialogConfig
        const dialogButtons = computed(() => {
            return dialogConfig.buttons
        })
        const vNode = () => {
            return dialogButtons.value?.map(button => {
                return h(VxeButton, {
                    ...button, onClick: async () => {
                        const runFun = button.btnFun
                        if (typeof runFun == 'function') {
                            await runFun(_this)
                        }
                    }
                }, () => {
                    return h('div', [button.text || button.context])
                })
            })
        }
        this.footerComponent = vNode as any
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
            const dialog = ref()
            return withDirectives(h('div', [h(VxeModal, { ...renderDialog, ref: dialog },)]), [[vShow, show.value], [{
                mounted: (div, node) => {
                    _this.pageRef.dialog = dialog.value
                },
                unmounted: () => {
                    //@ts-ignore
                    _this.pageRef.dialog = null
                }
            }]])
        }
        this.component = vNode
    }
    //打开弹框
    async open() {
        // const dialog = this.pageRef.dialog
        // dialog?.open()
        this.dialogConfig.modelValue = true
        const modelValue = this.dialogConfig.modelValue
        if (modelValue == true) {
            return
            //已经打开过了就无法再打开了
        }
        this.dialogConfig.modelValue = true
    }
    async close() {
        // const dialog = this.pageRef.dialog
        // dialog?.close() 
        this.dialogConfig.modelValue = false
    }
    //确认弹框
    async confirm() {
        console.log('confirm')
    }
    async destroy() {
        // this.dialogConfig.modelValue = false
        // const _this = this
        // setTimeout(() => {
        //     const index = _this.system.dialogPool.findIndex(dialog => dialog == _this)
        //     _this.system.dialogPool.splice(index, 1)
        // }, 200);
    }
    getTableView() {
    }
}


// export const dialogPool = reactive(new DialogPool())


export const createDialog = (schemaName: string = 'codeEdit', schema: dialogConfig, global: boolean = true) => {
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