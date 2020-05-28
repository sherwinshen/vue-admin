<template>
    <el-dialog title="新增" :visible.sync="dialog_add" @close="close" width="580px">
        <el-form ref="form" :model="form">
            <el-form-item label="类型:" label-width="50px">
                <el-select v-model="form.category" placeholder="请选择">
                    <el-option
                            v-for="item in category_options"
                            :key="item.id"
                            :value="item.id"
                            :label="item.category_name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题:" label-width="50px">
                <el-input v-model="form.title" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="概况:" label-width="50px">
                <el-input type="textarea" v-model="form.content" placeholder="请输入内容" :rows="5"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn-group">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {ref, reactive, watchEffect} from '@vue/composition-api'

    export default {
        name: "dialogInfoAdd",
        props: {
            flag: {
                type: Boolean,
                default: false
            }
        },
        setup(props, {emit}) {
            const dialog_add = ref(false)
            const form = reactive({
                category: '',
                title: '',
                content: ''
            })
            const category_options = reactive([])
            watchEffect(() => {
                dialog_add.value = props.flag
            })

            const close = (() => {
                dialog_add.value = false
                emit('update:flag', false)
            })
            const submit = (() => {
            })
            return {dialog_add, form, category_options, close, submit}
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