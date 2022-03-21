<template>
  <div class="home">
    <div class="home-header">
      <van-nav-bar left-text="惠保投资">
        <template #right>
          <!-- 定位 -->
          <div class="home-header-location">
            当前位置： <a class="city">广州市</a>
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
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadSilenceLogin()
  },
  mounted() {},
  methods: {
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
          storage.setItem('token', global_.token)
          storage.setItem('openid', global_.openid)
          storage.setItem('guestMemberID', global_.userName)
          storage.setItem('appid', appid)
          storage.setItem('TELLERCOMPANY', res.data.TELLERCOMPANY)
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

<style scoped lang="less"></style>
