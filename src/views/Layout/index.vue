<template>
    <div id="layout">
        <el-container>
            <el-aside :class="[menuStatus ? 'closed' : '']">
                <layout-nav></layout-nav>
            </el-aside>
            <el-container>
                <el-header>
                    <layout-header></layout-header>
                </el-header>
                <el-main style="height: calc(100vh - 80px)">
                    <layout-main></layout-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import LayoutNav from './components/layoutNav'
    import LayoutMain from './components/layoutMain'
    import LayoutHeader from "./components/layoutHeader";
    import {computed} from "@vue/composition-api";

    export default {
        name: "layout",
        components: {LayoutHeader, LayoutNav, LayoutMain},
        setup(props, {root}) {
            const menuStatus = computed(() => root.$store.state.app.isCollapse)
            return {menuStatus}
        }
    }
</script>

<style lang="scss">
    .el-aside {
        height: 100vh;
        width: 200px !important;
        background: $color-main;
        @include webkit(transition, all .5s ease 0s);

        &.closed {
            width: 65px !important;

            .logo img {
                width: 50px !important;
            }
        }
    }

    .el-header, .el-main {
        padding: 0 !important;
    }

    .el-header {
        height: 65px;
        background-color: white;
        box-shadow: 0 3px 16px 0 rgba(0, 0, 0, .1);
    }

    .el-main {
        margin: 20px 20px 0 20px;
        background-color: white;
    }

    .el-container {
        background-color: #f7f7f7;
    }

</style>