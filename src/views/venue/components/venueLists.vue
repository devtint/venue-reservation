<template>
  <div>
    <div class="title">
      <h3>场地选择</h3>
    </div>
    <!-- 场地列表 -->
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
                <template #thumb>
                  <div class="thumb">
                    <van-image
                      width="5rem"
                      height="5rem"
                      fit="contain"
                      :src="item.siteFile"
                    />
                  </div>
                </template>
                <template #title>
                  <div class="itemTitle van-ellipsis">
                    {{ item.siteType + ' ' + item.siteNumber }}
                  </div>
                </template>

                <template #desc>
                  <div class="van-ellipsis--l2">
                    {{ item.siteRemark }}
                  </div>
                </template>
              </van-card>
              <template #right-icon>
                <div class="resBtn">
                  <van-button
                    type="primary"
                    size="small"
                    block
                    @click="selectTime(item)"
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
import { getSportsHallFields } from '@/api/area'
import { useHomeStore } from '@/store/home'
import { useAreaStore } from '@/store/area'
import { BASE_DOMAIN } from '@/global/config'
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

        this.loadSportsHallFields()
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
    loadSportsHallFields() {
      getSportsHallFields({
        venueName: useHomeStore().getCurrentSportHall.venueName,
      }).then(res => {
        if (res.data.rs !== '1') {
          console.log(res.data.rs)
        } else {
          console.log('querySportsHallFields', res.data.querySportsHallFields)
          let hallList = res.data.querySportsHallFields
          this.newList = hallList.map(item => {
            if (item.siteFile) {
              item.siteFile = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.siteFile}`
            }
            return item
          })
          // this.newList = this.newList.concat(hallList)

          // useHomeStore().setSportsHalls(this.newList)
          // this.list = this.sportsHalls
          this.list = this.newList

          console.log('list', this.list)
          if (
            this.list.length >=
            parseInt(res.data.querySportsHallFields_totalRecNum)
          ) {
            this.finished = true
          }

          this.loading = false
        }
      })
    },
    selectTime(item) {
      useAreaStore().setCurrentArea(item)
      this.$router.push('/select')
    },
  },
}
</script>

<style lang="less" scoped>
h3 {
  margin: 0.5rem 1.5rem 0;
}
.thumb {
  margin-left: -1rem;
}

.resBtn .van-button {
  width: 4rem;
  margin-right: -1rem;
}
</style>
