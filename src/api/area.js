// 《请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }

// (查询场馆场地列表)querySportsHallFields
export const getSportsHallFields = params => {
  return request({
    method: 'GET',
    url: '/search/querySportsHallFields',
    params,
  })
}
