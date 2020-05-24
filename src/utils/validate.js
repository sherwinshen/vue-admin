// ------------ 表单验证相关内容 ------------

//  过滤字符串
export function strScript(s) {
    const pattern = new RegExp("[`~!@#$^&*()=|{}':;,.<>/?！￥…（）—【】‘；：”“。，、？]");
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

// 验证邮箱
export function emailRule(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value)
}

// 验证密码
export function passwordRule( value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
    return !reg.test(value)
}

// 验证验证码
export function codeRule(value) {
    let reg = /^[a-z0-9]{6}$/
    return !reg.test(value)
}
