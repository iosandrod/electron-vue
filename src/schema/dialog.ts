import { isVNode, createApp, ComponentOptions, computed, defineComponent, h, nextTick, reactive, resolveComponent, watchEffect, App, VueElement, shallowRef } from "vue";
import { base } from "./base";
import { systemInstance, system } from "./system";
import VXETable, { VxeModalProps, VxeModalDefines, VxeModal, VxeModalInstance, VxeTable } from "vxe-table";
import { concatAny, confirmConfig, dialogConfig, openDialogConfig } from "@/types/schema";
import { getDialogDestroyOnClose, getDialogHeight, getDialogLockView, getDialogMaskClosable, getDialogMinHeight, getDialogMinMask, getDialogMinWidth, getDialogModelValue, getDialogOnHide, getDialogOnShow, getDialogPosition, getDialogPrimaryId, getDialogResize, getDialogShowFooter, getDialogSlots, getDialogType, getDialogWidth } from "./dialogFn";
import { Subject } from "rxjs";
import register from "@/plugin/register";
import dialogComponent from "./dialogComponent";
import { tranPosition, tranPositionNumber } from "@/utils/utils";
import { message } from 'ant-design-vue'
export class dialog extends base<concatAny<VxeModalDefines.ModalOptions>> {
    renderDialog: VxeModalDefines.ModalOptions = {}
    childDialog: dialog[] = []//子节点
    parentDialog?: dialog
    dialogPool?: DialogPool
    dialogComponent = shallowRef(dialogComponent)
    modalInstance?: VxeModalInstance
    // dialogConfig: concatAny<VxeModalProps & { dialogPrimaryName?: string }> = {//modalData 是模态框的存储数据
    dialogConfig: dialogConfig = {
        modelValue: false,//默认是不打开弹框
        buttons: [],//
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
                if (_value != null) {
                    this.effectPool[`dialog${key}Effect`] = watchEffect(() => {
                        this.dialogConfig[key] = schema[key]
                    })
                }
            }
            Object.entries(schema).forEach(([key, value]) => {
                const _config = this.dialogConfig as any
                _config[key] = value
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
        renderDialog.destroyOnClose = true
        renderDialog.lockView = getDialogLockView(this) as any
        renderDialog.position = getDialogPosition(this) as any
    }
    async initComponent(): Promise<void> {
        // const vNode = () => {
        //     const vxeModel = resolveComponent('vxe-modal')
        //     //返回虚拟节点
        //     return h(vxeModel, {}, [])
        // }
        // this.component = vNode
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
        await destroyDialog(this.dialogConfig.dialogPrimaryName!)
    }
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
        this.vNode = new dialog('vNode', {}, systemInstance)
        this.initVxeDynamics()//初始化app
        this.checkDynamic();//检测挂载
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
        let dynamicContainerElem = this.dynamicContainerElem//这个是异步的app
        if (!dynamicContainerElem) {
            dynamicContainerElem = (document.createElement("div")) as any;
            dynamicContainerElem!.className = "vxe-dynamics";
            document.body.appendChild(dynamicContainerElem!);
            this.dynamicApp!.mount(dynamicContainerElem!);
        }
    }
    initVxeDynamics() {
        const VxeDynamics = defineComponent({
            setup() {
                const modals = dialogPool.getActiveDialog();
                return () => {
                    return h(
                        "div",
                        {
                            class: "vxe-dynamics--modal",
                        },
                        modals.value.map((item) => {
                            return h(VxeModal, item)
                        }
                        )
                    );
                };
            },
        });
        this.dynamicApp = shallowRef(createApp(VxeDynamics)) as any
        nextTick(() => {
            this.dynamicApp!.use(VXETable)
            this.dynamicApp!.use(register)
        })
    }
}
export const dialogPool = reactive(new DialogPool())
dialogPool.initDialogPool()

export const createDialog = (schemaName: string = 'codeEdit', schema: concatAny<VxeModalProps & {
    table?: any,
    openBefore?: () => Promise<boolean> | void,//打开之前
    closeBefore?: () => Promise<void> | void//关闭之前
}>,) => {
    //schemaName这个是弹框的名称
    const Dialog = reactive(new dialog(schemaName, schema, systemInstance))
    Dialog.initDialog()
    addDialog(Dialog as any)
    return Dialog
}

export const addDialog = (dialog: dialog) => {
    const dialogArr = dialogPool.dialogArr
    const key = dialog.dialogConfig.dialogPrimaryName
    const hasDialog = dialogArr.find(dia => dia.dialogConfig.dialogPrimaryName == key)
    if (hasDialog) {
        return
    }
    dialogArr.push(dialog as any)
}

export const openDialog = (config: openDialogConfig) => {
    const key = config.key
    const dialogArr = dialogPool.dialogArr
    const targetDialog = dialogArr.find(dia => {
        const primaryKey = dia.dialogConfig.dialogPrimaryName
        return primaryKey != null && primaryKey == key
    })
    if (targetDialog) {
        const position = config.position
        if (position != null && typeof position == 'object') {
            targetDialog.dialogConfig.position = position
        }
        targetDialog.dialogConfig.modelValue = true
    }
}

export const closeDialog = (key: string) => {
    const dialogArr = dialogPool.dialogArr
    const targetDialog = dialogArr.find(dia => {
        const primaryKey = dia.dialogConfig.dialogPrimaryName
        return primaryKey != null && primaryKey == key
    })
    if (targetDialog) {
        targetDialog.dialogConfig.modelValue = false
    }
}

export const destroyDialog = (key: string) => {
    closeDialog(key)
    nextTick(() => {
        const index = dialogPool.dialogArr.findIndex(dia => {
            return dia.dialogConfig.dialogPrimaryName == key
        })
        if (index != -1) {
            dialogPool.dialogArr.splice(index, 1)
        }
    });
}


export const confirm = async (confirmConfig: confirmConfig) => {
    let createFn = () => async () => { }
    let callback = confirmConfig.callback || createFn()
    let cancelCallback = confirmConfig.cancelCallback || createFn()
    const buttons = [{
        btnFun: async (dialog: dialog) => {
            await callback(dialog)
            dialog.destroy()
        }, text: "确认"
    }, {
        btnFun: async (dialog: dialog) => {
            await cancelCallback(dialog)
            dialog.destroy()
        }, text: "取消"
    }]
    const _confirmConfig: dialogConfig = Object.assign({
        message: "确认提示",
        type: "modal",
        buttons: buttons,
        height: 200,
        width: 350,//正方形的弹框
    } as dialogConfig, confirmConfig)
    const dia = createDialog('confirm', _confirmConfig)
    dia.open()
    return dia
}  