import { defineComponent } from 'vue'
import { menuItem } from '../menu'
export default defineComponent({
    props: ['menuItem'],
    setup(props: any) {
        const menuItem = props.menuItem as menuItem
        return menuItem.component
    }
})