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
// (查询场馆场地类型)querySportsHallFieldsType
export const getSportsHallFieldsType = params => {
  return request({
    method: 'GET',
    url: '/search/querySportsHallFieldsType',
    params,
  })
}

// (查询场地预约信息)querySportsSiteInfor
export const getSportSiteResInfo = params => {
  return request({
    method: 'GET',
    url: '/search/querySportsSiteInfor',
    params,
  })
}
