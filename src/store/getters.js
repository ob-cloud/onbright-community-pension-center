import Vue from 'vue'
import { USER_INFO, SYS_CLIENT_TYPE } from '@/store/mutation-types'
const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => {
    state.user.avatar = Vue.ls.get(USER_INFO).avatar;
    return state.user.avatar
  },
  username: state => state.user.username,
  nickname: state => {
    state.user.realname = Vue.ls.get(USER_INFO).realname;
    return state.user.realname
  },
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  permissionList: state => state.user.permissionList,
  userInfo: state => {
    state.user.info = Vue.ls.get(USER_INFO);
    return state.user.info
  },
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  isActionBreadcrumb: state => state.app.isActionBreadcrumb,
  lang: state => state.i18n.lang,
  sysClientType: state => {
    state.app.type = Vue.ls.get(SYS_CLIENT_TYPE)
    return state.app.type
  }
}

export default getters
