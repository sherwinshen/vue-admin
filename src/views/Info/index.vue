<template>
    <div id="info-index">
        <!--搜索表单-->
        <div class="search-form">
            <el-row :gutter="15">
                <el-form :model="searchForm" ref="ruleForm">
                    <el-col :span="4">
                        <el-form-item label="类型:" label-width="45px">
                            <el-select v-model="searchForm.category" placeholder="请选择">
                                <el-option
                                        v-for="item in category_options"
                                        :key="item.id"
                                        :value="item.id"
                                        :label="item.category_name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="日期:" label-width="55px">
                            <el-date-picker
                                    v-model="searchForm.data_value"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="关键字:" label-width="70px">
                            <el-select v-model="searchForm.keyword" placeholder="请选择">
                                <el-option
                                        v-for="item in keywords_options"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-input v-model="searchForm.search_keyWord" placeholder="请输入内容"></el-input>
                    </el-col>
                </el-form>
                <el-col :span="2">
                    <el-button class="newBtn" type="primary" @click="search">搜索</el-button>
                </el-col>
                <el-col :span="1" style="height:1px">&nbsp;</el-col>
                <el-col :span="2">
                    <el-button class="pull-right newBtn" type="success" @click="dialog_add = true">新增</el-button>
                </el-col>
            </el-row>
        </div>
        <!--表格-->
        <div class="info-table">
            <el-table
                    border
                    :data="table_data"
                    style="width: 100%"
                    v-loading="loadingData"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="categoryId" label="类型" width="100"></el-table-column>
                <el-table-column prop="createDate" label="日期" width="180"></el-table-column>
                <el-table-column prop="user" label="管理员" width="100"></el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>


            </el-table>
        </div>
        <!--底部分页-->
        <el-row>
            <el-col :span="12">
                <el-button class="newBtn" size="medium" @click="deleteAll" type="danger">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                        background
                        class="pull-right newBtn"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                >
                </el-pagination>
            </el-col>
        </el-row>
        <!--新增表单-弹出窗口-->
        <DialogInfoAdd :flag.sync="dialog_add"></DialogInfoAdd>
        <!--编辑表单-弹出窗口-->
        <DialogInfoEdit :flag.sync="dialog_edit"></DialogInfoEdit>
    </div>
</template>

<script>
    import {reactive, ref} from '@vue/composition-api'
    import DialogInfoAdd from "../../components/dialog/infoAdd";
    import DialogInfoEdit from "../../components/dialog/infoEdit";
    import global from "../../utils/global";

    export default {
        name: "info",
        components: {DialogInfoEdit, DialogInfoAdd},
        setup() {
            // ----------------------------------- 声明数据 -----------------------------------
            const searchForm = reactive({
                category: '',
                data_value: '',
                search_keyWord: ''
            })
            const category_options = reactive([
                {
                    id: 1, category_name: 'hello'
                }
            ])
            const keywords_options = reactive([
                {
                    value: 'name', label: '姓名'
                }
            ])
            const table_data = reactive([
                {
                    title: '111111',
                    categoryId: '2222',
                    createDate: '33333',
                    user: '4444'
                }
            ])
            const loadingData = ref(false)
            const total = ref(0)
            const dialog_add = ref(false)
            const dialog_edit = ref(false)

            // ----------------------------------- 声明函数 -----------------------------------
            const {confirm} = global();
            const search = (() => {
            })
            const handleSelectionChange = (() => {
            })
            const handleDelete = (() => {
                confirm({
                    content: "确认删除当前信息，确认后将无法恢复！！",
                    tip: "警告"
                })
            })
            const handleEdit = (() => {
                dialog_edit.value = true
            })
            const deleteAll = (() => {
                confirm({
                    content: "确认删除选择的数据，确认后将无法恢复！",
                    tip: "警告"
                })
            })
            const handleSizeChange = (() => {
            })
            const handleCurrentChange = (() => {
            })

            // ----------------------------------- return -----------------------------------
            return {
                // ref
                loadingData, total, dialog_add, dialog_edit,
                // reactive
                searchForm, category_options, keywords_options, table_data,
                // methods
                search, handleSelectionChange, handleDelete, handleEdit, deleteAll, handleSizeChange, handleCurrentChange
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-table {
        margin: 30px 0;
    }

    .newBtn {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        font-size: 14px;
    }

</style>