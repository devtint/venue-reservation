//src/store/order.js

import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
  id: 'order', // id必填，且需要唯一
  state: () => {
    return {
      // 预约日期
      subscribeDate: '20220314',
      // 预约日期用于展示
      subscribeDateShow: '2020年03月14日',
      // 预约星期
      subscribeWeek: '',
      // 预约时间段
      subscribeTimeSlot: '',
      // 订单信息
      orderInfo: {}
    }
  },
  getters: {
    // 获取预约日期
    getSubscribeDate: state => {
      return state.subscribeDate
    },
    // 获取预约日期用于展示
    getSubscribeDateShow: state => {
      return state.subscribeDateShow
    },
    // 获取预约星期
    getSubscribeWeek: state => {
      return state.subscribeWeek
    },
    // 获取预约时间段
    getSubscribeTimeSlot: state => {
      return state.subscribeTimeSlot
    },
    // 获取订单信息
    getOrderInfo: state => {
      return state.orderInfo
    }
  },
  actions: {
    // 更新预约日期
    updateSubscribeDate(date) {
      this.subscribeDate = date
    },
    // 更新预约日期用于展示
    updateSubscribeDateShow(date) {
      this.subscribeDateShow = date
    },
    // 更新预约星期
    updateSubscribeWeek(week) {
      this.subscribeWeek = week
    },
    // 更新预约时间段
    updateSubscribeTimeSlot(timeSlot) {
      this.subscribeTimeSlot = timeSlot
    },
    // 更新订单信息
    updateOrderInfo(orderInfo) {
      this.orderInfo = orderInfo
    }
    // // 异步actions
    // async login(account, pwd) {
    //   const { data } = await api.login(account, pwd)
    //   return data
    // },
  },
  // 开启数据缓存 数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key
  // 可以在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage
  persist: {
    enabled: true,
    // strategies: [
    //   {
    //     key: 'my_user',
    //     storage: localStorage,
    //     paths: ['name', 'age'], // 持久化部分的 state
    //   },
    // ],
  },
})
