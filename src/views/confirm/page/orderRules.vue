<template>
  <div class="orderRules">
    <div class="nav">
      <van-nav-bar title="规则说明" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="tabs">
      <!-- <van-tabs v-model="active" sticky> -->
      <!-- <van-tab title="订单取消规则"> -->
      <h4>订单取消规则</h4>
      <div class="cancelRules">
        <!-- 1.计划有变？
        *预约后请及时到场，如因特殊情况不能及时到场，请及时取消订单；
        2.取消规则
        *在预约时间到达前6个小时可免费取消订单，超过则不可取消，谢谢理解！
        3.联系我们
        *其它未尽之事，如有需要，请联系：0776-xXXXX -->
        <div class="cancelRulesContent">
          <div>1.计划有变？</div>
          <div class="value">
            *预约后请及时到场，如因特殊情况不能及时到场，请及时取消订单；
          </div>
          <div>2.取消规则</div>
          <div class="value">
            *在预约时间到达前6个小时可免费取消订单，超过则不可取消，谢谢理解！
          </div>
          <div class="value">3.联系我们</div>
          <div>*其它未尽之事，如有需要，请联系：0776-xXXXX</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderRules',
  components: {},
  props: {},
  data() {
    return {
      active: 0,
      tbody: [
        {
          title: '日租订单',
          content1: '免费取消',
          content2: '免费取消',
          content3: '',
        },
        {
          title: '套餐订单',
          content1: '免费取消',
          content2: '取消违约金:',
          content3: '30%',
        },
        {
          title: '上门送车订单',
          content1: '免费取消',
          content2: '取消违约金:',
          content3: '30%',
        },
        {
          title: '节假日订单',
          content1: '节假日订单具体规则',
          content2: '以节假日公示规则为准',
          content3: '',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="less">
.thead {
  /deep/ .van-grid-item__content--center {
    background: #f6f6f6;
  }
}
h4 {
  font-size: 18px;
  color: #333;
  margin: 1rem;
}
.cancelRulesContent {
  margin: 1rem;
  // font-size: 0.28rem;
  color: #666;
  .value {
    margin-bottom: 0.5rem;
  }
}
</style>
