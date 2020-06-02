import service from "../utils/interceptor";

// 用户列表
export function UserList(data = {}) {
    return service.request({
        method: "post",
        url: "/user/getList",
        data
    })
}

// 用户添加
export function UserAdd(data = {}) {
    return service.request({
        method: "post",
        url: "/user/add/",
        data
    })
}

// 用户编辑
export function UserEdit(data) {
    return service.request({
        method: "post",
        url: "/user/edit/",
        data
    })
}

// 用户删除
export function UserDel(data) {
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}

// 用户禁启用
export function UserActives(data) {
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    })
}

// 获取系统
export function GetSystem(data = {}) {
    return service.request({
        method: "post",
        url: "/system/",
        data
    })
}

// 获取角色
export function GetRole(data = {}) {
    return service.request({
        method: "post",
        url: "/role/",
        data
    })
}

// 获取按钮权限
export function GetPermButton(data = {}) {
    return service.request({
        method: "post",
        url: "/permButton/",
        data
    })
}