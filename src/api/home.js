// 《用户请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }

// 获取轮播图广告图片
export const getAdImages = () => {
  return request({
    method: 'GET',
    url: '/search/querySportsHallsBanner',
  })
}

// (查询租场通知)querySportsHallsNotice
export const getNotice = () => {
  return request({
    method: 'GET',
    url: '/search/querySportsHallsNotice',
  })
}

// (查询运动场馆列表)querySportsHalls
export const getSportsHalls = () => {
  return request({
    method: 'GET',
    url: '/search/querySportsHalls',
  })
}

// (根据搜索词查询运动场馆列表)querySportsHallsBySearch
export const searchSportsHalls = params => {
  return request({
    method: 'GET',
    url: '/search/querySportsHallsBySearch',
    params,
  })
}
