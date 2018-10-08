<template>
    <div>
        <multiple-pic v-for="(item, index) in titleList" :key="index" :title="item.title" :list="item.list" :ref="'item' + index" @setting="handleSetting"></multiple-pic>
        <div style="margin: 20px 0">
            <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
    </div>
</template>

<script>
import { buildingAlbumList, appendPatch } from '@/api/building-list.js'
import multiplePic from './components/multiplePic'
    export default {
        props: ['estateInfo'],
        components: {
            multiplePic
        },
        data() {
            return {
                titleList: [
                    { title:'效果图', list: [] },
                    { title:'样板间', list: [] },
                    { title:'小区配套', list: [] },
                    { title:'实景图', list: [] },
                    { title:'项目现场', list: [] },
                    { title:'区位图', list: [] }
                ]
            }
        },
        methods: {
            handlebuildingAlbumList() {// 获取楼盘相册
                buildingAlbumList({ estateId: this.estateInfo.id }).then(res=>{
                    if( res.code === 0 ){
                        this.titleList[0].list = res.data.data1;
                        this.titleList[1].list = res.data.data2;
                        this.titleList[2].list = res.data.data3;
                        this.titleList[3].list = res.data.data4;
                        this.titleList[4].list = res.data.data5;
                        this.titleList[5].list = res.data.data6;
                    }else{
                        this.titleList.map(item=>{
                            item.list = []
                        })
                    }
                })
            },
            handleSetting({ title, index }) {// 设为封面
                this.titleList.map((item, i)=>{
                    let list = this.$refs['item'+i][0].fileList;
                    
                    this.$refs['item'+i][0].fileList.map((item2, index2)=>{
                        if( item.title === title && index2 == index ){
                            // item2.showFlag === '0'
                            this.$set(item2, 'showFlag', '0')
                        }else{
                            // item2.showFlag === '1'
                            this.$set(item2, 'showFlag', '1')
                        }
                    })
                })
                
            },
            handleBack() {// 取消   
                this.$emit('close')
            },
            handleSave() {// 保存
                let listSAll = []
                this.titleList.map((item, i)=>{
                    let list = this.$refs['item'+i][0].fileList;
                    
                    this.$refs['item'+i][0].fileList.map((item2, index2)=>{
                        listSAll.push({
                            uriwechat: item2.url,
                            showFlag: item2.showFlag,
                            albumTypeId: Number(i) + 1
                        })

                    })
                })
                console.log(listSAll)
                let arr = JSON.stringify(listSAll)
                console.log(arr)
                let data = {
                    estateId: this.estateInfo.id,
                    arr
                }
                appendPatch(data).then(res=>{
                    if( res.code === 0 ){
                        this.$message.success('保存成功！')
                        this.handlebuildingAlbumList()

                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        created() {
            this.handlebuildingAlbumList()
        }
    }
</script>

<style scoped>

</style>