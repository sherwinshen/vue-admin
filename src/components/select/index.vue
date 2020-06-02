<template>
    <el-select v-model="selectValue.value" placeholder="请选择" @change="select" clearable>
        <el-option v-for="item in select_options.data" :label="item.label" :value="item.value" :key="item.babel"></el-option>
    </el-select>
</template>

<script>
    import {onMounted, reactive} from '@vue/composition-api'

    export default {
        name: "mySelect",
        props: {
            config: {
                type: Object,
                default: () => {
                }
            },
            selectData: {
                type: String,
                default: ''
            }
        },
        setup(props, {emit}) {
            // 选项
            const select_options = reactive({
                data: []
            })
            let selectValue = reactive({})

            // 初始化选项
            const initOption = () => {
                select_options.data = props.config.data
                selectValue = props.selectData
            }
            // 选择触发函数
            const select = (val) => {
                let selectData = select_options.data.filter(item => item.value === val)
                if (selectData.length > 0) {
                    emit('update:selectData', selectData[0].value)
                } else {
                    emit('update:selectData', '')
                }
            }

            onMounted(() => {
                initOption()
            })

            return {select_options, selectValue, select}

        }
    }
</script>

<style scoped>

</style>