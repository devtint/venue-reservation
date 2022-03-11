<template>
  <div>
    <div class="title">
      <h3>场馆列表</h3>
    </div>
    <div class="lists">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell-group inset>
            <van-cell center>
              <van-card
                centered
                desc="场地类型:排球场、篮球场"
                title="德保体育中心"
              >
                <template #thumb>
                  <div class="thumb">
                    <van-image
                      width="6rem"
                      height="6rem"
                      fit="contain"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                  </div>
                </template>

                <template #tags>
                  <div>
                    <div class="van-ellipsis">荣盛街与荣盛街二巷交叉路口</div>
                    <div>电话:0776-3806789</div>
                  </div>
                </template>
              </van-card>
              <template #right-icon>
                <div>
                  <!-- 场地距离 -->
                  <div>
                    <span><van-icon name="location-o" /></span>
                    <span>1.2km</span>
                  </div>
                  <van-button
                    type="primary"
                    size="small"
                    block
                    @click="changeVenue"
                  >
                    预约
                  </van-button>
                </div>
              </template>
            </van-cell>
          </van-cell-group>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    changeVenue() {
      this.$router.push('/venue')
    },
  },
}
</script>

<style lang="less" scoped>
h3 {
  margin: 0.5rem 1.5rem;
}
.thumb {
  margin-left: -1rem;
}
</style>
