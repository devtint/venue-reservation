<template>
  <div class="selectTime">
    <van-nav-bar title="预约时间选择" left-arrow @click-left="goBack" />

    <!-- 场地详情卡片 -->
    <div class="detail-card">
      <detail-card />
    </div>

    <!-- 选择预约日期 -->
    <div class="selectDate">
      <select-date />
    </div>

    <!-- 选择预约时间 -->
    <div class="selectTime">
      <select-time />
    </div>

    <!-- 预约按钮 确定时间 -->
    <div class="submit">
      <van-button type="primary" @click="submit" block>确定时间</van-button>
    </div>

    <!-- 温馨提示 -->
    <!-- 温馨提示： 1.预约后请及时到场，如因特殊情况不能及时到场，请及时取消订单；
    2.在预约时间到达前6个小时可免费取消订单，超过则不可取消，谢谢理解！ -->
    <div class="tips">
      <div class="tipsTitle">温馨提示:</div>
      <div class="tipsContent">
        <div>
          1.预约后请及时到场，如因特殊情况不能及时到场，请及时取消订单；
        </div>
        <div>
          2.在预约时间到达前6个小时可免费取消订单，超过则不可取消，谢谢理解！
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailCard from './components/detailCard.vue'
import selectDate from './components/selectDate.vue'
import selectTime from './components/selectTime.vue'

import { useOrderStore } from '@/store/order'
export default {
  name: 'selectDateTime',
  components: {
    detailCard,
    selectDate,
    selectTime,
  },
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
    submit() {
      console.log('submit')
      const {
        getSubscribeDate: selectDate,
        getSubscribeWeek: selectWeek,
        getSubscribeTimeSlot: selectTimeSlot,
      } = useOrderStore()

      console.log(selectDate, selectWeek, selectTimeSlot)
      this.$router.push('/confirm')
    },
  },
}
</script>

<style scoped lang="less">
.submit {
  width: 95%;
  display: flex;
  justify-content: center;
  margin: 1rem auto;
}
.tips {
  .tipsTitle {
    // font-size: smaller;
    margin: 1rem;
  }
  .tipsContent {
    margin: 1rem;
    font-size: smaller;
  }
}
</style>
