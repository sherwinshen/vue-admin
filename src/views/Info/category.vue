<template>
    <div id="category">
        <el-button type="primary" size="medium" @click="addFirst({type:'category_first_add'})">添加一级分类</el-button>
        <hr style="margin: 30px -30px"/>
        <el-row :gutter="30">
            <el-col :span="10" style="min-height: 20px">
                <div class="category-wrap">
                    <div class="category" v-for="firstItem in category.data" :key="firstItem.id">
                        <h4>
                            <div @click="firstItem.isCollapse = !firstItem.isCollapse">
                                <svg-icon
                                        v-bind:class-name="firstItem.isCollapse === false ? 'jianhaoshouqi' : 'jiahaozhankai'"
                                        v-bind:icon-class="firstItem.isCollapse === false ? 'jianhaoshouqi' : 'jiahaozhankai'"></svg-icon>
                                {{firstItem.category_name}}
                            </div>
                            <div class="button-group">
                                <el-button size="mini" round @click="editCategory({ data: firstItem, type: 'category_first_edit' })">编辑</el-button>
                                <el-button size="mini" type="success" round @click="addChild({ data: firstItem, type: 'category_child_add' })">添加子级</el-button>
                                <el-button size="mini" type="danger" round @click="deleteCategoryConfirm(firstItem.id)">删除</el-button>
                            </div>
                        </h4>
                        <ul v-if="firstItem.children" v-bind:class="{ 'display-none': firstItem.isCollapse }">
                            <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                                {{childrenItem.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" round>编辑</el-button>
                                    <el-button size="mini" type="danger" round>删除</el-button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="14">
                <h4 class="menu-title">一级分类编辑</h4>
                <el-form label-width="134px" class="from-wrap" ref="categoryFrom">
                    <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_first_flag">
                        <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类名称：" prop="secCategoryName" v-if="category_second_flag">
                        <el-input v-model="form.secCategoryName" :disabled="category_second_disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit" :disabled="category_button__disabled" :loading="category_button_loading">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {onMounted, reactive, ref} from '@vue/composition-api'
    import {AddChildrenCategory, AddFirstCategory, DeleteCategory, EditCategory, GetCategoryAll} from '../../api/info'
    import Global from '../../utils/global'

    export default {
        name: "category",
        setup(props, {root}) {
            /*
             * data
             */
            const category_first_flag = ref(true)
            const category_first_disabled = ref(true)
            const category_second_flag = ref(true)
            const category_second_disabled = ref(true)
            const category_button__disabled = ref(true)
            const category_button_loading = ref(false)
            const submit_type = ref('')
            const deleteId = ref('')
            const form = reactive({
                categoryName: '',
                secCategoryName: ''
            })
            const category = reactive({
                data: []
            })
            let curCategory = reactive({})

            /*
             * methods
             */
            const {confirm} = Global()
            // 初始化表单
            const initForm = (() => {
                form.categoryName = ''
                form.secCategoryName = ''
            })
            // 获取所有分类数据
            const GetInfoCategoryAll = (() => {
                GetCategoryAll().then(response => {
                    category.data = response.data.data.map(item => {
                        item.isCollapse = false
                        return item
                    })
                })
            })
            // 添加/编辑一级分类按钮启用
            const addFirst = ((params) => {
                category_first_flag.value = true
                category_second_flag.value = false
                category_second_disabled.value = false
                category_first_disabled.value = false
                category_button__disabled.value = false
                submit_type.value = params.type
            })
            // 添加/编辑子类按钮启用
            const addChild = ((params) => {
                category_first_flag.value = true
                category_first_disabled.value = true
                form.categoryName = params.data.category_name
                category_second_flag.value = true
                category_second_disabled.value = false
                category_button__disabled.value = false
                submit_type.value = params.type
                curCategory = params.data
            })
            // 添加提交
            const submit = (() => {
                if (submit_type.value === 'category_first_add') {
                    addFirstCategory()
                } else if (submit_type.value === 'category_first_edit') {
                    editFirstCategory()
                } else if (submit_type.value === 'category_child_add') {
                    addChildrenCategory()
                }
            })
            // 一级分类添加
            const addFirstCategory = (() => {
                // 表单验证
                if (!form.categoryName) {
                    root.$message({
                        message: "分类名称不能为空",
                        type: "error"
                    })
                    return false;
                }
                // 按钮loading
                category_button_loading.value = true
                // 提交后台
                AddFirstCategory({categoryName: form.categoryName}).then(response => {
                    let data = response.data
                    if (data.resCode === 0) {
                        root.$message({
                            message: data.message,
                            type: "success"
                        });
                        // 更新显示数据 - 第一种是重新调用接口获取（浪费资源）；第二种是在显示data中push数据进行更新
                        let result = data.data
                        category.data.push(result)
                    }
                    category_button_loading.value = false
                    initForm()
                }).catch(() => {
                    category_button_loading.value = false
                    initForm()
                })
            })
            // 一级分类编辑
            const editFirstCategory = (() => {
                if (!form.categoryName) {
                    root.$message({
                        message: "分类名称不能为空",
                        type: "error"
                    })
                    return false;
                }
                let requestData = {
                    id: curCategory.id,
                    categoryName: form.categoryName
                }
                EditCategory(requestData).then(response => {
                    let data = response.data
                    root.$message({
                        message: data.message,
                        type: "success"
                    })
                    curCategory.category_name = data.data.data.categoryName
                    initForm()
                })
            })
            // 删除一级分类确认
            const deleteCategoryConfirm = ((categoryID) => {
                deleteId.value = categoryID
                confirm({
                    content: "确认删除当前信息，确认后将无法恢复！！",
                    tip: "警告",
                    fn: deleteCategory,
                    catchFn: () => {
                        deleteId.value = ''
                    }
                })
            })
            // 删除一级分类
            const deleteCategory = (() => {
                DeleteCategory({categoryId: deleteId.value}).then(() => {
                    // 对category.data数组进行操作，而不要重新获取一遍数据来做到刷新
                    category.data = category.data.filter(item => item.id !== deleteId.value)
                }).catch(error => {
                    console.log(error)
                })
            })
            // 编辑一级分类
            const editCategory = ((params) => {
                addFirst(params)
                form.categoryName = params.data.category_name
                curCategory = params.data
            })
            // 添加子类
            const addChildrenCategory = (() => {
                // 表单验证
                if (!form.secCategoryName) {
                    root.$message({
                        message: "二级分类名称不能为空",
                        type: "error"
                    })
                    return false;
                }
                category_button_loading.value = true
                AddChildrenCategory({
                    categoryName: form.secCategoryName,
                    parentId: curCategory.id
                }).then(response => {
                    let responseData = response.data;
                    root.$message({
                        message: responseData.message,
                        type: "success"
                    })
                    GetInfoCategoryAll()
                    form.secCategoryName = ''
                    category_button_loading.value = false
                }).catch(() => {
                    category_button_loading.value = true
                })

            })


            /*
             * mouted
             */
            onMounted(() => {
                // 挂载后获取分类数据
                GetInfoCategoryAll()
            })

            return {
                category_first_flag,
                category_first_disabled,
                category_second_flag,
                category_second_disabled,
                category_button__disabled,
                category_button_loading,
                form,
                category,
                submit,
                addFirst,
                deleteCategoryConfirm,
                editCategory,
                addChild,
                addChildrenCategory,
            }
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

    .from-wrap {
        width: 430px;
        padding-top: 26px;

        .el-button {
            width: 100px;
        }
    }

</style>