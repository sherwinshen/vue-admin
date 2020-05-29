<template>
    <el-dialog title="编辑" :visible.sync="dialog_edit" @close="close" @open="openDialog" width="580px">
        <el-form ref="form" :model="form">
            <el-form-item label="类型:" label-width="50px" prop="category">
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option
                            v-for="item in category_options.data"
                            :key="item.id"
                            :value="item.id"
                            :label="item.category_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题:" label-width="50px" prop="title">
                <el-input v-model="form.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="概况:" label-width="50px" prop="content">
                <el-input type="textarea" v-model="form.content" placeholder="请输入内容" :rows="5"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="submit" :loading="submitLoading">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {reactive, ref, watchEffect} from "@vue/composition-api";
    import {EditInfo, GetList} from "../../api/info";

    export default {
        name: "dialogInfoEdit",
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            category: {
                type: Array,
                default: () => []
            },
            id: {
                type: String,
                default: ''
            }
        },
        setup(props, {root, emit}) {
            const dialog_edit = ref(false)
            const form = reactive({
                category: '',
                title: '',
                content: ''
            })
            const submitLoading = ref(false)
            const category_options = reactive({
                data: []
            })
            watchEffect(() => {
                dialog_edit.value = props.flag
            })
            const close = (() => {
                dialog_edit.value = false
                emit('update:flag', false)
                resetForm()
            })
            const openDialog = (() => {
                category_options.data = props.category
                console.log(props)
                getInfo()
            })
            const resetForm = (() => {
                form.category = ''
                form.content = ''
                form.title = ''
                // refs['addInfoForm'].resetFields();
            })
            // 获取表单初始信息
            const getInfo = (() => {
                let requestData = {
                    id: props.id,
                    pageNumber: 1,
                    pageSize: 1
                }
                GetList(requestData).then(response => {
                    let data = response.data.data.data[0]
                    form.category = data.categoryId
                    form.title = data.title
                    form.content = data.content
                })
            })
            const submit = (() => {
                submitLoading.value = true
                let requestData = {
                    id: props.id,
                    categoryId: form.category,
                    title: form.title,
                    content: form.content
                }
                EditInfo(requestData).then(response => {
                    let responseData = response.data
                    root.$message({
                        message: responseData.message,
                        type: 'success'
                    })
                    submitLoading.value = false
                    /**
                     * 两种刷新数据方式
                     * 1、暴力型，直接刷新接口
                     * 2、返回列表，手动修改指定的数据
                     */
                    emit('getEditedList')
                    dialog_edit.value = false
                }).catch(() => {
                    submitLoading.value = false
                })
            })
            return {dialog_edit, form, category_options, close, openDialog, submit, submitLoading}
        }

    }
</script>

<style lang="scss" scoped>
    .btn-group {
        text-align: center;

        .el-button {
            width: 180px;
        }
    }
</style>