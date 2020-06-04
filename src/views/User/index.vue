<template>
    <div id="user">
        <!--搜索部分-->
        <el-row>
            <el-col :span="20">
                <el-row :gutter="15">
                    <el-form ref="form" :model="form">
                        <el-col :span="6">
                            <el-form-item label="关键字:" label-width="60px">
                                <MySelect :selectData.sync="form.keyword" :config="select_options"/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item>
                                <el-input v-model="form.content" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" @click="search">搜索</el-button>
                        </el-col>
                    </el-form>
                </el-row>
            </el-col>
            <el-col :span="4">
                <el-button type="success" class="pull-right" @click="addNew">新增</el-button>
            </el-col>
        </el-row>
        <!--表格部分-->
        <MyTable :config="tableConfig" ref="myTable" :selectedItems.sync="selectedItems.data">
            <!--禁启用状态插槽-->
            <template v-slot:status="statusProps">
                <el-switch
                        v-model="statusProps.data.status"
                        @change="handleSwitch(statusProps.data)"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        active-value="2"
                        inactive-value="1"
                >
                </el-switch>
            </template>
            <!--操作插槽-->
            <template v-slot:handle="handleProps">
                <el-button type="danger" size="mini" @click="handleDelete(handleProps.data)">删除</el-button>
                <el-button type="success" size="mini" @click="handleEdit(handleProps.data)">编辑</el-button>
            </template>
            <!--批量删除-->
            <template v-slot:deleteAllSlot>
                <el-button class="newBtn" size="medium" @click="deleteAll()">批量删除</el-button>
            </template>
        </MyTable>
        <!--弹窗部分-->
        <DialogUserAdd :flag.sync="dialog_user_add" :editData="editData.data" @refreshTableData='refreshTableData'></DialogUserAdd>
    </div>
</template>

<script>
    import {reactive, ref} from '@vue/composition-api'
    import MySelect from '../../components/select/index'
    import MyTable from '../../components/table/index'
    import {UserActives, UserDel} from "../../api/user";
    import global from "../../utils/global";
    import DialogUserAdd from '../../components/dialog/userAdd'

    export default {
        name: "user",
        components: {MySelect, MyTable, DialogUserAdd},
        setup(props, {root, refs}) {
            /*
            * 数据
            * */
            // 表单内容
            const form = reactive({
                keyword: '',
                content: ''
            })
            //关键字选项
            const select_options = reactive({
                data: [{
                    value: 'phone', label: '手机号码',
                },{
                    value: 'name', label: '真实姓名',
                }]
            })
            // 单个表单元素 - 编辑时传值
            let editData = reactive({
                data: {}
            })
            // 表格配置
            const tableConfig = reactive({
                tHead: [
                    {
                        label: '邮箱',
                        filed: 'username',
                        width: 200
                    }, {
                        label: '姓名',
                        filed: 'truename',
                        width: 120
                    }, {
                        label: '手机',
                        filed: 'phone'
                    },
                    // {
                    //     label: '地区',
                    //     filed: 'region'
                    // },
                    {
                        label: '角色',
                        filed: 'role'
                    }, {
                        label: '禁启用状态',
                        filed: 'status',
                        type: 'slot',
                        slotName: 'status'
                    }, {
                        label: '操作',
                        filed: 'handle',
                        type: 'slot',
                        slotName: 'handle'
                    }],
                requestData: {
                    url: "/user/getList/",
                    method: 'post',
                    data: {
                        pageNumber: 1,
                        pageSize: 10
                    }
                }
            })
            // 选中处理的元素
            const selectedItems = reactive({
                data: []
            })
            // 其他
            const dialog_user_add = ref(false)
            const update_status_flag = ref(false) // 主要用于避免一直点击switch按钮频繁触发


            /*
            * 方法
            * */
            const {confirm} = global();
            // 禁启用状态切换
            const handleSwitch = ((params) => {
                if (update_status_flag.value) {
                    return false
                }
                update_status_flag.value = true
                UserActives({id: params.id, status: params.status}).then(response => {
                    root.$message({
                        message: response.data.message,
                        type: "success"
                    })
                    update_status_flag.value = false
                }).catch(() => {
                    update_status_flag.value = false
                })
            })
            // 删除确认
            const handleDelete = ((params) => {
                selectedItems.data = [params.id]
                confirm({
                    content: "确认删除选择的数据，确认后将无法恢复！",
                    tip: "警告",
                    fn: deleteItems
                })
            })
            // 批量删除确认
            const deleteAll = (() => {
                if (!selectedItems.data || selectedItems.data.length === 0) {
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
            // 删除处理
            const deleteItems = (() => {
                UserDel({id: selectedItems.data}).then(() => {
                    refs.myTable.refreshData()
                })
            })
            // 处理编辑
            const handleEdit = ((params) => {
                dialog_user_add.value = true
                editData.data = Object.assign({}, params)
            })
            // 新增item
            const addNew = (() => {
                editData.data = {}
                dialog_user_add.value = true
            })
            // 搜索
            const search = (() => {
                let requestData = {
                    [`${form.keyword}`]: form.content
                }
                refs.myTable.paramsRefreshData(requestData)
            })
            // 刷新页面
            const refreshTableData = (() => {
                refs.myTable.refreshData()
            })

            return {
                form,
                select_options,
                tableConfig,
                dialog_user_add,
                editData,
                selectedItems,
                handleSwitch,
                handleDelete,
                handleEdit,
                search,
                addNew,
                refreshTableData,
                deleteAll
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>