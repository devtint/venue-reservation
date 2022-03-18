<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getAdImages } from '@/api/home'
import { silenceLogin } from '@/api/user'
import { BASE_DOMAIN } from '@/global/config'
export default {
  name: 'orderRules',
  components: {},
  props: {},
  data() {
    return {
      adImagesLink: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.login()
    //     REALUSERNAME:广州睿颢软件技术有限公司
    // REALTERMTYPE:微信预约点餐公众号
    // appid:wx24b187addab6fbae
    // code:071UsWll2hoMv84w4mml2ptteY0UsWlG
    // silenceLogin({
    //   REALUSERNAME: '广州睿颢软件技术有限公司',
    //   REALTERMTYPE: '微信预约点餐公众号',
    //   appid: 'wx24b187addab6fbae',
    //   code: '071UsWll2hoMv84w4mml2ptteY0UsWlG',
    // }).then(res => {
    //   console.log(res)
    //   // this.loadADImg()
    //   if (res.data.rs === '1') {
    //     console.log(res.data)
    //   } else {
    //     console.log('rs', res.data.rs)
    //   }
    // })
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less"></style>
