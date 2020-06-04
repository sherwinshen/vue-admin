<template>
    <div id="layout-main">
        <!--子路由显示区域-->
        <keep-alive>
            <!--需要缓存的-->
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!--不需要缓存的-->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: "layoutMain"
    }
</script>

<style lang="scss" scoped>
    #layout-main {
        @include webkit( box-sizing, border-box);
        position: relative;
        padding: 30px;
        height: 100%;
    }
</style>