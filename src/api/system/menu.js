import request from '@/utils/request'

// 获取菜单列表
export function getMenuList(data) {
  return request({
    url: 'adminMeun/list',
    method: 'post',
    data
  })
}
// 获取节点详情
export function getMenuInfo(id) {
  return request({
    url: 'adminMeun/getById',
    method: 'post',
    data: {
      id
    }
  })
}
// 提交节点修改
export function setMenuInfo(data) {
  return request({
    url: 'adminMeun/modify',
    method: 'post',
    data
  })
}
// 提交节点修改
export function addMenu(data) {
  return request({
    url: 'adminMeun/append',
    method: 'post',
    data
  })
}

// 删除节点
export function discardMenu(id) {
  return request({
    url: 'adminMeun/discard',
    method: 'post',
    data: {
      id
    }
  })
}
// 获取按钮列表详情数据
export function getBtnInfo(id) {
  return request({
    url: 'adminMeunButton/getById',
    method: 'post',
    data: {
      id
    }
  })
}
// 新增按钮
export function addBtn(data) {
  return request({
    url: 'adminMeunButton/append',
    method: 'post',
    data
  })
}
// 编辑按钮
export function modifyBtn(data) {
  return request({
    url: 'adminMeunButton/modify',
    method: 'post',
    data
  })
}
// 删除按钮
export function discardBtn(id) {
  return request({
    url: 'adminMeunButton/discard',
    method: 'post',
    data: {
      id
    }
  })
}
