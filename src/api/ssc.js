/**
 * SSC 供应商接口
 */

import { getAction, postAction, putAction, deleteAction } from '@/utils/ajax'
import config from '@/config/defaultSettings'

const _PREFIX = config.mockPrefix

////// 机构管理

// 获取机构部门列表
const queryDepartTreeList = (params) => getAction(_PREFIX + '/depart/getDepartList', params)

// 获取下拉树
// const queryIdTree = (params) => getAction(_PREFIX + '/depart/queryIdTree', params)
const queryIdTree = (params) => getAction(_PREFIX + '/depart/getDepartList', params)

// 关键字查询部门
const searchByKeywords = (id) => getAction(_PREFIX + '/depart/searchBy', {id})

// 添加
const addDepart = (params) => postAction(_PREFIX + '/depart/addDepart', params)

// 编辑
const editDepart = (params) => putAction(_PREFIX + '', params)

// 删除部门
const delDepart = (params) => deleteAction(_PREFIX + '/depart/delDepart', params)

// 新增部门角色
const addDepartRole = (params) => postAction(_PREFIX + '/depart/addDepartRole', params)

// 编辑部门角色
const editDepartRole = (params) => putAction(_PREFIX + '/depart/editDepartRole', params)

// 权限树
const queryTreeListForRole = (params) => getAction(_PREFIX + '/depart/role/queryTreeList', params)

const queryDepartPermission = (params) => getAction(_PREFIX + '/depart/getDepartPermission', params)

// 保存部门权限
const saveDepartPermission = (params) => postAction(_PREFIX + '/depart/saveDepartPermission', params)

const getDepartPermission = (params) => getAction(_PREFIX + '/depart/getDepartPermission', params)

////// 机构部门

// 机构部门列表
const queryMyDepartTreeList = (params) => getAction(_PREFIX + '/depart/queryMyDepartTreeList', params)


// 获取部门用户列表
const getDepartUserList = (params) => getAction(_PREFIX + '/depart/getUserList', params)

// 添加部门用户
const addDepartUser = (params) => postAction(_PREFIX + '/depart/addUser', params)

// 编辑部门用户
const editDepartUser = (params) => putAction(_PREFIX + '/depart/editUser', params)

// 绑定部门用户
const bindDepartUser = (params) => putAction(_PREFIX + '/depart/bindUser', params)

// 解綁部门用户
const unbindDepartUser = (params) => deleteAction(_PREFIX + '/depart/unBindUser', params)

// 查询部门用户角色
const queryDeptRolePermission = (params) => getAction(_PREFIX + '/depart/role/queryTreeList', params)

// 查询部门角色权限
const queryDepartUserRole = (params) => getAction(_PREFIX + '/depart/role/queryTreeList', params)

// 查询部门角色树列表
const queryTreeListForDeptRole = (params) => getAction(_PREFIX + '/depart/getDepartRoleList', params)

// 保存部门角色权限
const saveDeptRolePermission = (params) => postAction(_PREFIX + '/depart/role/queryTreeList', params)

// 查询全部角色
const queryall = (params) => getAction(_PREFIX + '/depart/getDepartRoleList', params)
const getDepartRoleList = (params) => getAction(_PREFIX + '/depart/getDepartRoleList', params)

export {
  queryDepartTreeList,
  queryIdTree,
  searchByKeywords,
  addDepart,
  editDepart,
  delDepart,
  addDepartRole,
  editDepartRole,

  queryTreeListForRole,
  queryDepartPermission,
  saveDepartPermission,
  getDepartPermission,

  queryMyDepartTreeList,
  getDepartUserList,
  addDepartUser,
  editDepartUser,
  bindDepartUser,
  unbindDepartUser,
  queryDeptRolePermission,
  queryDepartUserRole,
  queryTreeListForDeptRole,
  saveDeptRolePermission,
  queryall,
  getDepartRoleList
}
