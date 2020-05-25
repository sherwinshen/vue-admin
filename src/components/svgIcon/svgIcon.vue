<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script>
    import {computed} from "@vue/composition-api"

    export default {
        name: "SvgIcon",
        props: {
            iconClass: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            const iconName = computed(() => `#icon-${props.iconClass}`)
            const svgClass = computed(() => {
                if (props.className) {
                    return `svg-icon ${props.className}`
                } else {
                    return `svg-icon`
                }
            })
            return {
                iconName, svgClass
            }
        }
    }
</script>

<style lang="scss" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        line-height: 1em;
        fill: currentColor;
    }
</style>