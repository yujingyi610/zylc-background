import request from '@/utils/request'

export function getNoticList(data){//获取公告列表
  return request({
    url: '/content/notice/list',
    method: 'post',
    data
  })
}
export function deleteNoticInfo(id){//公告删除
  return request({
    url: '/content/notice/discard',
    method: 'post',
    data: {
      id
    }
  })
}
export function noticeInfo(data){//公告发布，下架
return request({
    url: '/content/notice/modify',
    method: 'post',
    data
})
}
export function noticEditor(data){//公告编辑
return request({
    url: '/content/notice/modify',
    method:'post',
    data
})
}
export function checkNoticInfo(data){//公告查看
  return request({
      url: '/content/notice/info',
      method:'post',
      data
  })
}
export function addNoticInfo(data){//公告添加
return request({
    url:'/content/notice/append',
    method:'post',
    data
})
}
