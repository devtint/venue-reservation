<template>
  <div class="detailCard">
    <van-card>
      <template #thumb>
        <div class="thumb">
          <van-image
            width="5rem"
            height="5rem"
            fit="contain"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </template>
      <template #title>
        <h3 class="van-multi-ellipsis">1号篮球场</h3>
      </template>
      <template #desc>
        <h3 class="van-multi-ellipsis--l2">
          位于场馆左侧，可用于比赛、练习、大众健身等，欢迎预定。
        </h3>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less"></style>
