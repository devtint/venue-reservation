// 《请求模块》
// 加载 request 模块
import { request } from '@/utils'
// export const hello = () => {
//   return requestHello({
//     method: 'GET',
//     url: '/hello/hello'
//   })
// }

// (查询价格)btnCalcVenueReservationPrice
export const getVenueReservationPrice = data => {
  return request({
    method: 'POST',
    url: '/insertRecReturn/btnCalcVenueReservationPrice',
    data,
  })
}

// (创建订单)btnSubmitSiteReservationOrder
export const createSiteReservationOrder = data => {
  return request({
    method: 'POST',
    url: '/insertRecReturn/btnSubmitSiteReservationOrder',
    data,
  })
}
