import {Login} from '../../api/login.js'
import {setToKen, setUserName, getUserName, removeToKen, removeUserName} from "../../utils/cookies";


const state = {
    toKen: '',
    userName: getUserName() || '',
    roles: [], // 用户角色
    buttonPermission: []
}
const mutations = {
    SET_TOKEN(state, value) {
        state.toKen = value
    },
    SET_USERNAME(state, value) {
        state.userName = value
    },
    SET_ROLES(state, value) {
        state.roles = value
    },
    SET_BUTTON(state, value) {
        state.buttonPermission = value;
    }
}
const getters = {
    roles: state => state.roles,
    buttonPermission: state => state.buttonPermission
}
const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then((response) => {
                content.commit('SET_TOKEN', response.data.data.token)
                content.commit('SET_USERNAME', response.data.data.username)
                setToKen(response.data.data.token)
                setUserName(response.data.data.username)
                resolve(response)
            }).catch((error) => {
                reject(error)
            })
        })
    },
    exit(content) {
        return new Promise((resolve) => {
            removeToKen();
            removeUserName();
            content.commit('SET_TOKEN', '');
            content.commit('SET_USERNAME', '');
            content.commit('SET_ROLES', []);
            resolve();
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};