import { getAction, postAction, deleteAction } from '@/utils/ajax'

const _PREFIX = '/cpc'

////// 机构管理模块

// 获取机构列表
const getEnterpriseList = (params) => getAction(_PREFIX + '/mp/getPackageList', params)

// 获取机构详情
const getEnterpriseDetail = (params) => getAction(_PREFIX + '/mp/getPackageDetail', params)

// 新增机构
const addEnterprise = (params) => postAction(_PREFIX + '/mp/addPackage', params)

// 编辑机构
const editEnterprise = (params) => postAction(_PREFIX + '/depart/editDepartAdmin', params)

// 删除机构
const delEnterprise = (params) => deleteAction(_PREFIX + '/mp/delPackage', params)

/////// 套餐管理模块

// 套餐列表
const getPackageList = (params) => getAction(_PREFIX + '/mp/getBindedPackage', params)

////// 服务管理

// 服务内容
const getServiceList = (params) => getAction(_PREFIX + '/Svc/getSvcList', params)

// 服务记录
const getServiceRecordList = (params) => getAction(_PREFIX + '/Svc/getSvcRecordList', params)

export {
  getEnterpriseList,
  getEnterpriseDetail,
  addEnterprise,
  editEnterprise,
  delEnterprise,
  getPackageList,

  getServiceList,
  getServiceRecordList
}
