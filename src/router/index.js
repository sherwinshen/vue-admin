import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const layout = () => import('../views/Layout/index');
const routes = [
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
    {
        path: '/info',
        name: 'info',
        component: layout,
        meta: {
            name: '信息管理',
            icon: 'xinxi'
        },
        children: [
            {
                path: '/infoIndex',
                component: () => import('../views/Info/index'),
                meta: {
                    name: '信息列表'
                }
            },
            {
                path: '/infoCategory',
                component: () => import('../views/Info/category'),
                meta: {
                    name: '信息分类'
                }
            },
            {
                path: '/infoDetailed',
                component: () => import('../views/Info/detailed'),
                meta: {
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
            name: '用户管理',
            icon: 'yonghu'
        },
        children: [
            {
                path: "/userIndex",
                component: () => import('../views/User/index'),
                meta: {
                    name: '用户列表'
                }
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
