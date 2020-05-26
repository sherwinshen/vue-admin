const app = {
    namespaced: true,
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
    },
    mutations: {
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        }
    },
    actions: {},
    modules: {}
}

export default app;