import { computed, h, reactive } from "vue";
import { button } from "./button";
import { systemInstance } from "./system";
import { VxeButton } from "vxe-table";
import { buttonObj } from "@/types/schema";
import { formatFunction } from "@/utils/utils";
import { basicEntity } from "./businessTable/basicEntity";
import { StyleType } from "@/types/schema";

class Translate {
    key?: any
    targetKey?: any
    transFn?: (value: any, column: any, entityBtn: any) => any
    constructor(
        key: any,
        targetKey: any,
        transFn = function (targetValue: any, buttonObj: buttonObj, entityBtn: entityButton) {
            return targetValue
        }
    ) {
        this.key = key
        this.targetKey = targetKey
        this.transFn = transFn
    }
}
const _button = [
    new Translate('drop', 'drop'),
    new Translate('isDesign', 'isDesign', function (targetValue) {
        if (targetValue == true) {
            return true
        }
        return false
    }),
    new Translate('dropBtns', 'dropBtns'),
    new Translate('cButtonText', 'cButtonText'),
    new Translate('cIcon', 'cIcon'),
    new Translate('cFunName', 'cFunName', function (targetValue, btn, entityBtn) {
        if (targetValue == null) return 'default'
        let _value = targetValue
            .replace(/this.(\S*)\((\S*)\)/g, `$1 $2`)
            .split(' ')
            .reduce((result, item) => {
                return (result += `_${item.replace(/'/g, '')}`)
            }, '')
            .replace(/_[\S]??$/, '')
            .replace(/"/g, '')
            .slice(1)
            .replace('\n', '')
            .replace(/_$/, '')
        return _value
    }),
    new Translate('bHidden', 'bHidden', function (targetValue) {
        return targetValue == 1 ? false : true
    }),
    new Translate('bOrder', 'bOrder'),
    new Translate('bDisabled', 'bDisabled', function (targetValue) {
        return targetValue == 1 ? false : true
    }),
    new Translate('cBtnCategory', 'cBtnCategory'),
    new Translate('cButtonName', 'cButtonName'),
    new Translate('bImportHidden', 'bImportHidden', function (targetValue) {
        let _value = false
        if (targetValue == 1) {
            _value = true
        }
        return _value
    }),
    new Translate('cRunFun', 'cRunFun', function (targetValue, btn, entityBtn) {
        if (typeof targetValue == 'function') {
            return targetValue
        }
        if (targetValue != null) {
            // return entityBtn.formatFunData(targetValue)
            let fn = formatFunction(targetValue) as Function
            if (typeof fn == 'function') {
                fn = fn.bind(entityBtn)
            }
            return fn
        }
        return null
    }),
    new Translate('cDisableFun', 'cDisableFun', function (targetValue, btn, entityBtn) {
        if (targetValue != null) {
            // return this.formatFunData(targetValue)
            let fn = formatFunction(targetValue) as Function
            if (typeof fn == 'function') {
                fn = fn.bind(entityBtn)
            }
            return fn
        }
        return null
    }),
    new Translate('cRunBefore', 'cRunBefore', function (targetValue, btn, entityBtn) {
        if (targetValue != null) {
            // return this.formatFunData(targetValue)
            let fn = formatFunction(targetValue) as Function
            if (typeof fn == 'function') {
                fn = fn.bind(entityBtn)
            }
            return fn
        }
        return null
    }),
    new Translate('cMainHidden', 'cMainHidden', function (targetValue) {
        if (targetValue == 1) {
            return true
        }
        return false
    }),
    new Translate('cRunAfter', 'cRunAfter', function (targetValue, btn, entityBtn) {
        if (targetValue != null) {
            let fn = formatFunction(targetValue) as Function
            if (typeof fn == 'function') {
                fn = fn.bind(entityBtn)
            }
            return fn
        }
        return null
    }),
    new Translate('isSearch', 'isSearch', function (targetValue, btn, entityBtn) {
        if (Boolean(targetValue) == true) {
            entityBtn.visible = false
        }
        return targetValue
    })
]


export class entityButton extends button {
    visible: boolean = true
    dropBtns: any[] = []
    entity?: basicEntity
    entityButtonConfig = {
        cButtonName: '',
        cButtonText: '',
        cFunName: '',

    }
    getEntity: (() => basicEntity) | (() => null) = () => null
    constructor(schema: any, system: any, entity: any) {
        super(schema, system)
        this.displayState = 'destroy'
        this.getEntity = () => entity
    }
    async initButton() {
        await super.initButton()
        const schema = this.schema as any
        const _this: any = this
        const entityButtonConfig: any = this.entityButtonConfig
        _button.forEach((v) => {//按钮配置信息 
            const targetValue = v.transFn!.call(_this, schema[v.targetKey], v, _this)
            entityButtonConfig[v.key] = targetValue
        });
        if (_this.dropBtns && _this.dropBtns.length) {
            _this.dropBtns = _this.dropBtns.map((v: any) => {
                const entity = this.getEntity!()
                return createEntityButton(v, entity)
            });
        }//先把自身赋值
        this.displayState = 'show'
    }
    async initRenderButton() {
        await super.initRenderButton()
        const renderButton = this.renderButton
        renderButton.disabled = computed(() => {
            return false
        }) as any
        renderButton.destroyOnClose = true
        renderButton.slots = computed(() => {
            const obj = {} as any
            obj.default = () => {

            }
        }) as any
        renderButton.content = computed(() => {
            return this.buttonConfig.cButtonText
        }) as any
    }
    async initComponent() {
        const renderButton = this.renderButton
        const displayState = computed(() => {
            return this.displayState
        })
        const _this = this
        const vNode = () => {
            const _this = this
            if (displayState.value == 'destroy') {
                return h('div')
            }
            return h(VxeButton, {
                ...renderButton, onClick: () => {
                    const entity = this.getEntity()
                    entity?.runButtonMethod(this)
                }
            }, {
                default: () => {
                    const cButtonText = _this.buttonConfig?.cButtonText
                    return h('div', { style: {} as StyleType }, [cButtonText || '按钮'])
                }
            })
        }
        this.component = vNode
    }
}

export const createEntityButton = (schema: any, table: any) => {
    const _button = reactive(new entityButton(schema, systemInstance, table))
    _button.initButton()
    return _button
}