<template>
    <div id="editDetail">
        <el-tabs type="border-card"  v-model="editableTabsValue">
            <el-tab-pane label="基础信息" style="positon:relative">
                <basic-info v-if="editableTabsValue === '0'" :estateInfo="estateInfo"></basic-info>
            </el-tab-pane>
            <el-tab-pane label="顾问管理">
                <consultant-management v-if="editableTabsValue === '1'" :estateInfo="estateInfo"></consultant-management>
            </el-tab-pane>
            <el-tab-pane label="楼栋信息">
                <build-info v-if="editableTabsValue === '2'" :estateInfo="estateInfo"></build-info>
            </el-tab-pane>
            <el-tab-pane label="楼盘相册">
                <build-pic v-if="editableTabsValue === '3'" :estateInfo="estateInfo"></build-pic>
            </el-tab-pane>
            <el-tab-pane label="户型展示">
                <house-type-show v-if="editableTabsValue === '4'" :estateInfo="estateInfo"></house-type-show>
            </el-tab-pane>
            <el-tab-pane label="楼盘动态">
                <estate-news v-if="editableTabsValue === '5'" :estateInfo="estateInfo"></estate-news>
            </el-tab-pane>
            <el-tab-pane label="开盘信息">
                <open-info v-if="editableTabsValue === '6'" :estateInfo="estateInfo"></open-info>
            </el-tab-pane>
            
        </el-tabs>
        <el-button type="primary" class="back" @click="back">返回</el-button>
    </div>
</template>

<script>
import BasicInfo from './components/BasicInfo'
import ConsultantManagement from './components/ConsultantManagement'
import buildInfo from './components/buildInfo'
import buildPic from './components/buildPic'
import houseTypeShow from './components/houseTypeShow'
import estateNews from './components/estateNews'
import openInfo from './components/openInfo'
    export default {
        components: {
            BasicInfo,
            ConsultantManagement,
            buildInfo,
            buildPic,
            houseTypeShow,
            estateNews,
            openInfo
        },
        props: ['estateInfo', 'activeIndex'],
        watch: {
            activeIndex() {
                this.editableTabsValue = this.activeIndex
            }
        },
        data() {
            return{
                editableTabsValue: '1'
            }
        },
        methods: {
            back() {
                this.$emit('close')
            }
        },
        created() {
            this.editableTabsValue = this.activeIndex
        }
    }
</script>

<style scoped>
.back{
    position: absolute;
    top: 20px;
    right: 20px;
}
</style>