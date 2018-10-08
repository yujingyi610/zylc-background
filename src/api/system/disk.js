import request from '@/utils/request'

// 获取字典列表
export function getDiskList(data) {
  return request({
    url: 'adminDict/list',
    method: 'post',
    data
  })
}
// 删除字典类型
export function discardDisk(id) {
  return request({
    url: 'adminDict/discard',
    method: 'post',
    data: {
      id
    }
  })
}
// 编辑字典
export function editdDisk(data) {
  return request({
    url: 'adminDict/modify',
    method: 'post',
    data
  })
}
// 字典类型添加
export function addDisk(data) {
  return request({
    url: 'adminDict/append',
    method: 'post',
    data
  })
}
