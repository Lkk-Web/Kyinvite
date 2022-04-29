const IS_DEBUG = true

const HOME_PATH = IS_DEBUG ? 'http://127.0.0.1:20420/' : '' // 正式服

export default {
  IS_DEBUG,
  HOME_PATH,
  SERVER_HOME: HOME_PATH + 'client/v1/',
  APPID: 'wx423d4cbbe814ed74',
}
