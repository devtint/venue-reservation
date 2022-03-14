<template>
  <div class="changeDate">
    <div class="title">
      <h3>选择预约日期</h3>
    </div>
    <van-cell :title="title" :value="date" @click="show = true">
      <template>
        <div class="date">
          <span>{{ date }}</span>
        </div>
      </template>
    </van-cell>
    <van-calendar v-model="show" :show-confirm="false" @confirm="onConfirm" />
  </div>
</template>

<script>
import { useOrderStore } from '@/store/order'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      show: false,
      title: '选择日期',
      date: '',
    }
  },
  computed: {
    subscribeDate() {
      return useOrderStore().getSubscribeDate
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    formatDate(date) {
      console.log(date)
      // 格式化日期 星期
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const weekMap = ['日', '一', '二', '三', '四', '五', '六']
      const week = weekMap[date.getDay()]

      // 存储日期 pinia
      let newDate = `${year}${month}${day}`
      useOrderStore().updateSubscribeDate(newDate)
      // 存储星期
      useOrderStore().updateSubscribeWeek(week)

      return `${year}年${month}月${day}日 星期${week}`
      // return `${date.getFullYear()}-${
      //   date.getMonth() + 1
      // }-${date.getDate()} 星期${week}`
    },
    onConfirm(date) {
      this.show = false
      this.date = this.formatDate(date)
      this.title = '重新选择日期'
      console.log('onConfirm', this.subscribeDate)
    },
  },
}
</script>

<style scoped lang="less">
.title {
  margin: 1rem;
}
.date {
  font-size: larger;
  color: #409eff;
}
</style>
