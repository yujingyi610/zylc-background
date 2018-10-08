import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function(data) {
    const token = getToken()
    if (data) {
      data.token = token
    } else {
      data = {
        token: token
      }
    }
    return Qs.stringify(data)
  }]
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错
     */
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })

      // 99: 用户登录过期，token无效; 9999: 服务内部错误，异常返回;
      if (res.code === 99) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
