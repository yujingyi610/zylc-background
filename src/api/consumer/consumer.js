import request from '@/utils/request'

// 客户列表
export function getConsumerList(data) {
  return request({
    url: 'customUser/list',
    method: 'post',
    data
  })
}
// 客户状态修改
export function updateCust(id, status) {
  return request({
    url: 'customUser/updateCust',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
// 客户状态修改
export function searchCust(data) {
  return request({
    url: 'customUser/prolist',
    method: 'post',
    data
  })
}
// 反馈列表
export function getFeedBackList(data) {
  return request({
    url: 'customUser/backList',
    method: 'post',
    data
  })
}
// 客户反馈导出
export function exportFeedBackList(params) {
  return request({
    url: 'customUser/backexport',
    method: 'get',
    params
  })
}
