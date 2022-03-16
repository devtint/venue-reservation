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
