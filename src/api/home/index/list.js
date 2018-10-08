import request from '@/utils/request'

export function getCityList(data) {
  return request({
    url: 'home/list',
    method: 'post',
    data
  })
}
