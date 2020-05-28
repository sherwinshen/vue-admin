<template>
    <div id="console">
        欢迎使用后台管理系统
    </div>
</template>

<script>
    export default {
        name: "console"
    }
</script>

<style lang="scss" scoped>
    #console {
        color: $color-main;
        font-size: 35px;
        position: absolute;
        top: 40%;
        left: 50%;
        @include webkit(transform, translateX(-50%));
    }
</style>