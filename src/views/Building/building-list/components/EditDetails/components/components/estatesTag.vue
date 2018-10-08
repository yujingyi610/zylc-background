<template>
    <div class="estatesTag">
        <el-form>
            <el-form-item label="选择或输入标签">
                <el-select v-model="value" multiple filterable default-first-option placeholder="请选择或输入标签" value-key="id">
                    <el-option v-for="(item, index) in option" :key="index" :label="item.labelName" :value="item"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { findEstateLabelList } from '@/api/building-list.js'
    export default {
        props: ['labelListData'],
        watch: {
            labelListData: {
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
                value: [],
                option: []
            }
        },
        methods: {
            handleInit(info) {// 初始化数据
                console.log(info)
                if( info ){
                    this.value = info.map(item=>{
                        return{
                            id: item.labelId,
                            labelName: item.labelName,
                            labelId: item.labelId,
                        }
                    })
                }else{
                    // this.changeFlag = true;
                }
                
            },
            handlefindEstateLabelList() {// 获取标签下拉数据
                findEstateLabelList().then(res=>{
                    if( res.code === 0 ){
                        this.option = res.data
                    }
                })
            }
        },
        created() {
            this.handlefindEstateLabelList()
            this.handleInit(this.labelListData)
        }
    }
</script>

<style scoped>

</style>