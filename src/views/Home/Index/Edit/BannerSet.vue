<template>
  <div class="BannerSet">
    <el-card>
      <div slot="header">
        <span>头图设置</span>
        <el-button style="float: right;margin-top: -10px" type="primary" @click="submit">确认修改</el-button>
      </div>
      <el-form :model="MobileData" label-width="80px" ref="itemForm">
        <div
          v-for="(item, index) in MobileData.param"
          :key="item.key"
          class="item-box">
          <div class="item-title">{{ '第' + (index + 1) + '项' }}</div>
          <div>
            <div class="item-form-box">
              <el-card>
                <el-row :gutter="20" type="flex" align="middle" justify="space-around">
                  <el-col :span="4">
                    <div class="upload-img-box">
                      <UploadImg :index="index" :show-img="item.imageWechat" @success="success"/>
                      <span class="upload-text">上传图片</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :prop="'param.' + index + '.url'" label="菜单链接:" :rules="urlRule">
                      <el-input v-model="item.url" placeholder="请输入菜单链接" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item :rules="sortRule" :prop="'param.' + index + '.sort'" label="排序:">
                      <el-input v-model.number="item.sort" placeholder="序号"/>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-card>
            </div>
            <div class="mobile-btn-box">
              <el-button type="primary" icon="el-icon-plus" circle @click="addIconItem" v-if="(index+1) === MobileData.param.length && showAdd(index)"/>
              <el-button icon="el-icon-minus" circle @click="delIconItem(item, index)" v-if="index !== 0"/>
            </div>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import UploadImg from './UploadImg.vue'
import { bannerEdit, bannerDel } from 'api/home/index/edit.js'
import { numberType, urlType } from '@/utils/rules'
export default {
  name: 'BannerSet',
  components: {
    UploadImg
  },
  props: ['data'],
  data() {
    return {
      cityId: this.$route.params.id,
      sortRule: [
        { validator: (rule, value, callback) => {
          let mapList = []
          console.log(this.cityId)
          if (this.cityId == 1) {
            // 全国
            mapList = [1, 2, 3, 4, 5, 6]
            const index = mapList.indexOf(value)
            console.log(index)
            if (index !== (-1)) {
              callback()
            } else {
              callback(new Error('排序必须小于6'))
            }
          } else {
            mapList = [1, 2, 3, 4, 5, 6, 7, 8]
            const index = mapList.indexOf(value)
            if (index !== (-1)) {
              callback()
            } else {
              callback(new Error('排序必须小于8'))
            }
          }
        }, trigger: 'blur' }
      ],
      urlRule: [
        { validator: urlType, trigger: 'blur' }
      ],
      isNationwide: this.$store.getters.isNationwide,
      MobileData: {
        param: [{
          imageWechat: '',
          url: '',
          sort: '',
          isScope: sessionStorage.isNationwide,
          cityId: this.$route.params.id, // 城市编辑时必选
          id: ''
        }]
      }
    }
  },
  watch: {
    data: {
      handler(newVal) {
        const isNationwide = sessionStorage.isNationwide
        const list = []
        const len = newVal.length
        if (len === 0) {
          list.push({
            imageWechat: '',
            url: '',
            sort: '',
            isScope: sessionStorage.isNationwide,
            cityId: this.cityId, // 城市编辑时必选
            id: ''
          })
          return false
        }
        newVal.forEach((val, index) => {
          const item = {
            name: val.name,
            imageWechat: val.imageWechat,
            url: val.url,
            sort: val.sort,
            isScope: isNationwide,
            id: val.id,
            cityId: this.cityId
          }
          list.push(item)
        })
        this.$set(this.MobileData, 'param', list)
      },
      deep: true
    }
  },
  methods: {
    showAdd(index) {
      if (this.cityId == 1) {
        // 全国
        if (index < 5) {
          return true
        } else {
          return false
        }
      } else {
        // 城市
        if (index < 7) {
          return true
        } else {
          return false
        }
      }
    },
    success(data) {
      this.$set(this.MobileData.param[data.index], 'imageWechat', data.imgUrl)
    },
    changSort(item) {
      const id = item.id
      if (id) {
        this.submit().then((res) => {})
      }
    },
    addIconItem() {
      this.MobileData.param.push({
        imageWechat: '',
        url: '',
        sort: '',
        isScope: sessionStorage.isNationwide,
        cityId: this.cityId, // 城市编辑时必选
        id: ''
      })
    },
    delIconItem(item, index) {
      const id = item.id
      this.$confirm('是否删除第' + (index + 1) + '项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (id) {
          bannerDel(id).then(() => {
            this.$emit('flesh')
          })
        } else {
          this.MobileData.param.splice(index, 1)
        }
      }).catch()
    },
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs['itemForm'].validate((valid) => {
          if (valid) {
            const emitData = {
              param: JSON.stringify(this.MobileData.param)
            }
            bannerEdit(emitData).then((res) => {
              this.$emit('flesh')
              resolve()
            }).catch((error) => {
              reject(error)
            })
          }
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
