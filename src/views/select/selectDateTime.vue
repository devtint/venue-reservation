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
  </div>
</template>

<script>
import detailCard from './components/detailCard.vue'
import selectDate from './components/selectDate.vue'
import selectTime from './components/selectTime.vue'
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
</style>
