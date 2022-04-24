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
              <van-card centered @click="selectVenue(item)">
                <template #title>
                  <div>
                    <div class="itemTitle van-ellipsis">
                      {{ item.venueName }}
                    </div>
                  </div>
                </template>
                <template #desc>
                  <div class="itemDesc van-ellipsis">
                    场地类型：{{ item.siteTypes }}
                  </div>
                  <div class="van-ellipsis">{{ item.address }}</div>
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

                <template #price>
                  <div>电话:{{ item.phone }}</div>
                </template>
                <template #num>
                  <!-- 场地距离 -->
                  <div>
                    <span><van-icon color="#fec864" name="location-o" /></span>
                    <span style="color: #fec864">{{ item.distance }}</span>
                    <span style="color: #ccc">km</span>
                  </div>
                  <!-- <van-button
                    type="primary"
                    size="small"
                    block
                    @click="selectVenue(item)"
                  >
                    预约
                  </van-button> -->
                </template>
              </van-card>
            </van-cell>
          </van-cell-group>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getSportsHalls } from '@/api/home'
import wx from 'weixin-js-sdk'
import { useHomeStore } from '@/store/home'
import { useMapStore } from '@/store/map'
import { BASE_DOMAIN } from '@/global/config'
// import { TMap } from '@/api/map'
export default {
  name: 'venueLists',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      newList: [],
      loading: false,
      finished: false,
      refreshing: false,
      distance: 0,

      // isDistance: false,
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
  created() {
    // this.initLocation()
  },
  mounted() {},
  methods: {
    initLocation() {
      // 微信获取当前位置
      console.log('initLocation:::')
    },
    // 计算到每个场馆的距离
    mapDistance(address, index) {
      wx.ready(() => {
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: res => {
            let latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
            let longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
            // let speed = res.speed // 速度，以米/每秒计
            // let accuracy = res.accuracy // 位置精度
            console.log('wx.getLocation', res)
            useMapStore().setCurrentLocation({
              latitude,
              longitude,
            })
            this.getLocation(address, index)
          },
        })
      })
    },
    // 根据地址获取经纬度
    getLocation(address, index) {
      let lat, lng
      let map = new TMap.service.Geocoder()
      let data = map.getLocation({
        address: `${address}`,
        // region: region,
      })
      data.then(res => {
        console.log(res)
        console.log(res.result.location)
        lat = res.result.location.lat
        lng = res.result.location.lng
        let latitude = useMapStore().getCurrentLocatin.latitude
        let longitude = useMapStore().getCurrentLocatin.longitude
        console.log('当前位置经纬度', latitude, longitude)
        this.getDistance(latitude, longitude, lat, lng, index)
      })
    },
    getDistance(cLat, cLng, tLat, tLng, index) {
      // 计算路径的实际距离
      // 当前位置 和 目标位置
      let currentLocation = new TMap.LatLng(cLat, cLng)
      let targetLocation = new TMap.LatLng(tLat, tLng)
      let path = [currentLocation, targetLocation]
      var distance = TMap.geometry.computeDistance(path)
      // var infoDom = document.getElementById('info');
      // infoDom.innerText = `腾讯北京总部到圆明园的直线距离为${distance.toFixed(2)}米`;
      console.log('计算距离:', (distance / 1000).toFixed(2) + 'km')
      this.list[index].distance = (distance / 1000).toFixed(2)
      // this.distance = (distance / 1000).toFixed(2)
      return (distance / 1000).toFixed(2)
    },
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
    selectVenue(item) {
      useHomeStore().setCurrentSportHall(item)
      this.$router.push('/venue')
    },
    loadSportsHalls() {
      getSportsHalls().then(res => {
        if (res.data.rs !== '1') {
          console.log(res.data.rs)
        } else {
          console.log('querySportsHalls', res.data.querySportsHalls)
          let hallList = res.data.querySportsHalls
          this.newList = hallList.map((item, index) => {
            if (item.venuePhoto) {
              item.venuePhoto = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.venuePhoto}`
            }
            if (item.address) {
              this.mapDistance(item.address, index)
            }
            return {
              ...item,
              distance: 0,
            }
          })
          // this.newList = this.newList.concat(hallList)
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
/deep/ .van-button {
  width: 4rem;
}
</style>
