<template>
  <div class="SwipeAd">
    <van-cell-group inset>
      <!-- <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in adImagesLink" :key="index">
          <a :href="image.linkAddress ? image.linkAddress : '#'">
            <van-image fit="scale-down" :src="image.picFile" />
          </a>
        </van-swipe-item>
      </van-swipe> -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </van-cell-group>
  </div>
</template>

<script>
import { BASE_DOMAIN } from '@/global/config'
import { getAdImages } from '@/api/home'
export default {
  name: 'SwipeAd',
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
    // 获取轮播图图片
    // getAdImages()
    //   .then(res => {
    //     if (res.data.rs !== '1') {
    //       console.log(res.data.rs)
    //       return false
    //     }
    //     let adImages = res.data.queryCarRentalADImg
    //     console.log(adImages)
    //     this.adImagesLink = adImages.map(item => {
    //       if (item.picFile) {
    //         item.picFile = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.picFile}`
    //       }
    //       return item
    //     })
    //     console.log('this.adImagesLink:', this.adImagesLink)
    //     // 广告图片链接 存入vuex
    //     // this.setAdImagesLink(this.adImagesLink)
    //     this.isLoading = false
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.SwipeAd {
  padding: 0.7rem 0;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
