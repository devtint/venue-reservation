<template>
  <div class="FooterTabbar">
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">惠租车</van-tabbar-item>
      <van-tabbar-item icon="orders-o" dot>订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar> -->
    <!-- 路由模式 -->
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">惠运动</van-tabbar-item>
      <van-tabbar-item replace to="/orders" icon="orders-o"
        >订单</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'FooterTabbar',
  components: {},
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

<style scoped lang="less"></style>
