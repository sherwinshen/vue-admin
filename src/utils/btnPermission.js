// 自定义指令

import Vue from "vue";
import store from "../store/index.js";

Vue.directive("btnPerm", {
    // 父级未渲染
    bind:function(el, binding){
        // 操作DOM
        if(binding.def.hasBtnPerm(binding.value)) {
            el.className = el.className + " show-button";
        }
    },

    // 检测是否有权限的方法
    hasBtnPerm:function(permission){
        const button = store.getters["login/buttonPermission"]; // 请求到的数据权限
        const roles = store.getters["login/roles"]; // 获取角色
        if(roles.includes("admin")) { return true }
        return button.indexOf(permission) !== -1; //
    }
})

