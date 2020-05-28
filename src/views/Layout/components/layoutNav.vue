<template>
    <div id="layout-nav">
        <div class="logo">
            <img src="../../../assets/images/logo.png" alt="">
        </div>
        <el-menu background-color="transparent" :collapse="isCollapse" router>
            <template v-for="item in routers">
                <el-submenu v-if='!item.hidden' :key="item.path" :index="item.path">
                    <template slot="title">
                        <svg-icon :class-name="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <template v-for="subItem in item.children">
                        <el-menu-item v-if="!subItem.hidden" :key="subItem.path" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {reactive, computed} from '@vue/composition-api'

    export default {
        name: "layout_nav",
        setup(props, {root}) {
            const routers = reactive(root.$router.options.routes)
            const isCollapse = computed(() => root.$store.state.app.isCollapse)
            return {routers, isCollapse}
        }
    }
</script>

<style lang="scss" scoped>
    #layout-nav {
        .logo {
            text-align: center;

            img {
                margin: 28px auto 25px;
                width: 92px;
                @include webkit(transition, all .5s ease 0s);
            }
        }

        .svg-icon {
            padding-right: 10px;
            padding-bottom: 5px;
            font-size: 20px;
            font-weight: bold;
        }
    }
</style>