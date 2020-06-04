<template>
    <div id="info-detailed">
        <el-row>
            <el-col :span="22">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="信息分类">
                        <el-select v-model="form.categoryId" placeholder="请选择活动区域">
                            <el-option v-for="item in category_options.data" :key="item.id" :value="item.id" :label="item.category_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新闻标题：">
                        <el-input v-model="form.title" class="detail-title"></el-input>
                    </el-form-item>
                    <el-form-item label="缩略图：">
                        <UploadImg :imgUrl.sync="form.imgUrl" :config="uploadImgConfig"></UploadImg>
                    </el-form-item>
                    <el-form-item label="发布日期：">
                        <el-date-picker v-model="form.createDate" type="date" placeholder="选择日期" disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="详细内容：" class="detailContent">
                        <quillEditor v-model="form.content" ref="myQuillEditor" :options="editorOption"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit" :loading="submitLoading">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="2">
                <div class="back" @click="back">
                    返回 <i class="el-icon-right"></i>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {reactive, ref, onMounted,onActivated} from '@vue/composition-api'
    import {GetList, EditInfo} from "../../api/info";
    import {TimestampToDate} from '../../utils/formatData'
    import UploadImg from '../../components/uploadImg/index'

    import {quillEditor} from "vue-quill-editor";
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';

    export default {
        name: "detailed",
        components: {quillEditor, UploadImg},
        setup(props, {root}) {
            console.log('onCreated')
            // ----------------------------------- 声明数据 -----------------------------------
            // 当前编辑项的ID
            const id = root.$route.query.id
            // 信息表单
            const form = reactive({
                categoryId: '',
                title: '',
                createDate: '',
                content: '',
                imgUrl: ''
            })
            // 分类选项
            const category_options = reactive({
                data: []
            })
            // 图片上传配置
            const uploadImgConfig = reactive({
                action: "http://up-z2.qiniup.com",
                accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
                secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
                buckety: "webjshtml"
            });
            // // 图片上传key
            // const uploadKey = reactive({
            //     token: ''
            // })
            // 其他
            const submitLoading = ref(false)
            const editorOption = reactive({})

            // ----------------------------------- 声明函数 -----------------------------------
            // 提交
            const submit = (() => {
                let requestData = {
                    id: id,
                    categoryId: form.categoryId,
                    content: form.content,
                    imgUrl: form.imgUrl,
                    title: form.title,
                }
                submitLoading.value = true
                EditInfo(requestData).then(response => {
                    let responseData = response.data
                    root.$message({
                        message: responseData.message,
                        type: 'success'
                    })
                    submitLoading.value = false
                    // root.$router.back(-1)
                }).catch(() => {
                    submitLoading.value = false
                })
            })
            // 获取分类选项
            const getInfoCategory = (() => {
                root.$store.dispatch('info/getInfoCategory').then(response => {
                    category_options.data = response
                })
            })
            // 获取页面的初始值
            const getInfo = () => {
                let requestData = {
                    pageNumber: 1,
                    pageSize: 1,
                    id: id
                }
                GetList(requestData).then(response => {
                    let responseData = response.data.data.data[0]
                    form.categoryId = responseData.categoryId;
                    form.title = responseData.title;
                    form.createDate = TimestampToDate(responseData.createDate);
                    form.content = responseData.content
                })
            }
            // 返回上一页
            const back = (() => {
                root.$router.back(-1)
            })

            onMounted(() => {
                console.log('onMounted')
                getInfoCategory()
                getInfo()
            })

            onActivated(()=>{
                console.log('onActivated')
            })

            // ----------------------------------- return -----------------------------------
            return {submitLoading, id, form, editorOption, uploadImgConfig, category_options, submit, back,}
        }
    }
</script>

<style lang="scss">
    #info-detailed {
        .el-button {
            width: 120px;
        }

        .back {
            text-align: right;
            color: $color-main;
            cursor: pointer;
        }

        .detail-title {
            width: 500px;
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>