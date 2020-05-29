import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import app from './modules/app'
import login from './modules/login'
import info from './modules/info'

export default new Vuex.Store({
    modules: {
        app,
        login,
        info
    }
})
