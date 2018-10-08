<template>
  <div class="Recommend">
    <el-card>
      <div slot="header">
        <span>好盘推荐</span>
        <el-checkbox v-model="isRecommend" style="margin-left: 20px" true-label="1" false-label="0" @change="handChange">绿城+</el-checkbox>
        <el-button style="float: right;margin-top: -10px" type="primary" @click="submit">确认修改</el-button>
      </div>
      <el-form ref="itemForm" :model="MobileData" label-width="80px">
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
                      <UploadImg :index="index" :show-img="item.image" @success="success"/>
                      <span class="upload-text">上传图片</span>
                    </div>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="标题:">
                      <el-input v-model="item.title" placeholder="请输入标题" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :rules="urlRule" :prop="'param.' + index + '.url'" label="菜单链接:">
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
import { recommendEdit, recommendDel } from 'api/home/index/edit.js'
import { numberType, urlType } from '@/utils/rules'
export default {
  name: 'Recommend',
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
          if (this.cityId == 1) {
            // 全国
            mapList = [1, 2, 3, 4]
            const index = mapList.indexOf(value)
            console.log(index)
            if (index !== (-1)) {
              callback()
            } else {
              callback(new Error('请输入1-4的整数'))
            }
          } else {
            mapList = [1, 2, 3, 4, 5, 6]
            const index = mapList.indexOf(value)
            if (index !== (-1)) {
              callback()
            } else {
              callback(new Error('请输入1-6的整数'))
            }
          }
        }, trigger: 'blur' }
      ],
      urlRule: [
        { validator: urlType, trigger: 'blur' }
      ],
      isNationwide: this.$store.getters.isNationwide,
      isRecommend: '0',
      MobileData: {
        param: [{
          title: '', // 标题
          image: '', // 图片
          url: '',
          isRecommend: this.isRecommend, // 是否推荐绿城
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
            title: '', // 标题
            image: '', // 图片
            url: '',
            isRecommend: this.isRecommend, // 是否推荐绿城
            sort: '',
            isScope: sessionStorage.isNationwide,
            cityId: this.cityId, // 城市编辑时必选
            id: ''
          })
          return false
        }
        this.isRecommend = newVal[0].isRecommend
        newVal.forEach((val, index) => {
          this.isRecommend = val.isRecommend
          const item = {
            name: val.name,
            title: val.title,
            isRecommend: val.isRecommend,
            image: val.image,
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
        if (index < 3) {
          return true
        } else {
          return false
        }
      } else {
        // 城市
        if (index < 5) {
          return true
        } else {
          return false
        }
      }
    },
    handChange(isSel) {
      this.MobileData.param.forEach((val, index) => {
        this.$set(this.MobileData.param[index], 'isRecommend', isSel)
      })
    },
    success(data) {
      this.$set(this.MobileData.param[data.index], 'image', data.imgUrl)
    },
    changSort(item) {
      const id = item.id
      if (id) {
        this.submit().then((res) => {})
      }
    },
    addIconItem() {
      this.MobileData.param.push({
        title: '', // 标题
        image: '', // 图片
        url: '',
        isRecommend: this.isRecommend, // 是否推荐绿城
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
          recommendDel(id).then(() => {
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
            recommendEdit(emitData).then((res) => {
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
