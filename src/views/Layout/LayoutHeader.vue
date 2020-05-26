<template>
    <div id="layout-header" class="clear">
        <div class="pull-left header-icon" @click="navMenuCollapse">
            <svg-icon class-name="zhankai" icon-class="zhankai"></svg-icon>
        </div>
        <div class="pull-right">
            <div class="pull-left user-info">
                <img src="../../assets/images/face.png" alt="">
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
        name: "layout_header",
        setup(props, {root}) {
            const userName = computed(() => root.$store.state.login.userName)
            const navMenuCollapse = (() => {
                root.$store.commit('app/SET_COLLAPSE')
            })
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
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            })
            return {userName, navMenuCollapse, emit}
        }
    }
</script>

<style lang="scss" scoped>
    #layout-header {
        .user-info {
            line-height: 65px;
            padding: 0 32px;
            border-right: 1px solid #ededed;

            + .header-icon {
                padding: 0 28px;
            }

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