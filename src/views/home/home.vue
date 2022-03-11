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
      <SwipeAd />
    </div>
    <div class="home-content">
      <!-- 通告栏 -->
      <div class="home-content-notice">
        <van-notice-bar left-icon="volume-o" :text="noticeBarText" />
      </div>
      <!-- 搜索 -->
      <div class="home-content-search">
        <searchVenue />
      </div>
      <!-- 场馆列表 -->
      <div class="home-content-venue">
        <venueLists />
      </div>
    </div>
  </div>
</template>

<script>
import SwipeAd from '@/components/SwipeAd.vue'
import searchVenue from './components/searchVenue.vue'
import venueLists from './components/venueLists.vue'
export default {
  name: 'home',
  components: { SwipeAd, searchVenue, venueLists },
  props: {},
  data() {
    return {
      noticeBarText:
        '德保运行场馆上线啦！线上提前预约，再也不用担心没有场地了！',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less"></style>
