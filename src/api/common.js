import service from "../utils/interceptor"

/**
 * 获取七牛云token
 *  AK: 七牛云的密钥AK；type: string
 *  SK: 七牛云的密钥AK；type: string
 *  buckety: 七牛云储存空间名称；type: string
 */
export function QiniuToKen(data) {
    return service.request({
        method: "post",
        url: "/uploadImgToken/",
        data
    })
}

// 请求表格数据
export function loadTableData(params) {
    return service.request({
        method: params.method || "post",
        url: params.url,
        data: params.data || {}
    })
}

//  获取省市区街关联
export function GetCityPicker(data) {
    return service.request({
        method: "post",
        url: "/cityPicker/",
        data
    })
}