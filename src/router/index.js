import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const layout = () => import('../views/Layout/index');

// 默认路由 - 所有权限都能访问
export const defaultRouterMap = [
    {
        path: '/',
        name: 'Index',
        redirect: 'login',
        hidden: true
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        component: () => import('../views/Login/index')
    },
    {
        path: '/console',
        name: 'Console',
        redirect: '/homeIndex',
        component: layout,
        meta: {
            name: '控制台',
            icon: 'panel'
        },
        children: [
            {
                path: '/homeIndex',
                meta: {
                    name: '首页'
                },
                component: () => import('../views/Console/index')
            }
        ]
    },

]

// 动态路由 - 根据权限设定访问
export const asyncRouterMap = [
    {
        path: '/info',
        name: 'info',
        component: layout,
        meta: {
            role: ['sale', 'manager'],
            name: '信息管理',
            icon: 'xinxi'
        },
        children: [
            {
                path: '/infoIndex',
                component: () => import('../views/Info/index'),
                meta: {
                    role: ['sale', 'manager'],
                    name: '信息列表'
                }
            },
            {
                path: '/infoCategory',
                component: () => import('../views/Info/category'),
                meta: {
                    role: ['sale'],
                    name: '信息分类'
                }
            },
            {
                path: '/infoDetailed',
                name: 'infoDetailed',
                hidden: true,
                component: () => import('../views/Info/detailed'),
                meta: {
                    role: ['sale'],
                    name: '信息详情'
                }
            }
        ]
    },
    {
        path: '/user',
        name: 'User',
        component: layout,
        meta: {
            role: ['manager'],
            name: '用户管理',
            icon: 'yonghu'
        },
        children: [
            {
                path: "/userIndex",
                component: () => import('../views/User/index'),
                meta: {
                    role: ['manager'],
                    name: '用户列表'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes: defaultRouterMap
})

export default router
