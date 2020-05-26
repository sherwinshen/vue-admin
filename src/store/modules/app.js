const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}

const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    }
}

export default {
    namespaced: true,
    state,
    mutations
};