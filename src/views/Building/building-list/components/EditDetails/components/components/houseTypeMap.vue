<template>
    <div class="hosueTypeMap">
        <el-form :model="form" label-width="200px">
            <el-form-item label="户型">
                <el-select v-model="form.houeType" value-key="label">
                    <el-option v-for="(item, index) in houseTypeOption" :key="index" :label="item.label" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="户型名称">
                <el-input v-model="form.houseWebName"></el-input>
            </el-form-item>
            <el-form-item label="户型图名称">
                <el-input v-model="form.houseName"></el-input>
            </el-form-item>
            <el-form-item label="户型面积（㎡）">
                <el-input v-model="form.housearea"></el-input>
            </el-form-item>
            <el-form-item label="户型图标签">
                <el-select  v-model="form.hosueTypeTag" multiple filterable  allow-create default-first-option :multiple-limit="3">
                    <el-option v-for="item in hosueTypeTagOptions" :key="item.value" :label="item.labelName" :value="item.labelName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="户型解析">
                <el-input type="textarea" v-model="form.houseAnalyze"></el-input>
            </el-form-item>
            <el-form-item label="户型图">
                <el-upload
                    class="avatar-uploader"
                    action="https://zylc1.gtdreamlife.com/file/upload/api"
                    :data="data"
                    name="upfile"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeUpload">
                    <img v-if="form.picWechat" :src="form.picWechat" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="对应样板间图片">
                <el-button @click="handleOpenDialog">选择样板间</el-button>
                <div>
                    <div v-for="(item, index) in list" :key="index" class="show-pic-wrap">
                        <img :src="item.uriwechat" />
                        <i class="el-icon-circle-close closeIcon" @click="handleRemovePic(index)"></i>
                    </div>
                </div>
            </el-form-item>
            <div>
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button @click="handleBack">取消</el-button>
            </div>
        </el-form>
        <el-dialog title="选择样板间" :visible.sync="dialogVisible" width="830px">
            <div class="pic-wrap">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="(item, index) in picList" :key="index" :label="item">
                        <img :src="item.uriwechat" class="img"/>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSaveChoose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { buildingHouseInfo, buildingHouseAppend, buildingHouseModify, buildingHouseDoAlbumById, buildingHouseModellist, findHouseLabel } from '@/api/building-list.js'
import { getToken } from '@/utils/auth'
    export default {
        props: ['estateInfo', 'id'],
        data() {
            return{
                houseTypeOption: [
                    {label: '一居', value: '1'},
                    {label: '二居', value: '2'},
                    {label: '三居', value: '3'},
                    {label: '四居', value: '4'},
                    {label: '五居', value: '5'},
                    {label: '五居以上', value: '6'}
                ],
                form: {
                    houeType: {},
                    houseWebName: '',
                    houseName: '',
                    housearea: '',
                    houseAnalyze: '',
                    picWechat: '',
                    hosueTypeTag: []
                },
                hosueTypeTagOptions: [],

                list: [],
                dialogVisible: false,
                picList: [],// 弹框内样板间列表

                checkList: [],

                data: {
                    token: getToken()
                },
            }
        },
        methods: {
            handleInit() {
                if( this.id ){
                    buildingHouseInfo({ id: this.id }).then(res=>{
                        if( res.code === 0 ){
                            let data = res.data;
                            this.form.houeType = {
                                label: data.houseTypeName,
                                value: data.houseTypeId,
                            }
                            this.form.houseWebName = data.houseWebName;
                            this.form.houseName = data.houseName;
                            this.form.housearea = data.housearea;
                            this.form.houseAnalyze = data.houseAnalyze;
                            this.form.picWechat = data.picWechat;
                            this.form.hosueTypeTag  = data.labelNameStr.split(',')
                            console.log(this.form)
                        }
                    })
                    this.handleGetChooseHouselist()
                }
                this.handlefindHouseLabel()
            },
            handleOpenDialog() {// 打开选择样板间弹框
                this.dialogVisible = true;
                this.checkList = []
                this.picList = []
                this.handlehouselist()
            },
            handlehouselist() {// 获取所有的户型图列表
                
                let arr = this.list.map(item=>{
                    return item.id
                })
                let id = JSON.stringify(arr)
                let data = {
                    estateId: this.estateInfo.id,
                    id
                }
                buildingHouseModellist(data).then(res=>{
                    if( res.code === 0 ){
                        this.picList = res.data;
                    }
                })
            },
            handlefindHouseLabel() {// 获取户型标签下拉数据
                let data = {
                    estateId: this.estateInfo.id
                }
                findHouseLabel(data).then(res=>{
                    if( res.code === 0 ){
                        this.hosueTypeTagOptions = res.data;
                    }
                })
            },
            handleGetChooseHouselist() {// 获取已选中的户型图列表
                buildingHouseDoAlbumById({
                        estateId: this.estateInfo.id,
                        houseId:this.id
                    }).then(res=>{
                    if( res.code === 0 ){
                        this.list = res.data;
                        this.list.map(item=>{
                            item.uriwechat = item.albumUrlwechat
                            item.id = item.albumId
                        })
                    }
                })
            },
            handleSaveChoose() {// 确定户型图
                this.list.push(...this.checkList)
                this.dialogVisible = false
                
            },
            handleRemovePic(index) {// 删除户型图
                this.list.splice(index, 1)
            },
            handleSave() { // 保存户型图
                console.log(this.list)
                let arr = this.list.map(item=>{
                    return {
                        id: item.id
                    }
                })
                let arrStr = JSON.stringify(arr)

                let labelNameStr = ''
                this.form.hosueTypeTag.map((item, index)=>{
                    if( index == this.form.hosueTypeTag.length - 1 ){
                        labelNameStr = labelNameStr + item
                    }else{
                        labelNameStr = labelNameStr + item + ','
                    }
                })
                
                console.log(labelNameStr)
                let data = {
                    estateId: this.estateInfo.id,
                    houseTypeId: this.form.houeType.value,
                    houseTypeName: this.form.houeType.label,
                    houseWebName: this.form.houseWebName,
                    houseName: this.form.houseName,
                    housearea: this.form.housearea,
                    houseAnalyze: this.form.houseAnalyze,
                    picWechat: this.form.picWechat,
                    labelNameStr,
                    arr: arrStr
                }
                if( this.id ){
                    data.id = this.id
                    buildingHouseModify(data).then(res=>{
                        if(res.code === 0 ){
                            this.$message.success('保存成功！')
                            this.$emit('close')
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }else{
                    buildingHouseAppend(data).then(res=>{
                        if(res.code === 0 ){
                            this.$message.success('保存成功！')
                            this.$emit('close')
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                }
                
                
                
            },
            handleBack() {// 取消
                this.$emit('close')
            },  
            /*******上传图片**********/
            handleAvatarSuccess(res, file) {
                console.log(res)
                console.log(file)
                this.form.picWechat = res.data
            },
            beforeUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                // if (!isJPG) {
                // this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                // if (!isLt2M) {
                // this.$message.error('上传头像图片大小不能超过 2MB!');
                // }
                return isLt2M;
            }
        },
        created() {
            this.handleInit()
        }
        
    }
</script>

<style scoped>
.img {
    width: 250px;
    height: 179px;
}
.pic-wrap{
    max-height: 600px;
    overflow: auto;
}
.show-pic-wrap{
    position: relative;
    display: inline-block;
    margin: 20px;
}
.show-pic-wrap img{
    width: 300px;
    height: 200px;
}
.closeIcon{
    position: absolute;
    right: -13px;
    top: -13px;
    font-size: 26px;
    cursor: pointer;
}
</style>