<template>
  <div>
    <div class="header">
      <van-nav-bar title="场地选择" left-arrow @click-left="goBack">
        <template #right>
          <!-- 定位 -->
          <div class="home-header-location">
            <a class="city">广州市</a>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <!-- 场馆详情 -->
    <div class="venue-detail">
      <venue-detail />
    </div>

    <!-- 场地列表 -->
    <div class="venue-lists">
      <venue-lists />
    </div>
  </div>
</template>

<script>
import venueDetail from './components/venueDetail.vue'
import venueLists from './components/venueLists.vue'
export default {
  name: '',
  components: { venueDetail, venueLists },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped></style>
