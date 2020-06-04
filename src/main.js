import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';
import 'components/svgIcon' // 引入自定义全局组件 - svg-icons
import './router/guard' // 引入路由守卫
import "./utils/btnPermission"; // 引入自定义指令按钮权限


Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
