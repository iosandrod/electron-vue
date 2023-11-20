import { base } from "./base";
import { system, systemInstance } from "./system";
import * as layoutFn from './layoutGridFn'
import { layoutConfig } from "@/types/schema";
import { reactive, watchEffect } from "vue";
import { pageTree } from "./businessTable/pageTree";
import * as layoutGridFn from './layoutGridFn'
export class layoutGrid extends base {
    pageTree?: pageTree
    renderLayout: layoutConfig = {}
    constructor(pageTree: pageTree, system: system) {
        super(system, {})
        this.pageTree = pageTree
    }
    initLayoutGrid() {
        // const schema = this.schema
        // for (const key of Object.keys(schema)) {
        //     let layoutConfig: any = this.layoutConfig
        //     this.effectPool[`layoutGrid${key}Effect`] = watchEffect(() => {
        //         layoutConfig[key] = schema[key]
        //     })
        // }
        this.initRenderLayout()
        this.initComponent()
    }
    initRenderLayout() {
        layoutGridFn.initRenderLayout(this)
    }
    async initComponent() {
        layoutFn.initComponent(this)
    }
}

export const createLayout = (pageTree: any, schema?: any) => {
    const _layoutGrid = reactive(new layoutGrid(pageTree, systemInstance))
    _layoutGrid.initLayoutGrid()
    return _layoutGrid
}