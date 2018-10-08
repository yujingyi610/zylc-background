<template>
    <div class="estatesAttr">
        <el-form :model="form" label-width="250px">
            <el-form-item label="是否居旅地产">
                <el-radio-group v-model="form.isTourism">
                    <el-radio v-for="(item, index) in option" :key="index" :label="item.label">{{item.title}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否绿城小镇">
                <el-radio-group v-model="form.isGreentown">
                    <el-radio v-for="(item, index) in option" :key="index" :label="item.label">{{item.title}}</el-radio>
                    <!-- <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio> -->
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
    export default {
        props: ['dataEstateData'],
        watch: {
            dataEstateData: {
                handler(val, oldval){
                    console.log(val)
                    if( val != oldval ){
                        this.handleInit(val, this.spotListData)
                    }
                },
                deep: true
            }
        },
        data() {
            return{
                form: {
                    isTourism: '1',
                    isGreentown: '1',
                },
                option: [
                    {
                        title: '是',
                        label: '1'
                    },
                    {
                        title: '否',
                        label: '0'
                    }
                ]
            }
        },
        methods: {
            handleInit(info) {// 初始化数据
                console.log(info)
                if( info ){
                    this.form.isTourism = info.isTourism;
                    this.form.isGreentown = info.isGreentown;
                }else{
                    // this.changeFlag = true;
                }
                
            },
        },
        created() {
            if( this.dataEstateData ){
                this.handleInit(this.dataEstateData)
            }
        }
    }
</script>

<style scoped>

</style>