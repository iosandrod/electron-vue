import { confirm } from "@/schema/dialog"
export const confirmMiddleware = (payload: any, next: any) => {
    return new Promise((resolve, reject) => {
        confirm({
            callback: async (dialog) => {
                resolve(true)
            },
            cancelCallback: async (dia) => {
                resolve(false)
            },
            message: '提示信息'
        })
    }).then(async (status) => {
        if (status == true) {
            return next()
        } else {
            return Promise.reject('cancel')
        }
    })
}


export const confirmBefore = async () => {
    return new Promise((resolve, reject) => {
        confirm({
            callback: async (dialog) => {
                resolve(true)
            },
            cancelCallback: async (dia) => {
                resolve(false)
            },
            message: '提示信息'
        })
    })
}