const BASE_PREFIX = './nurse'
const LOCAL_BASE_API = '/nurse'
const DEV_BASE_API = BASE_PREFIX
const TEST_BASE_API = BASE_PREFIX
const PRO_BASE_API = BASE_PREFIX

const envConfig = {
  local: LOCAL_BASE_API,
  dev: DEV_BASE_API,
  test: TEST_BASE_API,
  prod: PRO_BASE_API
}

// export const WEBSOCKET_URL = 'https://aliiot.on-bright.com/mock/13/pro/websocket/{topic}'
// export const WEBSOCKET_URL = 'https://aliiot.on-bright.com/pro/websocket/{topic}'
export const WEBSOCKET_URL = 'http://192.168.200.125:8082/nurse/websocket/{topic}'

export function isProEnv () {
  return process.env.NODE_ENV === 'production'
}

export function isTestEnv () {
  return process.env.NODE_ENV === 'test'
}

export function isDevelopEnv () {
  return process.env.NODE_ENV === 'development'
}

// 接口请求基路径
export function getReqBaseUrl () {
  let reqUrl
  reqUrl = isProEnv() && envConfig.prod
  reqUrl = isTestEnv() && envConfig.test
  reqUrl = isDevelopEnv() && envConfig.dev
  reqUrl = reqUrl || envConfig.local
  console.log(reqUrl)
  return reqUrl
}

export default envConfig
