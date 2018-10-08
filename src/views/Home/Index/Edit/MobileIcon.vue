<template>
  <div class="MobileIcon">
    <el-card>
      <div slot="header">
        <span>移动端ICON</span>
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
                <el-row :gutter="20">
                  <el-col :span="3">
                    <el-form-item label="ICON:">
                      <UploadIcon :index="index" :show-img="item.image" @success="success"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="菜单名称:">
                      <el-input v-model="item.name" placeholder="请输入菜单名称" />
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
              <el-button type="primary" icon="el-icon-plus" circle @click="addIconItem" v-if="(index+1) === MobileData.param.length && index < 4"/>
              <el-button icon="el-icon-minus" circle @click="delIconItem(item, index)" v-if="index !== 0"/>
            </div>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import UploadIcon from './UploadIcon.vue'
import { iconEdit, delIcon } from 'api/home/index/edit.js'
import { urlType } from '@/utils/rules'

export default {
  name: 'Mobile',
  components: {
    UploadIcon
  },
  props: ['data'],
  data() {
    return {
      sortRule: [
        { validator: (rule, value, callback) => {
          const mapList = [1, 2, 3, 4, 5, 6]
          const index = mapList.indexOf(value)
          if (index !== (-1)) {
            callback()
          } else {
            callback(new Error('排序必须小于6'))
          }
        }, trigger: 'blur' }
      ],
      urlRule: [
        { validator: urlType, trigger: 'blur' }
      ],
      isNationwide: this.$store.getters.isNationwide,
      MobileData: {
        param: [{
          name: '',
          image: '',
          url: '',
          sort: '',
          isNationwide: sessionStorage.isNationwide,
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
            name: '',
            image: '',
            url: '',
            sort: '',
            isNationwide: sessionStorage.isNationwide,
            id: ''
          })
          return false
        }
        newVal.forEach((val, index) => {
          const item = {
            name: val.name,
            image: val.image,
            url: val.url,
            sort: val.sort,
            isScope: isNationwide,
            id: val.id
          }
          list.push(item)
        })
        this.MobileData = {
          param: list
        }
      },
      deep: true
    }
  },
  methods: {
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
        name: '',
        image: '',
        url: '',
        sort: '',
        isNationwide: sessionStorage.isNationwide,
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
          delIcon(id).then(() => {
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
            iconEdit(emitData).then((res) => {
              this.$emit('flesh')
              resolve()
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
