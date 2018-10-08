import request from '@/utils/request'

export function getCityList(data) {
  return request({
    url: 'home/list',
    method: 'post',
    data
  })
}

export function getCityInfo(id) {
  return request({
    url: 'home/info',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 移动端ICON编辑、添加
export function iconEdit(data) {
  return request({
    url: 'home/menu/appendList',
    method: 'post',
    data
  })
}
// 移动端ICON删除
export function delIcon(id) {
  return request({
    url: 'home/menu/discard',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 头图设置编辑、添加
export function bannerEdit(data) {
  return request({
    url: 'home/banner/appendList',
    method: 'post',
    data
  })
}
// 移动端ICON删除
export function bannerDel(id) {
  return request({
    url: 'home/banner/discard',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 好盘推荐编辑、添加
export function recommendEdit(data) {
  return request({
    url: 'home/building/appendList',
    method: 'post',
    data
  })
}
// 好盘推荐删除
export function recommendDel(id) {
  return request({
    url: 'home/building/discard',
    method: 'post',
    data: {
      id: id
    }
  })
}
// 房产资讯编辑、添加
export function newsEdit(data) {
  return request({
    url: 'home/news/appendList',
    method: 'post',
    data
  })
}
// 房产资讯删除
export function newsDel(id) {
  return request({
    url: 'home/news/discard',
    method: 'post',
    data: {
      id: id
    }
  })
}
