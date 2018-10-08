///manager/3.0
import request from '@/utils/request'


//楼盘标签部分接口
export function getTagList(data) {//获取标签列表
  return request({
    url: '/building_label/list',
    method: 'post',
    data
  })
}

export function addTag(data) {//新增标签
  return request({
    url: '/building_label/append',
    method: 'post',
    data
  })
}

export function editTag(data) {//编辑标签
  return request({
    url: '/building_label/modify',
    method: 'post',
    data
  })
}

export function deleteTag(data) {//新增标签
  return request({
    url: '/building_label/discard',
    method: 'post',
    data
  })
}


//运营团队模块接口
export function getLeftTree(data) {//获取左侧结构树
  return request({
    url: '/building_info/companyList',
    method: 'post',
    data
  })
}

export function getLeftTreeProject(data) {//获取左侧项目结构树
  return request({
    url: '/building_info/projectList',
    method: 'post',
    data
  })
}

export function getLeftBuildList(data) {//获取左侧楼盘结构树
  return request({
    url: '/building_info/list',
    method: 'post',
    data
  })
}

export function getTeam(data){//获取团队
  return request({
    url: '/adminTeam/list',
    method: 'post',
    data
  })
}
//
export function addTeamList(data){//添加团队
  return request({
    url: '/adminTeam/append',
    method: 'post',
    data
  })
}

export function editTeamList(data){//编辑团队
  return request({
    url: '/adminTeam/modify',
    method: 'post',
    data
  })
}

export function deleteTeamList(data){//删除团队
  return request({
    url: '/adminTeam/discard',
    method: 'post',
    data
  })
}

export function queryTeamPerson(data){//查询团队成员
  return request({
    url: '/adminTeamUser/list',
    method: 'post',
    data
  })
}

export function removeTeamPerson(data){//移除团队成员
  return request({
    url: '/adminTeamUser/discard',
    method: 'post',
    data
  })
}

//新增团队成员
export function getGreenTownInChina(data){
  return request({
    url:'/building_info/greenList',
    method:'post',
    data
  })
}

export function getGroupAndCompany(data){//获取集团&公司
  return request({
    url:'/building_info/cityList',
    method:'post',
    data
  })
}

export function getPart(data){//获取部门
  return request({
    url:'/building_info/deptList',
    method:'post',
    data
  })
}

export function getPersonList(data){//获取人员列表
  return request({
    url:'/building_info/personList',
    method:'post',
    data
  })
}


export function saveTeamPerson(data){//保存人员列表
  return request({
    url:'/adminTeamUser/append',
    method:'post',
    data
  })
}

//
export function getPersonTableList(data){//获取人员列表
  return request({
    url:'/adminUser/list',
    method:'post',
    data
  })
}
