<template>
  <div class="selectTime">
    <div class="title">
      <h3>选择预约时间</h3>
    </div>
    <main>
      <van-grid :column-num="3" :gutter="10" clickable>
        <van-grid-item
          v-for="(value, index) in timeLists"
          :class="{ selected: value.selected, disabled: value.avaNum === '0' }"
          :key="index"
          @click="selectItem(value)"
        >
          <template #icon>
            <div class="time">
              <div>{{ value.timeSlot }}</div>
            </div>
          </template>
          <template #text>
            <div class="text">
              <div v-if="value.avaNum === '1'">
                {{ value.prdPrice !== '' ? '￥' + value.prdPrice : '免费' }}
              </div>
              <div v-else>已约满</div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </main>
  </div>
</template>

<script>
import { useOrderStore } from '@/store/order'
import { useAreaStore } from '@/store/area'
import { getSportSiteResInfo } from '@/api/area'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      timeLists: [],
    }
  },
  computed: {
    currentArea() {
      return useAreaStore().getCurrentArea
    },
    currentAreaSite() {
      return useAreaStore().getCurrentAreaSite
    },
    subscribeDate() {
      return useOrderStore().getSubscribeDate
    },
  },
  watch: {
    subscribeDate: {
      handler(newVal) {
        this.loadSportSiteResInfo()
      },
      // immediate: true,
    },
    currentAreaSite: {
      handler(newVal) {
        this.loadSportSiteResInfo()
      },
      // immediate: true,
    },
  },
  created() {
    console.log('选择时间组件创建')
    // this.loadSportSiteResInfo()
    // 清空已选择的时间段
    useOrderStore().updateSubscribeTimeSlot('')
  },
  mounted() {},
  methods: {
    selectItem(value) {
      if (value.avaNum === '0') {
        // 清除存储选择的时间段 pinia
        useOrderStore().updateSubscribeTimeSlot('')
        this.timeLists.forEach(item => {
          item.selected = false
        })
        return
      }
      console.log(value.timeSlot)
      // 存储选择的时间段 pinia
      useOrderStore().updateSubscribeTimeSlot(value.timeSlot)
      // 选择时间段变成选中样式
      this.timeLists.forEach(item => {
        if (item.prdNo === value.prdNo) {
          item.selected = true
        } else {
          item.selected = false
        }
      })
    },
    loadSportSiteResInfo() {
      // appoDate:20220322
      // venueName:天河体育中心体育场
      // siteType:篮球场
      // siteNumber:1号场
      // actNo:202112042249501338950598
      let param = {
        // appoDate: '20220322',
        appoDate: this.subscribeDate,
        venueName: this.currentArea.venueName,
        siteType: this.currentArea.siteType,
        siteNumber: this.currentAreaSite,
        actNo: this.currentArea.actNo,
      }
      getSportSiteResInfo(param).then(res => {
        if (res.data.rs !== '1') {
          console.log('获取场地预约信息失败', res.data.rs)
          return
        }
        this.timeLists = res.data.querySportsSiteInfor.map(item => {
          // 切割时间段信息 .之前的是时间段，之后的是场地类型
          if (item.timeSlot.indexOf('.') > -1) {
            let timeSlot = item.timeSlot.split('.')[0]
            let siteType = item.timeSlot.split('.')[1]

            return {
              ...item,
              timeSlot,
              siteType,
              selected: false,
            }
          } else {
            return {
              ...item,
              selected: false,
            }
          }
        })
        console.log(this.timeLists)
      })
    },
  },
}
</script>

<style scoped lang="less">
// .selectTime {
//   // height: 100%;
//   // background: #f7f7f7;
// }
.title {
  margin: 1rem;
}

.time {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 0.75rem;
}

.van-grid-item {
  height: 3rem;
}

.selected {
  /deep/ .van-grid-item__content {
    background: #409eff;
    color: #fff;
    .text {
      color: #fff;
    }
  }
}
.disabled {
  /deep/ .van-grid-item__content {
    background: #dfe3e7;
    color: rgb(77, 74, 74);
    .text {
      color: rgb(80, 76, 76);
    }
  }
}
</style>
