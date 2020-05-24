// ------------ 请求拦截器 ------------
import axios from 'axios'
import {Message} from 'element-ui' // 前面element-ui是在vue中全局引入，我们js文件这边需要重新引入才能使用

// 创建axios，赋给变量service - 基本配置
// const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
const service = axios.create({
    // baseURL: BASEURL,
    baseURL: '/api',
    timeout: 8000, // 超时
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data
    if (data["resCode"] !== 0) {
        Message.error(data.message)
        return Promise.reject(data);
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;