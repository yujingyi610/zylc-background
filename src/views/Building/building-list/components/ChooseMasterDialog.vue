<template>
    <div>
        <el-dialog title="选择项目运营负责人" :visible.sync="ChooseMasterFlag" width="600px">
            <div style="max-height: 400px; overflow: auto">
                <el-tree class="filter-tree left"
                    accordion
                    :data="data"
                    :props="defaultProps"
                    node-key="id"
                    :load="loadNode"
                    lazy
                    @node-click="handleClick"
                    ref="tree"
                    :default-expanded-keys="currentNode">
                </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="ChooseMasterFlag = false">取消</el-button>
              <el-button type="primary" @click="handleConfirm">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {cityList, projectList, personList} from '@/api/building-list.js'
    export default {
        data() {
            return{
                ChooseMasterFlag: false,// 控制弹框是否展示
                data: [],// 树状控件数据
                defaultProps: {// 树状控件默认规则
                    children: 'children',
                    label: 'orgUnitName',
                    isLeaf: 'leaf'
                },
                currentNode:[],//当前选中树的节点Id
                chooseOneInfo: {}// 选中的人的信息
            }
        },
        methods: {
            show() {// 打开弹框
                this.ChooseMasterFlag = true;
                this.handlecityList()
            },
            handlecityList() {// 选择城市公司下拉数据
                let data = {
                    orgUnitType:'15,30',
                    jobId: new Date().getTime()
                }
                cityList(data).then(res=>{
                    if( res.code === 0 ){
                        this.data = res.data
                    }
                })
            },
            // 处理树状控件点击后展示右侧各模块
            handleClick(val, node) {
                // console.log(val, node)
                this.chooseOneInfo = val;
            },
            loadNode(node, resolve) {// 懒加载方法
                console.log(node)
                if (node.level === 0) {
                    return resolve([{ name: '' }]);
                }
                else if (node.level === 1) {
                    let data = {
                        // orgUnitType:' 15,30',
                        verticalUnitCode: node.data.orgUnitCode,
                        jobId: new Date().getTime()
                    }
                    cityList(data).then(res=>{
                        if( res.code === 0 ){
                            resolve(res.data);
                        }
                    })
                }
                else if (node.level === 2 && node.data.orgUnitType !== '90') {
                    let data = {
                        // orgUnitType:' 15,30',
                        verticalUnitCode: node.data.orgUnitCode,
                        jobId: new Date().getTime()
                    }
                    cityList(data).then(res=>{
                        if( res.code === 0 ){
                            resolve(res.data);
                        }
                    })
                }
                else if (node.level === 2 && node.data.orgUnitType === '90') {

                    let data = {
                        // orgUnitType:' 15,30',
                        verticalUnitCode: node.data.orgUnitCode,
                        jobId: new Date().getTime()
                    }
                    personList(data).then(res=>{
                        if( res.code === 0 ){
                            res.data.map(item=>{
                                item.orgUnitName = item.userName;
                                item.leaf = true
                            })
                            resolve(res.data);
                        }
                    })
                }
                else if( node.level === 3 ){
                    let data = {
                        // orgUnitType:' 15,30',
                        orgUnitCode: node.data.orgUnitCode,
                        jobId: new Date().getTime()
                    }
                    personList(data).then(res=>{
                        if( res.code === 0 ){
                            res.data.map(item=>{
                                item.orgUnitName = item.userName;
                                item.leaf = true
                            })
                            resolve(res.data);
                        }
                    })
                }


            },
            handleConfirm() {// 确定
                this.$emit('chooseOne', this.chooseOneInfo)
                this.ChooseMasterFlag = false;
            }
        }
    }
</script>

<style scoped>

</style>
