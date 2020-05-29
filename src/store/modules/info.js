import {GetCategory} from '../../api/info'

const state = {
    /**
     * 已经储存了值，不刷新页面的时候，值一直存在vuex
     * 刷新页面，就会去取session的值，赋值给变量
     */
    id: '' || sessionStorage.getItem('infoId'),
    title: '' || sessionStorage.getItem('infoTitle')
}

const actions = {
    // 获取目录
    getInfoCategory() {
        return new Promise((resolve, reject) => {
            GetCategory().then(response => {
                resolve(response.data.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

const mutations = {
    // 编辑的初始信息暂存
    UPDATE_STATE_VALUE(state, params) {
        for (let key in params) {
            state[key] = params[key].value
            // session存储 - 防止刷新就不显示
            if (params.key.session) {
                sessionStorage.setItem(params.key.sessionKey, params.key.value)
            }
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};