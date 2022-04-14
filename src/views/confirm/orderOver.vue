<template>
  <div class="orderOver">
    <van-popup v-model="orderOverShow" style="width: 100%; height: 100%">
      <div class="orderSuccessContainer">
        <van-nav-bar
          fixed
          placeholder
          right-text="完成"
          @click-right="toOrders"
        />
        <van-icon name="checked" color="#fec760" size="50" />
        <p>下单成功</p>
        <p style="font-size: small; color: #bcbcbc">
          请按时到达场地，如行程有变，请在规定时间取消订单
        </p>
        <p style="font-size: small; color: #bcbcbc" class="countDown">
          <span class="countDownSpan">请及时支付订单，超时自动取消</span>
          <span>
            <van-count-down :time="time">
              <template #default="timeData">
                <!-- <span class="block">{{ timeData.hours }}</span> -->
                <!-- <span class="colon">:</span> -->
                <span class="block">({{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }})</span>
              </template>
            </van-count-down>
          </span>
        </p>
        <!-- <template class="btnBox">
            <van-button
              block
              color="#fec760"
              style="width: 90%; margin-top: 3rem"
              to="orders"
              >查看订单</van-button
            >
          </template> -->
        <template>
          <div class="btnBox1">
            <van-button block type="default" to="orders">查看订单</van-button>
            <van-button block color="#fec760" @click="goPay">去支付</van-button>
          </div>
        </template>
      </div>
    </van-popup>
    <div class="orderSuccess">
      <mobile-pay ref="mobilePayShow"></mobile-pay>
    </div>
  </div>
</template>

<script>

import MobilePay from '@/components/MobilePay.vue'

export default {
  name: 'orderOver',
  components: {
    MobilePay,
  },
  props: [],
  data() {
    return {
      orderOverShow: true,
      time: 30 * 60 * 1000,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toOrders() {
      this.$router.push('/orders')
    },
    goPay() {
      this.$refs.mobilePayShow.showPopup()
    },
  },
}
</script>

<style scoped lang="less">
.orderSuccessContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -10rem;
  height: 100%;
  padding: 0.5rem;
  .btnBox1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;

    .van-button {
      width: 45%;
      margin-top: 3rem;

      // margin-left: 0.5rem;
    }
  }
  .countDown {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .countDownSpan {
      margin-right: 0.5rem;
    }
  }
  .block,
  .colon {
    font-size: small;
    color: #bcbcbc;
  }
}
</style>
