import { h, reactive, resolveComponent } from "vue";
import { base } from "./base";
import { _system, system } from "./system";
import VXETable, { VxeModalProps } from "vxe-table";
import { concatAny } from "@/types/schema";
import { getDialogSlots, getDialogType } from "./dialogFn";
export class dialog extends base<concatAny<VxeModalProps>> {
    renderDialog: VxeModalProps = {}
    childDialog: dialog[] = []//子节点
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
            return h('')
        }
        this.component = vNode
    }
    async openDialog() { }//打开弹框
    async closeDialog() { }//关闭弹框
}

export class DialogPool {
    vNode?: dialog = undefined
    constructor() { }
    initDialogPool() { }
    openDialog(dialog: dialog) { }
    closeDialog() { }
}
export const dialogPool = reactive(new DialogPool())
dialogPool.initDialogPool()
export const createDialog = (schema: any, context: any, schemaName: any) => {
    //schemaName这个是弹框的名称
    const Dialog = reactive(new dialog(_system, schemaName, schema))
    Dialog.initDialog()
    return Dialog
}

