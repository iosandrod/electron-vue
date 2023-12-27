import { formItemConfig } from "@/types/schema";

export const formitems: formItemConfig[] = [
    { type: 'number', field: 'menu_Id', disable: true },
    { type: 'number', field: 'id', disable: false },
    { type: 'string', field: 'menuName', disable: false },
    // { type: 'string', field: 'roleName' },
    { type: 'number', field: 'orderNo' },
    { type: 'string', field: 'tableName' },
    { type: 'number', field: 'parentId', disable: true },
    { type: 'string', field: 'url' },
    { type: 'string', field: 'icon' },
    { type: 'bool', field: 'enable' },//是否启用
    { type: 'string', field: 'auth' },
    { type: 'string', field: 'name' }
]

