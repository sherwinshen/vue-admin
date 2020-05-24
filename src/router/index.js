import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: 'login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/index.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
