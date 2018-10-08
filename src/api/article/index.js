import request from '@/utils/request'

export function getArticleList(data){//获取文章列表
  return request({
    url: '/content/news/list',
    method: 'post',
    data
  })
}

export function appendArticleInfo(data){//文章信息插入
  return request({
    url: '/content/news/append',
    method: 'post',
    data
  })
}

export function appendGroupArticleInfo(data){//文章信息批量插入
  return request({
    url: '/content/news/appendList',
    method: 'post',
    data
  })
}

export function deleteArticleInfo(data){//文章信息删除
  return request({
    url: '/content/news/discard',
    method: 'post',
    data
  })
}

export function deleteGroupArticleInfo(data){//文章信息批量删除
  return request({
    url: '/content/news/discardList',
    method: 'post',
    data
  })
}

export function getArticleDetail(data){//获取文章详情
  return request({
    url: '/content/news/info',
    method: 'post',
    data
  })
}

export function editArticle(data){//文章编辑
  return request({
    url:'/content/news/modify',
    method:'post',
    data
  })
}

export function isPublishArticle(data){//文章发布与下架
  return request({
    url:'/content/news/isPublish',
    method:'post',
    data
  })
}

export function editGroupArticle(data){//批量编辑文章
  return request({
    url:'/content/news/modifyList',
    method:'post',
    data
  })
}

export function queryArticleType(data){//查询文章类别
  return request({
    url:'/content/news/type/list',
    method:'post',
    data
  })
}
export function addArticleType(data){//新建文章类型
  return request({
    url:'/content/news/type/append',
    method:'post',
    data
  })
}
export function editArticleType(data){//新建文章类型
  return request({
    url:'/content/news/type/modify',
    method:'post',
    data
  })
}
