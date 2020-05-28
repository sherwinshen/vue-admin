<template>
    <div id="layout-header">
        <div class="pull-left header-icon" @click="navMenuCollapse">
            <svg-icon class-name="zhankai" icon-class="zhankai"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="pull-left user-info">
                <img src="../../../assets/images/face.png" alt="">
                {{userName}}
            </div>
            <div class="pull-left header-icon" @click="emit">
                <svg-icon class-name="guanbi" icon-class="guanbi"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import {computed} from '@vue/composition-api'

    export default {
        name: "layoutHeader",
        setup(props, {root}) {
            // ----------------------------------- 声明数据 -----------------------------------
            const userName = computed(() => root.$store.state.login.userName)

            // ----------------------------------- 声明函数 -----------------------------------
            // 菜单栏展开/折叠
            const navMenuCollapse = (() => {
                root.$store.commit('app/SET_COLLAPSE')
            })
            // 退出登录
            const emit = (() => {
                root.$confirm('退出登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    root.$store.dispatch('login/exit').then(() => {
                        console.log('hello')
                        root.$router.push({name: 'Login'})
                    })
                }).catch(() => {
                    root.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            })
            // ----------------------------------- return -----------------------------------
            return {
                userName, navMenuCollapse, emit
            }
        }
    }
</script>

<style lang="scss" scoped>
    #layout-header {
        .user-info {
            line-height: 65px;
            padding: 0 32px;
            border-right: 1px solid #ededed;

            img {
                display: inline-block;
                width: 39px;
                height: 39px;
                margin-bottom: -12px;
                margin-right: 15px;
                border-radius: 100px;
                object-fit: cover;
            }

        }
        .header-icon {
            line-height: 65px;
            font-size: 20px;
            cursor: pointer;
            padding: 0 32px;
        }

    }
</style>