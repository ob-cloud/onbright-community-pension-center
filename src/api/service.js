import { getAction, postAction, deleteAction } from '@/utils/ajax'

const _PREFIX = '/accp'

////// 客户模块

// 获取客户列表
const getConsumerList = (params) => getAction(_PREFIX + '/mp/getConsumerList', params)

// 获取客户详情信息
const getConsumerDetail = (id) => getAction(_PREFIX + '/mp/getConsumerDetail', {id})

// 编辑客户信息
const editConsumer = (params) => postAction(_PREFIX + '/mp/editConsumerInfo', params)

// 删除客户信息
const delConsumerList = (params) => deleteAction(_PREFIX + '/mp/delConsumerDetail', params)

////// 套餐模块

// 获取套餐列表
const getPackageList = (params) => getAction(_PREFIX + '/mp/getPackageList', params)

// 获取套餐详情
const getPackageDetail = (params) => getAction(_PREFIX + '/mp/getPackageDetail', params)

// 新增套餐
const addPackage = (params) => postAction(_PREFIX + '/mp/addPackage', params)

// 编辑套餐
const editPackage = (params) => postAction(_PREFIX + '/mp/editPackageDetail', params)

// 删除套餐
const delPackage = (params) => deleteAction(_PREFIX + '/mp/delPackage', params)

// 绑定套餐
const bindPackage = (params) => postAction(_PREFIX + '/mp/bindPackage', params)

export {
  getConsumerList,
  getConsumerDetail,
  editConsumer,
  delConsumerList,
  getPackageList,
  getPackageDetail,
  addPackage,
  editPackage,
  delPackage,
  bindPackage
}
