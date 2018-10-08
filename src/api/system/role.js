import request from '@/utils/request'

// 获取用户列表
export function getRoleList(data) {
  return request({
    url: 'adminRole/list',
    method: 'post',
    data
  })
}
// 编辑角色
export function modifyRole(data) {
  return request({
    url: 'adminRole/modify',
    method: 'post',
    data
  })
}
// 保存新增角色
export function addRole(data) {
  return request({
    url: 'adminRole/append',
    method: 'post',
    data
  })
}
// 获取角色权限列表
export function getPermissionList(id) {
  return request({
    url: 'RoleMeun/permissionList',
    method: 'post',
    data: {
      id
    }
  })
}
// 保存角色权限列表
export function setPermissionList(data) {
  return request({
    url: 'RoleMeun/saveMeunByRoleId',
    method: 'post',
    data
  })
}
