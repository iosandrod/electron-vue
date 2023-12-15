import { computed, defineComponent, h, withDirectives } from 'vue'
import { column } from '../column'
import { getOutSizeDiv, getSlotHeaderFilterIcon, getSlotHeaderSortIcon } from '../columnFn'
import { StyleType } from '@/types/schema'
import { propsConfig, usePropsDiv } from '../icon'
import { Pulldown } from 'vxe-table'
import { getMouseEventPosition, styleBuilder } from '@/utils/utils'
import { Dropdown } from 'ant-design-vue'

export default defineComponent({
    props: ['column', 'row'],
    setup(props, context) {
        //行与列
        const column = computed(() => {
            return props.column as column
        })
        return () => {
            const showHeader = column.value.columnConfig.showHeader
            if (showHeader == false) {
                return
            }
            const headerHeight = 30
            const style: StyleType = {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: `${headerHeight}px`,
            }
            const outSizeDiv = usePropsDiv({
                style, onContextmenu: (event: MouseEvent) => {
                    column.value.table!.openHeaderMenu(event)
                }
            })
            const renderColumn = column.value.renderColumn
            const title: string = renderColumn.title as string || 'title'
            const _filterIcon = column.value.columnConfig.showFilter == true && column.value.table?.tableConfig.showHeaderFilter == true ? getSlotHeaderFilterIcon(column.value) : null
            const sortIcon = column.value.columnConfig.showSort == true && column.value.table?.tableConfig.showHeaderSort == true ? getSlotHeaderSortIcon(column.value) : null
            //排序图标
            let headerCom = outSizeDiv([title, _filterIcon, sortIcon])
            return headerCom
        }
    }
})

//昆虫

//bug

//错误

//克莱汤普森

//Klay make some mistake at first lesson, give  rise to  lose some basketball scores
//篮球比分
//第一节

//赛季
//冠军
//in the season of stephon win the champion ,