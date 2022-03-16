<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getAdImages } from '@/api/home'
import { silenceLogin } from '@/api/user'
export default {
  name: 'orderRules',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {
    // this.login()
    //     REALUSERNAME:广州睿颢软件技术有限公司
    // REALTERMTYPE:微信预约点餐公众号
    // appid:wx24b187addab6fbae
    // code:071UsWll2hoMv84w4mml2ptteY0UsWlG
    silenceLogin({
      REALUSERNAME: '广州睿颢软件技术有限公司',
      REALTERMTYPE: '微信预约点餐公众号',
      appid: 'wx24b187addab6fbae',
      code: '071UsWll2hoMv84w4mml2ptteY0UsWlG',
    }).then(res => {
      this.loadADImg()
      if (res.data.rs === '1') {
        console.log(res.data)
      } else {
        console.log(res.data.rs)
      }
    })
  },
  mounted() {},
  methods: {
    loadADImg() {
      // 获取轮播图图片
      getAdImages()
        .then(res => {
          if (res.data.rs !== '1') {
            console.log(res.data.rs)
            return false
          }
          let adImages = res.data.queryCarRentalADImg
          console.log(adImages)
          this.adImagesLink = adImages.map(item => {
            if (item.picFile) {
              item.picFile = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.picFile}`
            }
            return item
          })
          console.log('this.adImagesLink:', this.adImagesLink)
          // 广告图片链接 存入vuex
          // this.setAdImagesLink(this.adImagesLink)
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less"></style>
