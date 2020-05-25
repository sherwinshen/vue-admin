<template>
    <div id="layout">
        <el-container>
            <el-aside>
                <layout-nav></layout-nav>
            </el-aside>
            <el-container>
                <el-header>
                    <layout-header></layout-header>
                </el-header>
                <el-main>
                    <layout-main></layout-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import LayoutNav from './LayoutNav'
    import LayoutMain from './LayoutMain'
    import LayoutHeader from "./LayoutHeader";

    export default {
        name: "layout",
        components: {LayoutHeader, LayoutNav, LayoutMain}
    }
</script>

<style lang="scss" scoped>
    .el-header, .el-main {
        padding: 0 !important;
    }

    .el-aside {
        height: 100vh;
        width: 200px;
        background: $color-main;
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