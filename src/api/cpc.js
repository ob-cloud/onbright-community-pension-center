/**
 * CPC 社区养老接口
 */

import { getAction, postAction, putAction, deleteAction } from '@/utils/ajax'
import config from '@/config/defaultSettings'

const _PREFIX = config.mockPrefix

////// 机构管理模块

// 获取机构列表
const getEnterpriseList = (params) => getAction(_PREFIX + '/mp/getPackageList', params)

// 获取机构详情
const getEnterpriseDetail = (params) => getAction(_PREFIX + '/mp/getPackageDetail', params)

// 新增机构
const addEnterprise = (params) => postAction(_PREFIX + '/depart/addDepartAdmin', params)

// 编辑机构
const editEnterprise = (params) => putAction(_PREFIX + '/depart/editDepartAdmin', params)

// 删除机构
const delEnterprise = (params) => deleteAction(_PREFIX + '/depart/delDepartAdmin', params)

// 冻结
const frozenBatch = (params) => deleteAction(_PREFIX + '/depart/freezeDepartAdmin', params)

/////// 套餐管理模块

// 套餐列表
const getPackageList = (params) => getAction(_PREFIX + '/mp/getBindedPackage', params)

////// 服务管理

// 服务内容
const getServiceList = (params) => getAction(_PREFIX + '/Svc/getSvcList', params)

// 服务记录
const getServiceRecordList = (params) => getAction(_PREFIX + '/Svc/getSvcRecordList', params)

/////// 楼宇

// 获取楼宇树列表
const getBuildingTreeList = (params) => getAction(_PREFIX + '/building/getBuildingTreeList', params)

// 获取下拉树
const queryIdTree = (params) => getAction(_PREFIX + '/building/queryIdTree', params)

const searchByKeywords = (id) => getAction(_PREFIX + '/building/searchBy', {id})

// 添加
const addBuilding = (params) => postAction(_PREFIX + '/building/addBuilding', params)

// 编辑
const editBuilding = (params) => putAction(_PREFIX + '/building/editBuilding', params)

// 删除
const delBuilding = (params) => deleteAction(_PREFIX + '/building/delBuilding', params)

// 获取床位列表
const getBuiltBedList = (params) => getAction(_PREFIX + '/building/getBuiltBedList', params)

// 添加床位
const addBuiltBed = (params) => postAction(_PREFIX + '/building/addBuiltBed', params)

// 编辑床位
const editBuiltBed = (params) => putAction(_PREFIX + '/building/editBuiltBed', params)

// 删除床位
const delBuiltBed = (params) => deleteAction(_PREFIX + '/building/delBuiltBed', params)

export {
  getEnterpriseList,
  getEnterpriseDetail,
  addEnterprise,
  editEnterprise,
  delEnterprise,
  frozenBatch,

  getPackageList,

  getServiceList,
  getServiceRecordList,

  getBuildingTreeList,
  queryIdTree,
  searchByKeywords,
  addBuilding,
  editBuilding,
  delBuilding,

  getBuiltBedList,
  addBuiltBed,
  editBuiltBed,
  delBuiltBed
}
