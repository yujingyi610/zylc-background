import request from '@/utils/request'

export function list(data) {// 获取楼盘列表
  return request({
    url: 'building_info/list',
    method: 'post',
    data
  })
}

/***********新建楼盘api*******************/
export function cityList(data) {// 获取城市公司下拉数据
  return request({
    url: 'building_info/cityList',
    method: 'post',
    data
  })
}
export function companyList(data) {// 获取城市公司下拉数据
  return request({
    url: 'building_info/companyList',
    method: 'post',
    data
  })
}
export function projectList(data) {// 获取项目下拉数据
  return request({
    url: 'building_info/projectList',
    method: 'post',
    data
  })
}
export function personList(data) {// 获取运营负责人
  return request({
    url: 'building_info/personList',
    method: 'post',
    data
  })
}
export function append(data) {// 新增楼盘
  return request({
    url: 'building_info/append',
    method: 'post',
    data
  })
}
export function modifyPerson(data) {// 编辑运营负责人
  return request({
    url: 'building_info/modifyPerson',
    method: 'post',
    data
  })
}

/**********楼盘列表api***************/
export function publishZylc(data) {// 发布/取消发布
  return request({
    url: 'building_info/publishZylc',
    method: 'post',
    data
  })
}
/***********楼栋信息api*************/
export function buildingInfo(data) {// 根据楼盘id获取楼栋信息
  return request({
    url: 'building_info/info',
    method: 'post',
    data
  })
}
export function getProviceList(data) {// 省市区三级联动
  return request({
    url: 'building_info/selectProviceList',
    method: 'post',
    data
  })
}

export function getCityList(data) {// 省市区三级联动
  return request({
    url: 'building_info/selectCityList',
    method: 'post',
    data
  })
}
export function getAreaList(data) {// 省市区三级联动
  return request({
    url: 'building_info/selectAreaList',
    method: 'post',
    data
  })
}
export function buildingInfoModify(data) {// 保存楼栋信息
  return request({
    url: 'building_info/modify',
    method: 'post',
    data
  })
}
export function findEstateLabelList(data) {// 获取楼盘标签
  return request({
    url: 'building_info/findEstateLabelList',
    method: 'post',
    data
  })
}
/**********顾问管理api**************/
export function buildingBrokerList(data) {// 根据楼盘id获取顾问列表
  return request({
    url: 'building_broker/list',
    method: 'post',
    data
  })
}

export function buildingBrokerInfo(data) {// 根据顾问id获取顾问信息
  return request({
    url: 'building_broker/info',
    method: 'post',
    data
  })
}

export function buildingBrokerModify(data) {// 修改顾问信息
  return request({
    url: 'building_broker/modify',
    method: 'post',
    data
  })
}


/************楼栋信息************/
export function divideList(data) {// 查询分期下拉数据
  return request({
    url: 'building_group/divideList',
    method: 'post',
    data
  })
}

export function buildingGroupList(data) {// 查询组团信息
  return request({
    url: 'building_group/list',
    method: 'post',
    data
  })
}

export function buildList(data) {// 查询楼栋列表数据
  return request({
    url: 'building_group/buildNewList',
    method: 'post',
    data
  })
}

export function houselist(data) {// 查询弹框户型图列表
  return request({
    url: 'building_house/houselist',
    method: 'post',
    data
  })
}

export function buildingGroupModify(data) {//绑定户型图
  return request({
    url: 'building_group/modify',
    method: 'post',
    data
  })
}

export function buildingGroupSalelabel(data) {// 获取标签数据
  return request({
    url: 'building_group/salelabel',
    method: 'post',
    data
  })
}
export function buildingGroupInsertLabelPoint(data) {// 应用标签数据
  return request({
    url: 'building_group/insertLabelPoint',
    method: 'post',
    data
  })
}
export function buildingGroupDeleteLabelPoint(data) {// 应用标签数据
  return request({
    url: 'building_group/deleteLabelPoint',
    method: 'post',
    data
  })
}
export function buildingGroupSale(data) {// 编辑
  return request({
    url: 'building_group/sale',
    method: 'post',
    data
  })
}
export function buildingGroupFindLabelPoint(data) {// 获取已存在标签数据
  return request({
    url: 'building_group/findLabelPoint',
    method: 'post',
    data
  })
}
/*****************楼盘相册************/
export function buildingAlbumList(data) {// 查询楼盘相册
  return request({
    url: 'building_album/albumList',
    method: 'post',
    data
  })
}

export function appendPatch(data) {// 保存楼盘相册
  return request({
    url: 'building_album/appendPatch',
    method: 'post',
    data
  })
}
/**********户型展示api***********/
export function buildingHouseList(data) {//户型展示列表
  return request({
    url: 'building_house/list',
    method: 'post',
    data
  })
}

export function buildingHouseAppend(data) {// 添加户型
  return request({
    url: 'building_house/append',
    method: 'post',
    data
  })
}
export function buildingHouseModify(data) {// 编辑户型
  return request({
    url: 'building_house/modify',
    method: 'post',
    data
  })
}

export function buildingHouseInfo(data) {// 获取户型详情
  return request({
    url: 'building_house/info',
    method: 'post',
    data
  })
}
export function buildingHouseDoAlbumById(data) {// 获取已选中的样板间
  return request({
    url: 'building_house/doAlbumById',
    method: 'post',
    data
  })
}
export function buildingHouseModellist(data) {// 获取所有样板间
  return request({
    url: 'building_house/modellist',
    method: 'post',
    data
  })
}
export function findHouseLabel(data) {// 获取所有样板间
  return request({
    url: 'building_house/findHouseLabel',
    method: 'post',
    data
  })
}
export function buildingHouseShow(data) {// 户型展示隐藏
  return request({
    url: 'building_house/show',
    method: 'post',
    data
  })
}
/*********楼盘动态api*********/
export function buildingNewsList(data) {//动态列表
  return request({
    url: 'building_news/list',
    method: 'post',
    data
  })
}

export function buildingNewsInfo(data) {//动态详情
  return request({
    url: 'building_news/info',
    method: 'post',
    data
  })
}
export function buildingNewsModify(data) {//编辑动态
  return request({
    url: 'building_news/modify',
    method: 'post',
    data
  })
}
export function buildingNewsAppend(data) {//新建动态
  return request({
    url: 'building_news/append',
    method: 'post',
    data
  })
}
export function buildingNewsDiscard(data) {//删除动态
  return request({
    url: 'building_news/discard',
    method: 'post',
    data
  })
}
/***********开盘信息api************/
export function estateInfoList(data) {//开盘列表
  return request({
    url: 'building/estate/info/list',
    method: 'post',
    data
  })
}

export function estateInfoAppend(data) {//新增开盘信息
  return request({
    url: 'building/estate/info/append',
    method: 'post',
    data
  })
}
export function estateInfoModify(data) {//编辑开盘信息
  return request({
    url: 'building/estate/info/modify',
    method: 'post',
    data
  })
}
export function estateInfoDiscard(data) {//删除开盘信息
  return request({
    url: 'building/estate/info/discard',
    method: 'post',
    data
  })
}