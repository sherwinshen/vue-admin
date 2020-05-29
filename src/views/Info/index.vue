<template>
    <div id="info-index">
        <!--搜索表单-->
        <div class="search-form">
            <el-row :gutter="15">
                <el-form :model="searchForm" ref="ruleForm">
                    <el-col :span="4">
                        <el-form-item label="类型:" label-width="45px">
                            <el-select v-model="searchForm.category" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in category_options.data"
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
                                    value-format="yyyy-MM-dd"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="关键字:" label-width="70px">
                            <el-select v-model="searchForm.keyword" placeholder="请选择" clearable>
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
                    :data="table.data"
                    style="width: 100%"
                    v-loading="loadingData"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" width="80" label="ID"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="categoryId" label="类型" width="100" :formatter="toCategory"></el-table-column>
                <el-table-column prop="createDate" label="日期" width="180" :formatter="toDate"></el-table-column>
                <el-table-column prop="user" label="管理员" width="100"></el-table-column>
                <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
                        <el-button type="success" size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">详情</el-button>
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
        <DialogInfoAdd :flag.sync="dialog_add" :category="category_options.data"></DialogInfoAdd>
        <!--编辑表单-弹出窗口-->
        <DialogInfoEdit :flag.sync="dialog_edit" :category="category_options.data" :id="infoId" @getEditedList="updateItem"></DialogInfoEdit>
    </div>
</template>

<script>
    import {onMounted, reactive, ref} from '@vue/composition-api'
    import DialogInfoAdd from "../../components/dialog/infoAdd";
    import DialogInfoEdit from "../../components/dialog/infoEdit";
    import global from "../../utils/global";
    import {DeleteInfo, GetList} from "../../api/info";
    import {TimestampToDate} from '../../utils/formatData'

    export default {
        name: "info",
        components: {DialogInfoEdit, DialogInfoAdd},
        setup(props, {root}) {
            // ----------------------------------- 声明数据 -----------------------------------
            // 搜索表单
            const searchForm = reactive({
                category: '',
                data_value: '',
                keyword: '',
                search_keyWord: ''
            })
            // 类型目录
            let category_options = reactive({data: []})
            // 关键字目录
            const keywords_options = reactive([{value: 'id', label: 'ID',}, {value: 'title', label: '标题',}])
            // 表格内容
            const table = reactive({
                data: []
            })
            // 表格选择
            const multipleSelection = reactive({
                data: []
            })
            // 页码
            const page = reactive({
                pageNumber: 1,
                pageSize: 10
            })
            // 表格条数
            const total = ref(0)
            // 编辑的数据
            const infoId = ref('')
            // 其他
            const loadingData = ref(false)
            const dialog_add = ref(false)
            const dialog_edit = ref(false)

            // ----------------------------------- 声明函数 -----------------------------------
            const {confirm} = global();

            // 更新编辑的表单内容
            const updateItem = (() => {
                let requestData = {
                    id: infoId.value,
                    pageNumber: 1,
                    pageSize: 1
                }
                GetList(requestData).then(response => {
                    let data = response.data.data.data[0]
                    let item = table.data[table.data.findIndex(item => item.id === infoId.value)]
                    item.title = data.title
                    item.content = data.content
                    item.categoryId = data.categoryId
                })
            })
            // 表单搜索
            const search = (() => {
                getList();
            })
            // 删除确认
            const handleDelete = ((id) => {
                confirm({
                    content: "确认删除当前信息，确认后将无法恢复！！",
                    tip: "警告"
                })
                multipleSelection.data = [id]
                confirm({
                    content: "确认删除选择的数据，确认后将无法恢复！",
                    tip: "警告",
                    fn: deleteItems
                })
            })
            // 批量删除确认
            const deleteAll = (() => {
                if (!multipleSelection.data || multipleSelection.data.length === 0) {
                    root.$message({
                        message: "请选择要删除的数据！！",
                        type: "error"
                    })
                    return false;
                }
                confirm({
                    content: "确认删除选择的数据，确认后将无法恢复！",
                    tip: "警告",
                    fn: deleteItems
                })
            })
            // 表格内容删除处理
            const deleteItems = (() => {
                DeleteInfo({id: multipleSelection.data}).then(() => {
                    multipleSelection.data = [];
                    getList();
                })
            })
            // 表格选择处理
            const handleSelectionChange = ((val) => {
                multipleSelection.data = val.map(item => item.id)
            })
            // 格式化时间
            const toDate = ((row) => {
                return TimestampToDate(row.createDate)
            })
            // 格式化类型
            const toCategory = ((row) => {
                const categoryDate = category_options.data.filter(item => item.id === row.categoryId)[0]
                console.log(categoryDate)
                if(categoryDate){
                    return categoryDate.category_name
                }else {
                    return 'null'
                }
            })
            // 切换每页显示条数
            const handleSizeChange = ((val) => {
                page.pageSize = val
                getList()
            })
            // 切换页码
            const handleCurrentChange = ((val) => {
                page.pageNumber = val
                getList();
            })
            // 获取分类
            const getInfoCategory = (() => {
                root.$store.dispatch('info/getInfoCategory').then(response => {
                    category_options.data = response
                })
            })
            // 获取表格数据的搜索条件
            const searchData = (() => {
                let requestData = {
                    pageNumber: page.pageNumber,
                    pageSize: page.pageSize
                }
                if (searchForm.category) {
                    requestData.categoryId = searchForm.category
                }
                if (searchForm.data_value.length > 0) {
                    requestData.startTime = searchForm.data_value[0]
                    requestData.endTime = searchForm.data_value[1]
                }
                if (searchForm.keyword) {
                    requestData[searchForm.keyword] = searchForm.search_keyWord
                }
                return requestData
            })
            // 获取表格数据
            const getList = (() => {
                const requestData = searchData()
                loadingData.value = true
                GetList(requestData).then(response => {
                    let data = response.data.data
                    table.data = data.data
                    total.value = data.total
                    loadingData.value = false
                }).catch(() => {
                    loadingData.value = false
                })
            })
            // 表格数据编辑
            const handleEdit = ((id) => {
                infoId.value = id
                dialog_edit.value = true
            })

            /*
             * mouted
             * */
            onMounted(() => {
                getInfoCategory();
                getList();
            })


            // ----------------------------------- return -----------------------------------
            return {
                // ref
                loadingData, total, dialog_add, dialog_edit, infoId,
                // reactive
                searchForm, category_options, keywords_options, table, page, multipleSelection,
                // methods
                search, handleSelectionChange, handleDelete, handleEdit, deleteAll, handleSizeChange,
                handleCurrentChange, toDate, toCategory, getList, updateItem,
            }
        }
    }
</script>

<style lang="scss" scoped>
    #info-index {
        margin-bottom: 30px;
    }

    .info-table {
        margin: 10px 0 20px 0;
    }

    .newBtn {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        font-size: 14px;
    }

</style>