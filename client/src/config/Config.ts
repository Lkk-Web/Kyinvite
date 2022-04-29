const IS_DEBUG = true

// const HOME_PATH = IS_DEBUG ? 'http://127.0.0.1:20420/' : '' // 正式服
const HOME_PATH = IS_DEBUG ? 'http://127.0.0.1:8081/' : '' // 正式服

export default {
  IS_DEBUG,
  HOME_PATH,
  // SERVER_HOME: HOME_PATH + 'client/v1/',
  SERVER_HOME: HOME_PATH + 'auth/', //现阶段接口
  APPID: 'wx423d4cbbe814ed74',
}
