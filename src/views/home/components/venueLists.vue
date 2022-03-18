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
            <van-cell center v-for="(item, index) in list" :key="index">
              <van-card centered>
                <template #title>
                  <div>
                    <div class="itemTitle van-multi-ellipsis">
                      {{ item.venueName }}
                    </div>
                  </div>
                </template>
                <template #desc>
                  <div class="itemDesc van-multi-ellipsis">
                    场地类型：{{ item.siteTypes }}
                  </div>
                </template>
                <template #thumb>
                  <div class="thumb">
                    <van-image
                      width="6rem"
                      height="6rem"
                      fit="contain"
                      :src="item.venuePhoto"
                    />
                  </div>
                </template>

                <template #tags>
                  <div>
                    <div class="van-ellipsis">{{ item.address }}</div>
                    <div>电话:{{ item.phone }}</div>
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
import { getSportsHalls } from '@/api/home'

import { useHomeStore } from '@/store/home'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      newList: [],
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  computed: {
    sportsHalls() {
      return useHomeStore().getSportsHalls
    },
  },
  watch: {
    sportsHalls(newValue, oldValue) {
      console.log('newValue', newValue)
      this.list = newValue
    },
  },
  created() {},
  mounted() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.newList = []
          this.refreshing = false
        }

        this.loadSportsHalls()

        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1)
        // }
        // this.loading = false

        // if (this.list.length >= 40) {
        //   this.finished = true
        // }
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
    loadSportsHalls() {
      getSportsHalls().then(res => {
        if (res.data.rs !== '1') {
          console.log(res.data.rs)
        } else {
          console.log('querySportsHalls', res.data.querySportsHalls)
          let hallList = res.data.querySportsHalls
          this.newList = this.newList.concat(hallList)

          useHomeStore().setSportsHalls(this.newList)
          this.list = this.sportsHalls

          console.log('list', this.list)
          if (
            this.list.length >= parseInt(res.data.querySportsHalls_totalRecNum)
          ) {
            this.finished = true
          }

          this.loading = false
        }
      })
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
