import router from "./index"
import store from "../store/index"
import {getToKen, removeToKen, removeUserName} from "../utils/cookies";

// 设置白名单
const whiteRouter = ['/login'];
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