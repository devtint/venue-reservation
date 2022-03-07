// 《用户请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }
// 静默登录
export const silenceLogin = params => {
  return request({
    method: 'GET',
    url: '/currencyLogin/login',
    params,
  })
}
// 检查登录状态
export const checkLogin = () => {
  return request({
    method: 'GET',
    url: '/app/checkLogin',
  })
}
// 登录
export const loginOfAccount = params => {
  return request({
    method: 'POST',
    url: '/app/apploginByAccount',
    data: params,
  })
}
// 退出登录
// export const setLogout = () => {
//   return request({
//     method: 'GET',
//     url: '/app/appLogout',
//   })
// }
