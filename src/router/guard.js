// 路由守卫
import router from "./index"
import store from "../store/index"
import {getToKen, removeToKen, removeUserName} from "../utils/cookies";

// 设置白名单
const whiteRouter = ['/login'];

/**
 * 1、直接进入index的时候，参数to被改变成了 "/index"，触发路由指向，就会跑beforeEach
 * 2、再一次 next 指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
 * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次beforeEach。
 */

router.beforeEach((to, from, next) => {
    if (getToKen()) {
        // token 存在
        if (to.path === '/login') {
            removeToKen()
            removeUserName()
            store.commit('login/SET_TOKEN', '')
            store.commit('login/SET_USERNAME', '')
        }
        next()
    } else {
        // token不存在 - 跳转登录页面
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})