// ------------ 登录模块接口api ------------
import service from "../utils/interceptor"

// 获取验证码
export function GetSms(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data
    })
}

// 登录
export function Login(data) {
    return service.request({
        method:'post',
        url: '/login/',
        data
    })
}

// 注册
export function Register(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}

