// ------------ 信息管理接口api ------------
import service from "../utils/interceptor"

// 获取信息分类（包含子级）
export function GetCategoryAll(data) {
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
    })
}

// 获取信息分类
export function GetCategory(data) {
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}


// 信息分类添加一级
export function AddFirstCategory(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}

// 信息分类添加子级
export function AddChildrenCategory(data) {
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
    })
}

// 删除信息分类
export function DeleteCategory(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}

// 修改信息分类
export function EditCategory(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}

// 获取信息列表
export function GetList(data) {
    return service.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

// 添加信息
export function AddInfo(data) {
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}

// 修改信息
export function EditInfo(data) {
    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data
    })
}

// 删除信息
export function DeleteInfo(data) {
    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    })
}
