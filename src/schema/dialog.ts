import { isVNode, createApp, ComponentOptions, computed, defineComponent, h, nextTick, reactive, resolveComponent, watchEffect, App, VueElement } from "vue";
import { base } from "./base";
import { systemInstance, system } from "./system";
import VXETable, { VxeModalProps, VxeModalDefines, globalStore, modal, VxeModal, VxeModalInstance } from "vxe-table";
import { concatAny, dialogConfig } from "@/types/schema";
import { getDialogDestroyOnClose, getDialogHeight, getDialogLockView, getDialogMaskClosable, getDialogMinHeight, getDialogMinMask, getDialogMinWidth, getDialogModelValue, getDialogOnHide, getDialogOnShow, getDialogPosition, getDialogPrimaryId, getDialogResize, getDialogShowFooter, getDialogSlots, getDialogType, getDialogWidth } from "./dialogFn";
import { Subject } from "rxjs";
import register from "@/plugin/register";
import dialogComponent from "./dialogComponent";
import { tranPosition, tranPositionNumber } from "@/utils/utils";
export class dialog extends base<concatAny<VxeModalDefines.ModalOptions>> {
    renderDialog: VxeModalDefines.ModalOptions = {}
    childDialog: dialog[] = []//子节点
    parentDialog?: dialog
    dialogPool?: DialogPool
    dialogComponent = dialogComponent
    subject = new Subject()//
    modalInstance?: VxeModalInstance
    // dialogConfig: concatAny<VxeModalProps & { dialogPrimaryName?: string }> = {//modalData 是模态框的存储数据
    dialogConfig: dialogConfig = {
        position: 'center',
        type: "modal",
        // maskClosable: false,
        maskClosable: false,
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
    constructor(system: system, dialogName: string = 'codeEdit', schema: concatAny<VxeModalProps>) {
        super(system, schema)
        this.dialogName = dialogName
    }
    async initDialog() {
        const schema = this.schema
        if (schema != null && Object.keys(schema).length > 0) {
            for (const key of Object.keys(schema)) {
                const _value = schema[key]
                if (_value != null) {
                    this.effectPool[`dialog${key}Effect`] = watchEffect(() => {
                        this.dialogConfig[key] = schema[key]
                    })
                }
            }
            this.effectPool['openEffect'] = watchEffect(() => {
                const modalValue = this.dialogConfig.modelValue
                if (modalValue == true) {
                    nextTick(() => {
                        this.open()
                    })
                } else {
                    nextTick(() => {
                        this.close()
                    })
                }
            })
            //修改配置
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
        this.initComponent()
    }
    //缓存起来
    async initDialogPrimaryId() {

    }
    async initRenderDialog() {
        const renderDialog = this.renderDialog
        renderDialog.type = getDialogType(this) as any
        renderDialog.showFooter = getDialogShowFooter(this) as any
        renderDialog.slots = getDialogSlots(this) as any
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
        renderDialog.destroyOnClose = getDialogDestroyOnClose(this) as any
        renderDialog.lockView = getDialogLockView(this) as any
        renderDialog.position = getDialogPosition(this) as any
    }
    async initComponent(): Promise<void> {
        const vNode = () => {
            const vxeModel = resolveComponent('vxe-modal')
            //返回虚拟节点
            return h(vxeModel, {}, [])
        }
        this.component = vNode
    }
    //打开弹框
    async open() {
        const modelValue = this.dialogConfig.modelValue
        if (modelValue == true) {
            return
            //已经打开过了就无法再打开了
        }
        this.renderDialog.key = `${Math.floor(Math.random() * 10000)}`
        this.dialogConfig.modelValue = true
        if (this.dialogConfig.hasOpen != true) {
            this.dialogConfig.hasOpen = true
        } else {
            this.renderDialog.modelValue = true
        }
    }
    async close() {
        const closeId = this.dialogConfig.dialogPrimaryName
        VXETable.modal.close(closeId)
    }
    //确认弹框
    async confirm() { }
    getTableView() {
        const modalData = this.dialogConfig.modalData
        return modalData.table
    }
}

export class DialogPool {
    dynamicContainerElem?: HTMLDivElement
    dialogArr: dialog[] = []
    vNode?: dialog = undefined
    currentDialog?: dialog//当前的活动弹框
    VxeDynamics?: App<Element>
    dynamicApp?: App<Element>
    constructor() { }
    initDialogPool() {
        this.vNode = new dialog(systemInstance, 'vNode', {})
        this.initVxeDynamics()//初始化app
        this.checkDynamic();//检测挂载
    }
    openDialog(_dialog: dialog | { props: concatAny<VxeModalProps>, dialogName: string }): dialog {
        let _dialog2: any = null
        if (_dialog instanceof dialog) {
            this.dialogArr.push(_dialog)
            return _dialog
        } else {
            _dialog2 = createDialog(_dialog.props, {}, _dialog.dialogName)
            return this.openDialog(_dialog2 as any)
        }
    }
    closeDialog() { }
    getActiveDialog() {
        return computed(() => {
            const dialogArr = [...new Set(this.dialogArr)]
            const dialogRenderArr = dialogArr.map(dia => {
                return dia.renderDialog
            })
            return dialogRenderArr//这个是弹框的东西
        })
    }
    checkDynamic() {
        let dynamicContainerElem = this.dynamicContainerElem
        if (!dynamicContainerElem) {
            dynamicContainerElem = document.createElement("div");
            dynamicContainerElem.className = "vxe-dynamics";
            document.body.appendChild(dynamicContainerElem);
            this.dynamicApp!.mount(dynamicContainerElem);
        }
    }
    initVxeDynamics() {
        const VxeDynamics = defineComponent({
            setup() {
                return () => {
                    const modals = dialogPool.getActiveDialog().value;
                    return h(
                        "div",
                        {
                            class: "vxe-dynamics--modal",
                        },
                        modals.map((item) =>
                            h(VxeModal, item)
                        )
                    );
                };
            },
        });
        this.dynamicApp = createApp(VxeDynamics)
        nextTick(() => {
            this.dynamicApp!.use(VXETable)
            this.dynamicApp!.use(register)
        })
    }
}
export const dialogPool = reactive(new DialogPool())
dialogPool.initDialogPool()

export const createDialog = (schema: concatAny<VxeModalProps & {
    table?: any,
    openBefore?: () => Promise<boolean> | void,//打开之前
    closeBefore?: () => Promise<void> | void//关闭之前
}>, context: any, schemaName: string = 'codeEdit') => {
    //schemaName这个是弹框的名称
    const Dialog = reactive(new dialog(systemInstance, schemaName, schema))
    Dialog.dialogPool = dialogPool//初始化
    Dialog.initDialog()
    dialogPool.openDialog(Dialog as any)
    return Dialog
} 