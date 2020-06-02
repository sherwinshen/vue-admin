<template>
    <el-upload
            class="avatar-uploader"
            :action="config.action"
            :data="data.uploadKey"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    import {reactive, watch, onMounted} from '@vue/composition-api';
    import {QiniuToKen} from "../../api/common";

    export default {
        name: "upload-img",
        props: {
            imgUrl: {
                type: String,
                default: ""
            },
            config: {
                type: Object,
                default: () => {
                }
            }
        },
        setup(props, {root}) {
            const data = reactive({
                imageUrl: "",
                uploadKey: {
                    token: "",
                    key: ""
                }
            });

            // 图片上传后操作
            const handleAvatarSuccess = () => {
                // let image = `${root.$store.getters["common/qiniuUrl"]}${res.key}`;
                // data.imageUrl = image;
                // emit("update:imgUrl", image);
                root.$message.error('目前暂不支持上传服务器，仅模拟使用');
            }
            // 图片上传前操作
            const beforeAvatarUpload = (file) => {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    root.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    root.$message.error('上传头像图片大小不能超过 2MB!');
                }
                // 文件名转码
                let suffix = file.name;
                data.uploadKey.key = encodeURI(`${suffix}`);
                return isJPG && isLt2M;
            }
            /**
             * 获取七牛云token
             */
            const getQiniuToKen = () => {
                let requestData = {
                    "accesskey": props.config.accesskey,
                    "secretkey": props.config.secretkey,
                    "buckety": props.config.buckety
                }
                QiniuToKen(requestData).then(response => {
                    data.uploadKey.token = response.data.data.token
                })
            }

            /**
             * 监听
             */
            watch(() => props.imgUrl, (value) => {
                data.imageUrl = value
            })

            onMounted(() => {
                getQiniuToKen()
            })

            return {data, handleAvatarSuccess, beforeAvatarUpload}
        }
    }
</script>

<style scoped>

</style>