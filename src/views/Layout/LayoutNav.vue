<template>
    <div id="layout-nav">
        <el-menu default-active="/homeIndex" router>
            <template v-for="item in routers">
                <el-submenu v-if='!item.hidden' :key="item.path" :index="item.path">
                    <template slot="title">
                        <svg-icon :class-name="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
                        <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import {reactive} from '@vue/composition-api'

    export default {
        name: "layout_nav",
        setup(props, {root}) {
            const routers = reactive(root.$router.options.routes)
            return {routers}
        }
    }
</script>

<style lang="scss" scoped>
    .svg-icon {
        padding-right: 10px;
        padding-bottom: 5px;
        font-size: 20px;
        font-weight: bold;
    }
</style>