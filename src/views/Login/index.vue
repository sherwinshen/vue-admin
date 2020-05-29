<template>
    <div id="login">
        <div class="login-wrapper">
            <!--表单按钮-->
            <ul class="menu-tab">
                <li v-for="(item,index) in menuTab" :key="index" :class="{'current':item.isCurrent}"
                    @click="toggleMenu(item)">{{item.txt}}
                </li>
            </ul>
            <!--表单内容-->
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
                <el-form-item prop="email" class="login-form-item">
                    <label for="email">邮箱</label>
                    <el-input id="email" type="email" v-model="loginForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="login-form-item">
                    <label for="email">密码</label>
                    <el-input id="password" type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="passwordRepeat" class="login-form-item" v-show='model==="register"'>
                    <label for="passwordRepeat">重复密码</label>
                    <el-input id="passwordRepeat" type="password" v-model="loginForm.passwordRepeat" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code" class="login-form-item">
                    <label for="code">验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input id="code" type="text" v-model="loginForm.code" autocomplete="off" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button class="block" type="success" @click="getSms()" :disabled="codeButton.disabled">{{codeButton.text}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button class="block login-btn" type="danger" @click="submitForm('loginForm')" :disabled="loginButton.disabled">{{model==='login' ?
                        "登录":"注册"}}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import {reactive, ref} from "@vue/composition-api";
    import sha1 from "js-sha1";
    import {emailRule, passwordRule, codeRule} from "../../utils/validate"
    import {Register, GetSms} from "../../api/login";

    export default {
        name: "login",
        // setup(props, context) {
        setup(props, {refs, root}) {  // 解构的写法
            // 验证邮箱、密码、重复密码、验证码
            let validateEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                } else if (emailRule(value)) {
                    return callback(new Error('邮箱格式有误'));
                } else {
                    callback()
                }
            };
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (passwordRule(value)) {
                    return callback(new Error('密码为6至20位的数字和字母'));
                } else {
                    callback();
                }
            };
            let validatePasswordRepeat = (rule, value, callback) => {
                // 如果模块值为login, 直接通过
                if (model.value === 'login') {
                    callback();
                }
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== loginForm.password) {
                    callback(new Error('与密码不一致'));
                } else {
                    callback();
                }
            };
            let validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入验证码'));
                } else if (codeRule(value)) {
                    return callback(new Error('验证码为6位的数字或字母'));
                } else {
                    callback()
                }
            };

            // ----------------------------------- 声明数据 -----------------------------------
            // 登录注册模块标识
            const model = ref('login');
            // 登录注册按钮
            const menuTab = reactive([
                {'txt': '登陆', 'isCurrent': true, 'type': 'login'},
                {'txt': '注册', 'isCurrent': false, 'type': 'register'}
            ]);
            // 表单内容
            const loginForm = reactive({
                email: '306@qq.com',
                password: '1234sw',
                passwordRepeat: ''
            });
            // 登录按钮属性
            const loginButton = reactive({
                disabled: true
            });
            // 验证码按钮属性
            const codeButton = reactive({
                text: '获取验证码',
                disabled: false
            });
            // 表单验证规则
            const rules = reactive({
                email: [{
                    validator: validateEmail, trigger: 'blur'
                }],
                password: [{
                    validator: validatePassword, trigger: 'blur'
                }],
                passwordRepeat: [{
                    validator: validatePasswordRepeat, trigger: 'blur'
                }],
                code: [{
                    validator: validateCode, trigger: 'blur'
                }]
            });
            // 倒计时
            const timer = ref(null);

            // ----------------------------------- 声明函数 -----------------------------------
            // 切换模块
            const toggleMenu = ((item) => {
                menuTab.forEach(i => {
                    i.isCurrent = false;
                });
                item.isCurrent = true;
                model.value = item.type;
                clearCountDown(); // 清除倒计时
                resetFromData(); // 清除表单数据
            });
            // 清除表单数据
            const resetFromData = (() => {
                refs.loginForm.resetFields();
            });
            // 清除倒计时
            const clearCountDown = (() => {
                updateCodeBtn({
                    status: false,
                    text: '获取验证码'
                })
                clearInterval(timer.value)
            });
            // 验证码按钮属性更新
            const updateCodeBtn = ((params) => {
                codeButton.text = params.text
                codeButton.disabled = params.disabled
            });
            // 提交表单
            const submitForm = ((formName) => {
                refs[formName].validate((valid) => {
                    if (valid) {
                        model.value === 'login' ? login() : register();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            });
            // 登录
            const login = (() => {
                let requestData = {
                    username: loginForm.email,
                    password: sha1(loginForm.password),
                    code: loginForm.code
                }
                root.$store.dispatch('login/login', requestData).then(() => {
                    // 页面跳转
                    root.$router.push({name: 'Console'})
                }).catch(() => {
                    console.log('登录失败')
                })
            });
            // 注册
            const register = (() => {
                let requestData = {
                    username: loginForm.email,
                    password: sha1(loginForm.password),
                    code: loginForm.code,
                    module: 'register'
                }
                Register(requestData).then(response => {
                    let data = response.data;
                    root.$message({
                        message: data.message,
                        type: 'success'
                    });
                    toggleMenu(menuTab[0]); // 注册成功后自动跳转至登录栏
                }).catch(() => {
                    console.log('注册失败');
                });
            });
            // 获取验证码
            const getSms = (() => {
                // 先验证邮箱是否填写和是否有效
                if (loginForm.email === '') {
                    root.$message.error('邮箱不能为空');
                    return false;
                } else if (emailRule(loginForm.email)) {
                    root.$message.error('邮箱格式有误');
                    return false;
                }
                //禁用按钮并显示发送中
                updateCodeBtn({
                    text: '发送中',
                    disabled: true
                });
                // 获取验证码
                let requestData = {
                    username: loginForm.email,
                    module: model.value
                };
                GetSms(requestData).then(response => {
                    root.$message({
                        message: response.data.message,
                        type: 'success'
                    });
                    // 启用登录按钮
                    loginButton.disabled = false;
                    // 倒计时60s
                    countdown(60);
                }).catch(() => {
                    root.$message.error('获取验证码失败');
                });
            });
            // 倒计时
            const countdown = ((num) => {
                if (timer.value) {
                    clearInterval(timer.value);
                }
                let i = num;
                timer.value = setInterval(() => {
                    if (i > 0) {
                        i--;
                        codeButton.text = `倒计时${i}秒`
                    } else {
                        clearInterval(timer.value);
                        updateCodeBtn({
                            disabled: false,
                            text: '重新获取'
                        })
                    }
                }, 1000);
            });

            // ----------------------------------- return -----------------------------------
            return {
                // ref
                model,
                // reactive
                menuTab, loginButton, codeButton, loginForm, rules,
                // methods
                toggleMenu, getSms, submitForm
            }
        }
    }
</script>

<style lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #344a5f;
    }

    .login-wrapper {
        width: 330px;
        margin: auto;
        padding-top: calc(100vh / 7);
    }

    .menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 88px;
            line-height: 36px;
            color: white;
            font-size: 14px;
            border-radius: 2px;
            cursor: pointer;

            &.current {
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }

    .login-form {
        margin-top: 20px;

        .login-form-item {
            margin-bottom: 13px;
        }

        .block {
            display: block;
            width: 100%;
        }

        .login-btn {
            margin-top: 20px;
        }

        label {
            display: block;
            margin-bottom: 3px;
            font-size: 14px;
            color: white;
        }

        input {
            display: inline-block;
            width: 100%;
        }
    }
</style>