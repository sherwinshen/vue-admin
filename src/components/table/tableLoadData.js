import { reactive } from '@vue/composition-api';
import {loadTableData} from "../../api/common";

export function loadData(){
    const tableData = reactive({
        data: [],
        total: 0
    })

    const initLoadData = ((params) => {
        let requestData = {
            url: params.url,
            method: params.method,
            data: params.data
        }
        loadTableData(requestData).then(response => {
            let responseData = response.data.data.data;
            tableData.data = responseData;
            tableData.total = responseData.length === 0 ? 0 : response.data.data.total
        })
    })

    return {
        tableData, initLoadData
    }
}