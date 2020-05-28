<template>
    <div id="layout-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "layoutMain"
    }
</script>

<style lang="scss" scoped>
    #layout-main {
        position: relative;
        padding: 30px;
        height: 100%;
    }
</style>