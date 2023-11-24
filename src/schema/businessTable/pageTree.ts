import { StyleType, layoutConfig, layoutItem } from "@/types/schema"
import { Subject } from "rxjs"
import XEUtils from "xe-utils"
import lodash from 'lodash'
import { reactive, watchEffect } from "vue"
import { comVetor } from "@/plugin/register"
export class pageTree {//    视图页面数，基于业务的树
    constructor(children: Array<nodeConfig>, treeConfig?: layoutConfig,) {//子节点
        // lodash.merge(this.treeConfig, treeConfig || {})
        this.children = children as any
        this.treeConfig = treeConfig
        console.log(treeConfig, 'testConfig')
    }
    children: pageTreeNode[] = []
    treeConfig?: layoutConfig
    sub = new Subject()//指令发射器
    vNode?: pageTreeNode
    pageConfig: layoutConfig = {
        layout: [],
        colNum: 12,
        rowHeight: 30,
        isDraggable: false,
        isResizable: false,
        useCssTransform: true,
        verticalCompact: true
    }
    initTree() {
        const treeConfig: any = this.treeConfig || {}
        for (const key of Object.keys(treeConfig)) {
            if (['layout'].includes(key)) {
                continue
            }
            let _config: any = this.pageConfig
            watchEffect(() => {
                _config[key] = treeConfig[key]
            })//页面树 
        }
        const children = this.children
        this.children = children.map((chi: any) => {
            const nodeName = chi.nodeName
            const node = new pageTreeNode(nodeName, chi.nodeConfig, chi.nodeData)
            node.initNode()
            return node
        }) as any
    }
    getEntityTree() { }
}
//Azure
//核心是数据+动作
//主表实例|按钮组合|tab标签
export type nodeName = 'mainEntity' | 'buttonGroup' | 'tab' | 'tableView' | 'detailEntity' | 'entityTab'
export type nodeConfig = {
    nodeConfig: layoutItem,//样式数据
    nodeData: any//配置数据
}
export class pageTreeNode {
    sub = new Subject()
    uniKey = ''//唯一的主键
    nodeName: nodeName = 'tableView'//
    children: pageTreeNode[] = []//子节点
    nodeData: any = {}//节点数据
    nodeConfig: layoutItem = {
        i: "",
        x: 0,
        y: 0,
        w: 0,
        h: 0
    }//节点配置
    constructor(nodeName: nodeName, nodeConfig: layoutItem, nodeData: any,) {
        this.nodeConfig = nodeConfig
        this.nodeData = nodeData
        this.nodeName = nodeName
    }
    initNode() {
    }
    async dispatch(methodName: string)//发射某一动作
    { }
}


export const createPage = (nodeArr: any, treeConfig?: any) => {
    const page = reactive(new pageTree(nodeArr, treeConfig))
    page.initTree()
    return page
}


