import request from '@/utils/request'

export function getWorkInfo(data) {
  return request({
    url: 'workInfo/countlist',
    method: 'post',
    data
  })
}
