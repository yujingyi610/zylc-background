import { login, logout, getUserInfo, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const user = {
  state: {
    token: getToken(),
    name: Cookies.get('userName', name) || '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_NAME: (state, name) => {
      state.name = name
      Cookies.set('userName', name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const token = response.token
          commit('SET_TOKEN', token)
          commit('SET_NAME', userInfo.account)
          /*getUserInfo(token).then((res) => {
            console.log(res)
            commit('SET_NAME', 'Admin')
          })*/
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户权限列表
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', 'admin')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
