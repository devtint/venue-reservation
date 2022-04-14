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

// (获取支付方式ID)queryPayTools
export const getPayTools = () => {
  return request({
    method: 'GET',
    url: '/search/queryPayTools',
  })
}

// (获取支付订单的信息)getPaySsnByBillNo
export const getPaySsnByBillNo = params => {
  return request({
    method: 'GET',
    url: '/createCard/getPaySsnByBillNo',
    params,
  })
}

// (获取微信支付参数)wxPay
export const getWxPay = params => {
  return request({
    method: 'GET',
    url: '/createCard/wxPay',
    params,
  })
}

// (支付成功回调)createCard/payed
export const setPayed = params => {
  return request({
    method: 'GET',
    url: '/createCard/payed',
    params,
  })
}

// (查询我的全部订单)queryMyAllOrdersBySport
export const getMyOrders = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyAllOrdersBySport',
    params,
  })
}

// (根据交易状态查询订单)queryMyOrdersPayStatusBySport
export const getMyOrdersByPayStatus = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyOrdersPayStatusBySport',
    params,
  })
}

// (查询已取消的订单)queryMyCancelledOrdersBySport
export const getMyOrdersCancelled = params => {
  return request({
    method: 'GET',
    url: '/search/queryMyCancelledOrdersBySport',
    params,
  })
}
