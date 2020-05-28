<template>
    <div id="category">
        <el-button type="primary" size="medium">添加一级分类</el-button>
        <hr style="margin: 30px -30px"/>
        <el-row :gutter="30">
            <el-col :span="10">
                <div class="category-wrap">
                    <div class="category">
                        <h4>
                            <svg-icon class-name="jianhaoshouqi" icon-class="jianhaoshouqi"></svg-icon>
                            新闻
                            <div class="button-group">
                                <el-button size="mini" round>编辑</el-button>
                                <el-button size="mini" type="success" round>添加子级</el-button>
                                <el-button size="mini" type="danger" round>删除</el-button>
                            </div>
                        </h4>
                        <ul>
                            <li>
                                国内
                                <div class="button-group">
                                    <el-button size="mini" round>编辑</el-button>
                                    <el-button size="mini" type="danger" round>删除</el-button>
                                </div>
                            </li>
                            <li>国内</li>
                            <li>国内</li>
                        </ul>
                    </div>
                    <div class="category">
                        <h4>
                            <svg-icon class-name="jianhaoshouqi" icon-class="jianhaoshouqi"></svg-icon>
                            新闻
                        </h4>
                        <ul>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                        </ul>
                    </div>
                    <div class="category">
                        <h4>
                            <svg-icon class-name="jiahaozhankai" icon-class="jiahaozhankai"></svg-icon>
                            新闻
                        </h4>
                    </div>
                </div>
            </el-col>
            <el-col :span="14">
                <h4 class="menu-title">一级分类编辑</h4>
                <el-form label-width="134px" class="from-wrap" ref="categoryFrom">
                    <el-form-item label="一级分类名称：" prop="categoryName">
                        <el-input v-model="form.categoryName"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类名称：" prop="secCategoryName">
                        <el-input v-model="form.secCategoryName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" @click="submit">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import {reactive} from '@vue/composition-api'

    export default {
        name: "category",
        setup() {
            const form = reactive({
                categoryName: '',
                secCategoryName: ''
            })
            const submit = (() => {
            })
            return {form, submit}
        }
    }
</script>

<style lang="scss" scoped>
    .category-wrap {
        div {
            &:before {
                top: 1px;
            }
        }

        div:first-child {
            &:before {
                top: 22px;
            }
        }

        div:last-child {
            &:before {
                bottom: 22px;
            }
        }
    }

    .category {
        line-height: 45px;
        position: relative;
        cursor: pointer;

        &:before {
            content: '';
            position: absolute;
            left: 22px;
            top: 0;
            bottom: 0;
            width: 31px;
            border-left: 1px dotted #000;
        }

        h4 {
            padding-left: 40px;
            position: relative;
        }

        svg {
            position: absolute;
            left: 15px;
            top: 15px;
            background-color: white;
            font-size: 14px;
        }

        li {
            position: relative;
            padding-left: 40px;
            margin-left: 24px;

            &:before {
                content: '';
                position: absolute;
                top: 22px;
                left: 0;
                width: 31px;
                border-bottom: 1px dotted #000;
            }
        }

        li, h4 {
            &:hover {
                .button-group {
                    display: block;
                }

                background-color: #f3f3f3;
            }
        }

        .button-group {
            display: none;
            position: absolute;
            right: 11px;
            top: -1px;

            .el-button {
                font-size: 12px;
            }
        }
    }

    .menu-title {
        line-height: 44px;
        padding-left: 22px;
        background-color: #f3f3f3;
    }
    .from-wrap{
        width: 430px;
        padding-top: 26px;
        .el-button{
            width: 100px;
        }
    }

</style>