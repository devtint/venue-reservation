<template>
  <div class="changeDate">
    <div class="title">
      <h3>选择预约日期</h3>
    </div>
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" :show-confirm="false" @confirm="onConfirm" />
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      show: false,
      date: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    formatDate(date) {
      console.log(date)
      // 格式化日期
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm(date) {
      this.show = false
      this.date = this.formatDate(date)
    },
  },
}
</script>

<style scoped lang="less">
.title {
  margin: 1rem;
}
</style>
