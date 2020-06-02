<template>
    <el-dialog title="新增" :visible.sync="dialog_user_add" width="660px" @close="closeDialog" @opened="openDialog">
        <el-form ref="addUserForm" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop='truename'>
                <el-input v-model="form.truename"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop='password'>
                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="region">
                <div class="clear-margin">
                    <city-picker :cityPickerData.sync="cityPickerData.data"></city-picker>
                </div>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
                <el-radio v-model="form.status" label="1">禁用</el-radio>
                <el-radio v-model="form.status" label="2">启用</el-radio>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-checkbox-group v-model="form.role">
                    <el-checkbox v-for="item in roleItems.data" :key="item.role" :label="item.role">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label-width="0">
                <div class="btn-group">
                    <el-button @click="closeDialog">取消</el-button>
                    <el-button type="primary" @click="submit('addUserForm')">确定</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {ref, watch, reactive} from '@vue/composition-api'
    import {GetRole} from "../../api/user";
    import CityPicker from '../../components/cityPicker/index'
    import {emailRule, passwordRule, strScript} from '../../utils/validate'
    import sha1 from 'js-sha1'
    import {UserAdd, UserEdit} from "../../api/user";

    export default {
        name: "dialogUserAdd",
        components: {CityPicker},
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            editData: {
                type: Object,
                default: () => {
                }
            }
        },
        setup(props, {root, emit, refs}) {
            // 验证用户名
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (emailRule(value)) {
                    callback(new Error('用户名格式有误'));
                } else {
                    callback();
                }
            };
            // 验证密码
            let validatePassword = (rule, value, callback) => {
                /**
                 * 业务逻辑
                 * 1、编辑状态：
                 *    需要检验：data.form.id存在并且，密码不为空时
                 *    不需要检验：data.form.id存在并且，密码为空时
                 *
                 * 2、添加状态
                 *    需要检验：data.form.id不存在
                 */
                if (form.id && !value) {
                    callback();
                }
                if ((form.id && value) || !form.id) {
                    // 过滤后的数据
                    if (value) {
                        form.password = strScript(value);
                        value = form.password;
                    }
                    if (value === '') {
                        callback(new Error("请输入密码"));
                    } else if (passwordRule(value)) {
                        callback(new Error("密码为6至20位数字+字母"));
                    } else {
                        callback();
                    }
                }
            }
            // 表单验证规则
            const rules = reactive({
                username: [{
                    required: true, validator: validateEmail, trigger: 'blur'
                }],
                password: [{
                    required: true, validator: validatePassword, trigger: 'blur'
                }],
                role: [{
                    required: true, message: "请选择角色", trigger: 'change'
                }]
            });

            // 禁启用配置
            const dialog_user_add = ref(false)
            // 表单内容
            let form = reactive({
                username: "",
                truename: "",
                password: '',
                phone: "",
                region: "",
                status: "2",
                role: []
            })
            let cityPickerData = reactive({
                data: {}
            })
            // 角色选项
            const roleItems = reactive({
                data: []
            })

            watch([() => props.flag], ([valFlag]) => {
                dialog_user_add.value = valFlag
            })

            // 打开弹框
            const openDialog = (() => {
                // 初始化role内容
                getRole()
                // 初始化数据
                initData(props.editData)
            })
            // 初始化数据
            const initData = (params) => {
                if (params.id) {
                    params.role = params.role.split(',')
                    for (let key in params) {
                        form[key] = params[key]
                    }
                } else {
                    form.id && delete form.id
                }
            }
            // 关闭弹框
            const closeDialog = (() => {
                dialog_user_add.value = false;
                emit("update:flag", false);
                resetForm()
            })
            // 清空表单
            const resetForm = () => {
                cityPickerData.data = {}
                refs.addUserForm.resetFields();
            }
            // 获取角色list
            const getRole = (() => {
                if (roleItems.data.length === 0) {
                    GetRole().then(response => {
                        roleItems.data = response.data.data
                    })
                }
            })
            // 提交表单
            const submit = (formName) => {
                // 表单验证
                refs[formName].validate((valid) => {
                    // 表单验证通过
                    if (valid) {
                        // 区域合并字符串
                        let requestData = Object.assign({}, form);
                        requestData.role = requestData.role.join();
                        requestData.region = JSON.stringify(cityPickerData.data);
                        requestData.password = sha1(requestData.password);
                        // 添加状态：需要密码，并且加密码
                        // 编辑状态：值存在，需要密码，并且加密码；否删除
                        if (requestData.id) {
                            if (requestData.password) {
                                requestData.password = sha1(requestData.password)
                            } else {
                                delete requestData.password
                            }
                            userEdit(requestData)
                        } else {
                            userAdd(requestData);
                        }
                    } else {
                        resetForm()
                        return false;
                    }
                })
            }
            // 添加用户
            const userAdd = ((requestData) => {
                UserAdd(requestData).then(response => {
                    let data = response.data
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    closeDialog();
                    emit('refreshTableData');
                })
            })
            // 编辑用户
            const userEdit = ((requestData) => {
                UserEdit(requestData).then(response => {
                    let data = response.data
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    closeDialog();
                    emit('refreshTableData');
                })
            })
            return {dialog_user_add, rules, form, cityPickerData, roleItems, closeDialog, openDialog, submit}
        }
    }
</script>

<style lang="scss" scoped>
    .clear-margin {
        .el-row {
            margin: 0 !important;
        }
    }
</style>