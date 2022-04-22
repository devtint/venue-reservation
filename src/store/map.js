//src/store/map.js

import { defineStore } from 'pinia'

export const useMapStore = defineStore({
  id: 'map', // id必填，且需要唯一
  state: () => {
    return {
      currentLocation: {
        latitude: '',
        longitude: '',
      }, // 当前位置经纬度
      mapLocation: {},
      // currentCity: '',
    }
  },
  getters: {
    getCurrentLocatin: state => {
      return state.currentLocation
    },
    getMapLocation: state => {
      return state.mapLocation
    },
    // getCurrentCity: state => {
    //   return state.currentCity
    // },
  },
  actions: {
    setCurrentLocation(payload) {
      this.currentLocation = payload
    },
    setMapLocation(payload) {
      this.mapLocation = payload
    },
    // setCurrentCity(payload) {
    //   this.currentCity = payload
    // },
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
    strategies: [
      {
        key: 'currentLocation',
        storage: sessionStorage,
        paths: ['currentLocation', 'mapLocation'], // 持久化部分的 state
      },
    ],
  },
})
