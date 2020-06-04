<template>
    <div class="my-table">
        <!--表格内容-->
        <el-table :data="tableData.data" class="info-table" @selection-change="handleSelectionChange" border>
            <el-table-column v-if='tableConfig.selectionFlag' type="selection" width="55">
            </el-table-column>
            <template v-for="item in tableConfig.tHead">
                <el-table-column v-if="item.type === 'slot'" :key="item.field" :label="item.label" :prop="item.filed" :width="item.width">
                    <template slot-scope="scope">
                        <slot :name="item.slotName" :data="scope.row"></slot>
                    </template>
                </el-table-column>
                <el-table-column v-else :key="item.field" :label="item.label" :prop="item.filed" :width="item.width"></el-table-column>
            </template>
        </el-table>
        <!--页码&删除按钮-->
        <el-row style="margin-bottom: 30px">
            <el-col :span="12">
                <slot name="deleteAllSlot"></slot>
            </el-col>
            <el-col :span="12">
                <el-pagination
                        background
                        class="pull-right newBtn"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="pageData.pageSizes"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.total"
                >
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {onBeforeMount, reactive} from '@vue/composition-api'
    import { loadData } from "./tableLoadData";

    export default {
        name: "myTable",
        props: {
            config: {
                type: Object,
                default: () => {
                }
            }
        },
        setup: function (props, {emit}) {
            // 加载数据 - 业务逻辑拆分
            const { tableData, initLoadData } = loadData();

            // ------------- 数据 -------------
            // 表格数据
            // const tableData = reactive({
            //     data: [],
            // })
            // 表格配置
            const tableConfig = reactive({
                tHead: [],
                selectionFlag: true,
                requestData: {},
            })
            // 页码相关数据
            const pageData = reactive({
                pageNumber: 0,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
            });
            // 表格选择
            const multipleSelection = reactive({
                data: []
            })

            // ------------- 方法 -------------
            // 初始化表格配置
            const initTableConfig = () => {
                let configData = props.config;
                let keys = Object.keys(tableConfig);
                for (let key in configData) {
                    if (keys.includes(key)) {
                        tableConfig[key] = configData[key];
                    }
                }
            }
            // 初始化数据
            // const initLoadData = ((params) => {
            //     let requestData = {
            //         url: params.url,
            //         method: params.method,
            //         data: params.data
            //     }
            //     loadTableData(requestData).then(response => {
            //         let responseData = response.data.data.data;
            //         tableData.data = responseData;
            //         pageData.total = responseData.length === 0 ? 0 : response.data.data.total
            //     })
            // })
            // 更新数据
            const refreshData = (() => {
                initLoadData(tableConfig.requestData)
            })
            // 带参数更新数据
            const paramsRefreshData = (params) => {
                tableConfig.requestData.data = Object.assign({}, params, {
                    pageNumber: 1,
                    pageSize: 10
                })
                refreshData()
            }
            // 页码相关处理
            const handleSizeChange = (val) => {
                pageData.pageSize = val
                tableConfig.requestData.pageSize = val
                initLoadData(tableConfig.requestData)
            }
            const handleCurrentChange = (val) => {
                pageData.currentPage = val
                tableConfig.requestData.pageNumber = val
                initLoadData(tableConfig.requestData)
            }
            const handleSelectionChange = ((val) => {
                multipleSelection.data = val.map(item => item.id)
                emit('update:selectedItems', multipleSelection.data)
            })

            onBeforeMount(() => {
                initTableConfig()
                initLoadData(tableConfig.requestData)
            })

            return {
                tableConfig, tableData, pageData,
                handleSizeChange, handleCurrentChange, handleSelectionChange, refreshData, paramsRefreshData
            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-table {
        width: 100%;
        margin: 20px 0 40px 0;
    }
</style>