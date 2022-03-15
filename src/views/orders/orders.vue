<!-- 订单页面 -->
<template>
  <div class="orders">
    <div class="topNav">
      <van-nav-bar title="惠运动订单" fixed placeholder />
    </div>
    <div class="tabs">
      <van-tabs v-model="active" swipeable animated sticky offset-top="2rem">
        <van-tab title="全部">
          <orders-list this-tab="0"></orders-list>
        </van-tab>
        <van-tab title="待付款">
          <orders-list this-tab="1"></orders-list>
        </van-tab>
        <van-tab title="已预约">
          <orders-list this-tab="2"></orders-list>
        </van-tab>
        <van-tab title="已取消">
          <orders-list this-tab="3"></orders-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import OrdersList from './components/OrdersList.vue'

export default {
  name: 'orders',
  components: {
    OrdersList,
  },
  props: {},
  data() {
    return {
      active: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.orders {
  background-color: #f9f9f9;
}
.van-cell {
  padding: 1rem;
}
</style>
