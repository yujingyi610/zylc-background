import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}
// 退出登录
export function logout(data) {
  return request({
    url: 'user/logout',
    method: 'post',
    data
  })
}
// 获取权限列表
export function getInfo(token) {
  return request({
    url: 'user/menu',
    method: 'post',
    data: { token }
  })
}
// 获取用户信息
export function getUserInfo(token) {
  return request({
    url: 'https://zylc1.gtdreamlife.com/user/info',
    method: 'post',
    data: { token }
  })
}

