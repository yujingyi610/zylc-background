import request from '@/utils/request'
// 获取预约列表数据
export function getOrderList(data) {
  return request({
    url: 'customUser/prolist',
    method: 'post',
    data
  })
}
// 获取预约列表数据
export function getBuildingList(data) {
  return request({
    url: 'building_info/list',
    method: 'post',
    data
  })
}
// 获取顾问列表
export function getAdv(id) {
  return request({
    url: 'customresever/isConfirmBroker',
    method: 'post',
    data: {
      id
    }
  })
}
// 保存顾问
export function setAdv(data) {
  return request({
    url: 'customresever/confirmBroker',
    method: 'post',
    data
  })
}
// 通知顾问
export function noticeAdv(id, finalPropertyConsultName) {
  return request({
    url: 'customresever/noticBroker',
    method: 'post',
    data: {
      id
    }
  })
}
