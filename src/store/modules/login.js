import {Login} from '../../api/login.js'
import {setToKen, setUserName, getUserName, removeToKen, removeUserName} from "../../utils/cookies";


const state = {
    toKen: '',
    userName: getUserName() || ''
}
const mutations = {
    SET_TOKEN(state, value) {
        state.toKen = value
    },
    SET_USERNAME(state, value) {
        state.userName = value
    }
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
            resolve();
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};