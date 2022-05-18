<template>
  <div class="home">
    <div class="home-header">
      <van-nav-bar>
        <template #left>
          <!-- 定位 -->
          <div class="home-header-location">
            当前位置： <a class="city">{{ currentCity }}</a>
          </div>
        </template>
        <template #right>
          <!-- 扫一扫 -->
          <div class="home-header-scan" @click="scanMain">
            <van-icon name="scan" color="#fed17e" size="1.2rem" /> 扫一扫
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="home-swipe">
      <!-- <SwipeAd :adImagesLink="adImagesLink" /> -->
      <SwipeAd v-if="isLogin"></SwipeAd>
    </div>
    <!-- 通告栏 -->
    <div class="home-content">
      <div class="home-content-notice">
        <van-notice-bar left-icon="volume-o" :text="noticeBarText" />
      </div>
      <!-- 搜索 -->
      <div class="home-content-search">
        <searchVenue v-if="isLogin"></searchVenue>
      </div>
      <!-- 场馆列表 -->
      <div class="home-content-venue">
        <venueLists v-if="isLogin"></venueLists>
      </div>
    </div>
  </div>
</template>

<script>
import SwipeAd from '@/components/SwipeAd.vue'
import searchVenue from './components/searchVenue.vue'
import venueLists from './components/venueLists.vue'

import { getNotice } from '@/api/home'
import { silenceLogin } from '@/api/user'

import { useMapStore } from '@/store/map'
import wx from 'weixin-js-sdk'
// import { BASE_DOMAIN } from '@/global/config'
/* 引入config文件模块 */
import global_ from '@/global/config_global'
export default {
  name: 'home',
  components: { SwipeAd, searchVenue, venueLists },
  props: {},
  data() {
    return {
      // 登录后才进行渲染组件
      isLogin: false,
      noticeBarText: '',
      currentCity: '', // 当前城市
    }
  },
  computed: {
    // currentCity() {
    //   return useMapStore().getCurrentCity
    // },
  },
  watch: {},
  created() {
    this.loadSilenceLogin()
  },
  mounted() {
    this.$nextTick(function () {
      // 代码保证 this.$el 在 document 中
      wx.ready(() => {
        console.log('wx.ready 开始')
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: res => {
            let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
            // let speed = res.speed // 速度，以米/每秒计
            // let accuracy = res.accuracy // 位置精度
            // 通过获取的经纬度获取地址-城市(city) 使用腾讯地图API
            // 根据经纬度解析地址
            let map = new TMap.service.Geocoder()
            let data = map.getAddress({
              // location	TMap.LatLng	是	经纬度（GCJ02坐标系）
              location: new TMap.LatLng(latitude, longitude),
            })
            data.then(res => {
              console.log(res)
              console.log('当前城市', res.result.address_component.city)
              // useMapStore().setCurrentCity(res.result.address_component.city)
              this.currentCity = res.result.address_component.city
              console.log('当前城市this.currentCity', this.currentCity)
            })
          },
        })
      })
    })
  },
  methods: {
    scanMain() {
      console.log('扫一扫')
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          var result = res.resultStr // 当needResult 为 1 时，扫码返回的结果
          console.log('扫码结果', result)
          // 分号分割
          let resultArr = result.split(';')
          let srlID = resultArr[0]
          let venueID = resultArr[1]
          console.log('srlID', srlID)
          console.log('venueID', venueID)
          this.$router.push({
            name: 'scanPay',
            params: {
              srlID: srlID,
              venueID: venueID,
              result: result,
            },
          })
        },
      })
    },
    loadSilenceLogin() {
      console.log('login:::')
      // this.dataLoading = true
      let storage = window.localStorage
      let param = decodeURI(location.search)
      if (param == '') {
        let redirect =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          storage.getItem('appid') +
          '&redirect_uri=http%3A%2F%2F' +
          global_.domain +
          '%2f' +
          global_.clientName +
          '%3fappid%3d' +
          storage.getItem('appid') +
          '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        window.location.href = redirect
        console.log('redirect:::' + redirect)
        return
      } else {
        storage.setItem('codeAppID', param)
      }
      let code = ''
      let appid = ''
      let REALTERMTYPE = ''
      let REALUSERNAME = ''
      console.log('param::' + param)
      if (param.indexOf('appid') != -1) {
        let params = param.split('&')
        params.forEach((item, index, err) => {
          if (item.indexOf('appid') != -1) {
            appid = item.substring(item.indexOf('=') + 1)
          }
          if (item.indexOf('REALTERMTYPE') != -1) {
            REALTERMTYPE = item.substring(item.indexOf('=') + 1)
          }
          if (item.indexOf('REALUSERNAME') != -1) {
            REALUSERNAME = item.substring(item.indexOf('=') + 1)
          }
          if (item.indexOf('code') != -1) {
            code = item.substring(item.indexOf('=') + 1)
          }
        })
        storage.setItem('appid', appid)

        console.log('appid::' + appid)
        console.log('code::' + code)
        console.log('REALTERMTYPE::' + REALTERMTYPE)
        console.log('REALUSERNAME::' + REALUSERNAME)

        storage.setItem('REALUSERNAME', REALUSERNAME)
      }
      if (appid.length < 18) {
        // 解决分享过来时获取不到appid的问题,从分享登录时存入sessionStorage中重新获取
        appid = storage.getItem('appid')
      }
      window.localStorage.removeItem('user')
      silenceLogin({
        code: code,
        appid: appid,
        REALTERMTYPE: REALTERMTYPE,
        REALUSERNAME: REALUSERNAME,
      }).then(res => {
        // console.log('res:::', res)
        console.log('res.data:::', res.data)
        this.isLogin = true
        let rs = JSON.stringify(res.data)
        if (rs.indexOf('-11419') != -1) {
          // 则是没有注册
          that.regSchool('广西德保县惠保投资发展有限公司')
        } else {
          let userName = res.data.userName
          // that.$toast('欢迎您，' + userName)
          global_.token = res.data.token.token
          global_.userName = userName
          global_.openid = res.data.openid
          global_.TELLERCOMPANY = res.data.TELLERCOMPANY
          appid = res.data.appid
          /* --当刷新页面导致token不存在时,使用sessionStorage中的token-- */
          storage.setItem('token', res.data.token.token)
          storage.setItem('openid', res.data.openid)
          storage.setItem('guestMemberID', res.data.userName)
          storage.setItem('appid', res.data.appid)
          storage.setItem('TELLERCOMPANY', res.data.TELLERCOMPANY)
          storage.setItem('user', JSON.stringify(res.data))
          storage.setItem('userName', res.data.nickname)
          storage.setItem('userIcon', res.data.usrIcon)
          this.schoolName = storage.getItem('TELLERCOMPANY')

          this.wxConfig()

          this.loadNotice()
        }
      })
    },
    loadNotice() {
      getNotice().then(res => {
        if (res.data.rs !== '1') {
          console.log(res.data.rs)
        } else {
          this.noticeBarText = res.data.querySportsHallsNotice[0].content
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.home-header-scan {
  font-size: 1rem;
}
</style>
