import { h, reactive, resolveComponent } from "vue";
import { base } from "./base";
import { _system, system } from "./system";
import VXETable, { VxeModalProps } from "vxe-table";
import { concatAny } from "@/types/schema";
import { getDialogSlots, getDialogType } from "./dialogFn";
import { Subject } from "rxjs";
export class dialog extends base<concatAny<VxeModalProps>> {
    renderDialog: VxeModalProps = {}
    childDialog: dialog[] = []//子节点
    dialogPool?: DialogPool
    subject = new Subject()//
    dialogConfig: concatAny<VxeModalProps> = {
        type: "modal",
        maskClosable: false,
        destroyOnClose: true,
        height: '200px',
        width: '100px',
        dialogId: 1//这个是唯一，很重要
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
                this.dialogConfig[key] = schema[key]
            }
        }
        this.initRenderDialog()
        this.initComponent()
    }
    async initRenderDialog() {
        const renderDialog = this.renderDialog
        renderDialog.type = getDialogType(this) as any
        renderDialog.slots = getDialogSlots(this) as any
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

    }
    async close() { }
    //确认弹框
    async confirm() { }
}

export class DialogPool {
    vNode?: dialog = undefined
    constructor() { }
    initDialogPool() { }
    openDialog(_dialog: dialog | { props: concatAny<VxeModalProps>, dialogName: string }) {
        if (_dialog instanceof dialog) {
            VXETable.modal.open(_dialog.renderDialog)
        } else {
            const _dialog1 = createDialog(_dialog.props, {}, _dialog.dialogName)
            this.openDialog(_dialog1)
        }
    }
    closeDialog() { }
}
export const dialogPool = reactive(new DialogPool())
dialogPool.initDialogPool()
export const createDialog = (schema: concatAny<VxeModalProps>, context: any, schemaName: string = 'codeEdit') => {
    //schemaName这个是弹框的名称
    const Dialog = reactive(new dialog(_system, schemaName, schema))
    Dialog.dialogPool = dialogPool//初始化
    Dialog.initDialog()
    return Dialog
}

