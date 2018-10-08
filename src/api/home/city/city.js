import request from '@/utils/request'

export function getCityList(data) {
  return request({
    url: 'home/area/list',
    method: 'post',
    data
  })
}
export function modifyCity(data) {
  return request({
    url: 'home/area/modify',
    method: 'post',
    data
  })
}
