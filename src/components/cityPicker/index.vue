<template>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-select v-model="value.provinceValue" placeholder="请选择" @change="handlerProvince">
                <el-option v-for="item in options.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"></el-option>
            </el-select>
        </el-col>
        <el-col :span="6">
            <el-select v-model="value.cityValue" placeholder="请选择" @change="handlerCity">
                <el-option v-for="item in options.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
            </el-select>
        </el-col>
        <el-col :span="6">
            <el-select v-model="value.areaValue" placeholder="请选择" @change="handlerArea">
                <el-option v-for="item in options.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
            </el-select>
        </el-col>
        <el-col :span="6">
            <el-select v-model="value.streetValue" placeholder="请选择" @change="handlerStreet">
                <el-option v-for="item in options.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"></el-option>
            </el-select>
        </el-col>
    </el-row>
</template>

<script>
    import {reactive, onBeforeMount, watch} from '@vue/composition-api'
    import {GetCityPicker} from "../../api/common";

    export default {
        name: "cityPicker",
        props: {
            cityPickerData: {
                type: Object,
                default: () => {
                }
            }
        },
        setup(props, {emit}) {
            const value = reactive({
                provinceValue: "",
                cityValue: "",
                areaValue: "",
                streetValue: "",
            })
            const options = reactive({
                provinceData: [],
                cityData: [],
                areaData: [],
                streetData: []
            })

            // 获取数据
            const getData = (requestData) => {
                GetCityPicker(requestData).then(response => {
                    options[`${requestData.type}Data`] = response.data.data.data
                })
            }
            //
            // 获取省份
            const getProvince = () => {
                getData({type: "province"});
            }
            // 选择省份，获取城市
            const handlerProvince = ((val) => {
                resetValue({type: "city"})
                getData({type: "city", province_code: val});
            })
            // 选择城市，获取区域
            const handlerCity = ((val) => {
                resetValue({type: "area"});
                getData({type: "area", city_code: val});
            })
            // 选择区域，获取街道
            const handlerArea = ((val) => {
                resetValue({type: "street"});
                getData({type: "street", area_code: val});
            })
            // 选择街道
            const handlerStreet = (() => {
            })
            // 重置选项
            const resetValue = (params) => {
                const valueJson = {
                    city: ['cityValue', 'areaValue', 'streetValue'],
                    area: ['areaValue', 'streetValue'],
                    street: ['streetValue']
                }
                const arrObj = valueJson[params.type];
                if (arrObj) {
                    arrObj.forEach(item => value[item] = '')
                }
                const optionJson = {
                    city: ['cityData', 'areaData', 'streetData'],
                    area: ['areaData', 'streetData'],
                    street: ['streetData']
                }
                const arrObj2 = optionJson[params.type];
                if (arrObj2) {
                    arrObj2.forEach(item => options[item] = [])
                }
            }

            watch(() => value, (val) => {
                emit("update:cityPickerData", val)
            })

            // watch([
            //     () => value.provinceValue,
            //     () => value.cityValue,
            //     () => value.areaValue,
            //     () => value.streetValue,
            // ], ([province, city, area, street]) => {
            //
            //     emit("update:cityPickerData", value)
            // })

            onBeforeMount(() => {
                // 获取省份options
                getProvince()
            })


            return {value, options, handlerProvince, handlerCity, handlerArea, handlerStreet}

        }
    }
</script>

<style scoped>

</style>