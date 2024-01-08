import { mainEntity } from "@/schema/businessTable/mainEntity"

// export functino
export function m_Preview(_this: mainEntity) {
}
export function m_Print(_this: mainEntity) {
}
export function m_Import(_this: mainEntity) {
}
export function m_Export(_this: mainEntity) {//导出数据
}
export function m_Add(_this: mainEntity
) {
}
export function m_Copy(_this: mainEntity) {
}
//编辑
export function m_Update(_this: mainEntity) {
    const curRow = _this.getTableInfoKey('curRow')
    let status = false
    console.log(curRow, 'testCurRow')
    if (curRow) {
        let cStatus = curRow['cStatus']
        if (['A', 'F', 'G', 'F'].includes(cStatus) || cStatus == 'C') {
            status = true
        }
    } else {
        status = true
    }
    return status
}
//删除的
export function m_Delete(_this: mainEntity) {
    const curRow = _this.getTableInfoKey('curRow')
    let status = false
    if (curRow) {
        let cStatus = curRow['cStatus']
        if (!(cStatus != 'A' && cStatus != 'D') || cStatus == 'C') {
            status = true
        }
        let selectRow = _this.getTableInfoKey("selectRows")
        if (selectRow.length > 1) {
            status = true
        }
    } else {
        status = true
    }
    return status
}
//审核的按钮权限
export function m_Audit(_this: mainEntity) {
    const curRow = _this.getTableInfoKey('curRow')
    let status = false
    if (curRow) {
        let cStatus = curRow['cStatus']
        if (!(cStatus != 'A' && cStatus != 'D') || cStatus == 'C') {
            status = true
        }
        let selectRow = _this.getTableInfoKey("selectRows")
        if (selectRow.length > 1) {
            status = true
        }
    } else {
        status = true
    }
    return status
}
//反审
export function m_UnAudit(_this: mainEntity) {
    const curRow = _this.getTableInfoKey('curRow')
    let status = false
    if (curRow) {
        let cStatus = curRow['cStatus']
        if ((cStatus != 'A' && cStatus != 'D') || cStatus == 'C') {
            status = true
        }
    } else {
        status = true
    }
    return status
}
//关闭按钮
export function m_Close(_this: mainEntity) {
    const curRow = _this.getTableInfoKey('curRow')
    let status = false
    if (curRow) {
        let cStatus = curRow['cStatus']
        if (cStatus == 'C' || cStatus == null) {
            status = true
        }
    } else {
        status = true
    }
    return status
}
export function m_Opean(_this: mainEntity) {
    const curRow = _this.getTableInfoKey('curRow')
    let status = false
    if (curRow) {
        let cStatus = curRow['cStatus']
        if (cStatus != 'C') {
            status = true
        }
    } else {
        status = true
    }
    return status
}
export function m_FastSearch(_this: mainEntity) {
}
export function m_Refresh(_this: mainEntity) {//刷新按钮

}
export function m_Quit(_this: mainEntity) {
}
export function m_Structure(_this: mainEntity) {
}
export function m_ShowSearchMenu(_this: mainEntity) {
}
export function m_AddSelectRow(_this: mainEntity) {
}
export function m_CloseVolBox(_this: mainEntity) {
}
export function m_AddRow(_this: mainEntity) {
}
export function m_DelRow(_this: mainEntity) {
}
export function m_Save(_this: mainEntity) {
}
