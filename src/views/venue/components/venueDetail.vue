<template>
  <div>
    <!-- 卡片样式包裹 -->
    <div class="card">
      <div class="header">
        <div class="title">
          <div>{{ currentSportHall.venueName }}</div>
        </div>
        <div class="location">
          <span><van-icon name="guide-o" /></span>
          <span>导航</span>
        </div>
      </div>

      <main>
        <!-- 联系电话：0776-3820298
      场馆地址：德保县城关镇南隆大街84号
      开放时间：每日7：00-22：30，特殊情况除外
      预约规则：预约到场时间6个小时前可免费取消订单；之后不可取消订单，请按时处理。 -->
        <p>
          <van-icon name="phone-o" />联系电话：<span>{{
            currentSportHall.phone
          }}</span>
        </p>
        <p>
          <van-icon name="location-o" />场馆地址：<span>{{
            currentSportHall.address
          }}</span>
        </p>
        <p>
          <van-icon name="clock-o" />开放时间：<span
            >每日{{ currentSportHall.openTime }}，特殊情况除外</span
          >
        </p>
        <p>
          <van-icon name="apps-o" />预约规则：<span
            >预约到场时间6个小时前可免费取消订单；之后不可取消订单，请按时处理。</span
          >
        </p>
      </main>
    </div>
  </div>
</template>

<script>
import { useHomeStore } from '@/store/home'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    currentSportHall() {
      return useHomeStore().getCurrentSportHall
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
// 卡片样式
.card {
  padding: 0.5rem;
  margin: 0.3rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.1rem 0.2rem rgba(104, 102, 102, 0.1);
}
.header {
  display: flex;
  // 标题居中
  .title {
    flex: 1;
    text-align: center;
    margin-left: 5rem;
  }
  // 右上角导航
  .location {
    display: flex;
    justify-items: center;
    align-items: center;
    margin-left: auto;
    padding: 0.2rem 0 0.5rem;
    margin-right: 1rem;
    height: 100%;
    .van-icon {
      font-size: 20px;
      color: #999;
    }
    .van-icon-name {
      font-size: 20px;
      color: #999;
    }
  }
}

main {
  padding: 0 1rem;
  font-size: small;
  p {
    margin-bottom: 0.5rem;
    span {
      color: rgb(5, 4, 4);
    }
  }
}
</style>
