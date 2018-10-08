import request from '@/utils/request'

// 获取用户列表
export function getUserList(data) {
  return request({
    url: 'adminUser/list',
    method: 'post',
    data
  })
}
// 获取角色列表 和已选中角色列表
export function getRoleList(id) {
  return request({
    url: 'userRole/RoleList',
    method: 'post',
    data: {
      id
    }
  })
}
// 保存用户角色
export function setUserRole(data) {
  return request({
    url: 'userRole/saveOrUpdate',
    method: 'post',
    data
  })
}
