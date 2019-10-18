export default {
  timeout: 60000,
  appName: '利华仓储管理',
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
  tokenKey: 'Authorization',
  tokenCookieExpires: 1
}
