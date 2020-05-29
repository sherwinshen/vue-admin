<template>
    <el-dialog title="新增" :visible.sync="dialog_add" @close="close" @open="openDialog" width="580px">
        <el-form ref="addInfoForm" :model="form">
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
    import {ref, reactive, watch} from '@vue/composition-api'
    import {AddInfo} from '../../api/info'

    export default {
        name: "dialogInfoAdd",
        props: {
            flag: {
                type: Boolean,
                default: false
            },
            category: {
                type: Array,
                default: () => []
            }
        },
        setup(props, {root, emit, refs}) {
            const dialog_add = ref(false)
            const submitLoading = ref(false)
            const form = reactive({
                category: '',
                title: '',
                content: ''
            })
            const category_options = reactive({
                data: []
            })
            watch(() => props.flag, (val) => {
                dialog_add.value = val
            })
            // 下面watchEffect写法等同watch写法
            // watchEffect(() => {
            //     dialog_add.value = props.flag
            // })
            const close = (() => {
                resetForm()
                dialog_add.value = false
                emit('update:flag', false)
            })
            const openDialog = (() => {
                category_options.data = props.category
            })
            const resetForm = (() => {
                refs['addInfoForm'].resetFields();
            })
            // 添加信息
            const submit = (() => {
                submitLoading.value = true
                if (!form.category) {
                    root.$message({
                        message: '分类不能为空！！',
                        type: 'error'
                    })
                    return false;
                }
                AddInfo(form).then(response => {
                    let responseData = response.data
                    root.$message({
                        message: responseData.message,
                        type: 'success'
                    })
                    submitLoading.value = false
                    resetForm()
                }).catch(() => {
                    submitLoading.value = false
                    resetForm()
                })
            })
            return {dialog_add, submitLoading, form, category_options, close, submit, openDialog}
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