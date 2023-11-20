import { computed, defineComponent, h } from 'vue'
import { column } from '../column'
import { getOutSizeDiv, getSlotHeaderFilterIcon, getSlotHeaderSortIcon } from '../columnFn'
import { StyleType } from '@/types/schema'
import { usePropsDiv } from '../icon'
import { Pulldown } from 'vxe-table'
import { styleBuilder } from '@/utils/utils'

export default defineComponent({
    props: ['column', 'row'],
    setup(props, context) {
        //行与列
        const column = computed(() => {
            return props.column as column
        })
        const pulldownShow = computed({
            get() {
                return column.value.columnConfig.filterPulldownShow
            },
            set(value) {
                column.value.columnConfig.filterPulldownShow = value
            }
        })
        return () => {
            const showHeader = column.value.columnConfig.showHeader
            if (showHeader == false) {
                return
            }
            const headerHeight = 30
            // const headerHeight = getColumnRowHeight(column.value).value
            const style: StyleType = {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: `${headerHeight}px`,
            }
            const outSizeDiv = usePropsDiv({ style })
            const renderColumn = column.value.renderColumn
            const title: string = renderColumn.title as string || 'title'
            const _filterIcon = column.value.columnConfig.showFilter == true ? getSlotHeaderFilterIcon(column.value) : null
            const sortIcon = column.value.columnConfig.showSort == true ? getSlotHeaderSortIcon(column.value) : null
            //排序图标
            let headerCom = outSizeDiv([title, _filterIcon, sortIcon])
            let pulldown = h(Pulldown, {
                transfer: true,
                modelValue: pulldownShow.value as boolean,
                ['onUpdate:modelValue']: (value1: any) => {
                    pulldownShow.value = value1
                },
            }, {
                default: () => {
                    return headerCom
                },
                dropdown: () => {
                    const style: StyleType = styleBuilder.setFlexColumn().getStyle()
                    return h('div', { style }, Array(1000).fill(1).map(v => v))
                }
            })
            return pulldown
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