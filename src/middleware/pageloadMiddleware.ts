import { basicEntity } from "@/schema/businessTable/basicEntity"

export const pageloadMiddleware = async (payload: any, next: any) => {
    const entity = payload.entity as basicEntity
    entity.pageConfig.loading = true
    await next()
    entity.pageConfig.loading = false
}