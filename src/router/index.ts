import { type RouteRecordRaw, createRouter, RouterView } from "vue-router"
import { history, flatMultiLevelRoutes } from "./helper"


/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/auth/login.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    name: "index",
    component: () => import('@/views/index.vue'),
    redirect: '/index8',//is mainEntity
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import('@/views/home.vue')
      },
      {
        path: "/index8",
        name: "index8",
        component: () => import("@/views/index8.vue")
      },
      {
        path: "/index9",
        name: "index9",
        component: () => import("@/views/index9.vue")
      },
      {
        path: "/index10",
        name: "index10",
        component: () => import("@/views/index10.vue")
      },
      {
        path: "/index1",
        name: "index1",
        component: () => import("@/views/index1.vue")
      },
      {
        path: "/index2",
        name: "index2",
        component: () => import("@/views/index2.vue")
      },
      {
        path: "/index3",
        name: "index3",
        component: () => import("@/views/index3.vue")
      },
      {
        path: "/index4",
        name: "index4",
        component: () => import("@/views/index4.vue")
      },
      {
        path: "/index5",
        name: "index5",
        component: () => import("@/views/index5.vue")
      },
      {
        path: "/index6",
        name: "index6",
        component: () => import("@/views/index6.vue")
      },
      {
        path: "/index7",
        name: "index7",
        component: () => import("@/views/index7.vue")
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    // component: () => import('@/views/index8.vue'),
    component: () => import('@/views/index.vue'),
    meta: {
      hidden: true
    }
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [

]

const router = createRouter({
  history,
  routes: [...constantRoutes]
})
// router.addRoute()
/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route: any) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router

export const getRouter = () => {
  return router
}


//