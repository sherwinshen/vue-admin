// 权限相关处理
import {GetUserRole} from "../../api/login";
import {asyncRouterMap, defaultRouterMap} from "../../router";

function filterRouter(roles, router) {
    return router.filter(item => {
        if (hasPermission(roles, item.meta.role)) {
            if (item.children && item.children.length > 0) {
                item.children = filterRouter(roles, item.children)
            }
            return item
        }
    })
}

function hasPermission(roles, itemRoles) {
    // some()方法用于检测数组中的元素是否满足指定条件,如果有一个元素满足条件,则表达式返回true,剩余的元素不会再执行检测
    return roles.some(item => itemRoles.indexOf(item) >= 0)
}

const state = {
    allRouters: defaultRouterMap,
    addRouters: []
}
const getters = {
    allRouters: state => state.allRouters, // 所有的路由
    addRouters: state => state.addRouters,  // 匹配（动态添加）的路由
}
const mutations = {
    SET_ROUTER(state, addRouters) {
        state.addRouters = addRouters
        state.allRouters = defaultRouterMap.concat(addRouters, asyncRouterMap.slice(-1))
    }
}
const actions = {
    // 获取用户角色
    getRoles() {
        return new Promise(resolve => {
            GetUserRole().then(response => {
                resolve(response.data.data)
            })
        })
    },
    // 按角色分配路由权限
    createRouter(content, roles) {
        return new Promise(resolve => {
            let addRouters;
            if (roles.includes('admin')) {
                // 超级管理员
                addRouters = asyncRouterMap
            } else {
                // 普通管理员
                addRouters = filterRouter(roles, asyncRouterMap)
            }
            // 更新路由
            content.commit('SET_ROUTER', addRouters)
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};