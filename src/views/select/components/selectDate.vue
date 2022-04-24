<template>
  <div class="changeDate">
    <div class="title">
      <h3>选择预约日期和场地</h3>
    </div>
    <van-cell :title="title" :value="date" @click="show = true">
      <template>
        <div class="date">
          <span>{{ date }}</span>
        </div>
      </template>
    </van-cell>
    <!-- 选择场地 -->
    <van-cell :title="siteTitle" :value="site" @click="selectSite">
      <template>
        <div class="date">
          <span>{{ site ? site : '请选择场地' }}</span>
        </div>
      </template>
    </van-cell>
    <!-- <van-field
      readonly
      clickable
      label="场地"
      :value="site"
      placeholder="选择场地"
      input-align="right"
      @click="showPicker = true"
    /> -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="siteConfirm"
      />
    </van-popup>
    <van-calendar v-model="show" :show-confirm="false" @confirm="onConfirm" />
  </div>
</template>

<script>
import { useHomeStore } from '@/store/home'
import { useOrderStore } from '@/store/order'
import { useAreaStore } from '@/store/area'
import { getSportsHallFields } from '@/api/area'
import { BASE_DOMAIN } from '@/global/config'
export default {
  name: '',
  components: {},
  emits: ['showSelectTime'],
  props: {},
  data() {
    return {
      show: false,
      title: '选择日期',
      siteTitle: '选择场地',
      date: '',
      site: '',
      showPicker: false,
      columns: [
        '1号场',
        '2号场',
        '3号场',
        '4号场',
        '5号场',
        '6号场',
        '7号场',
        '8号场',
        '9号场',
        '10号场',
        '11号场',
        '12号场',
      ],
    }
  },
  computed: {
    subscribeDate() {
      return useOrderStore().getSubscribeDate
    },
    currentArea() {
      return useAreaStore().getCurrentArea
    },
  },
  watch: {},
  created() {
    this.date = this.setDefaultDate()
    this.loadSportsHallFields()
    useAreaStore().setCurrentAreaSite('')
  },
  mounted() {},
  methods: {
    // 设置默认日期
    setDefaultDate() {
      // 默认今天
      let date = new Date()
      // 默认明天
      // date.setDate(date.getDate() + 1)

      const weekMap = ['日', '一', '二', '三', '四', '五', '六']
      const week = weekMap[date.getDay()]
      // 存储日期 pinia
      // 格式化日期20220910
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      // 判断日期如果是一位数,前面补0
      if (month < 10) {
        month = `0${month}`
      }
      if (day < 10) {
        day = `0${day}`
      }
      // 存储日期20220203 pinia
      let newDate = `${year}${month}${day}`
      useOrderStore().updateSubscribeDate(newDate)
      // 存储日期用于展示 2022年02月03日 pinia
      let newDateStr = `${year}年${month}月${day}日`
      useOrderStore().updateSubscribeDateShow(newDateStr)
      // 存储星期
      useOrderStore().updateSubscribeWeek(week)
      return `${year}年${month}月${day}日 周${week}`
    },
    formatDate(date) {
      console.log(date)
      // 格式化日期 星期
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      const weekMap = ['日', '一', '二', '三', '四', '五', '六']
      const week = weekMap[date.getDay()]
      console.log(date.getDay())

      // 存储日期20220203 pinia
      // 判断日期如果是一位数,前面补0
      if (month < 10) {
        month = `0${month}`
      }
      if (day < 10) {
        day = `0${day}`
      }
      let newDate = `${year}${month}${day}`
      useOrderStore().updateSubscribeDate(newDate)
      // 存储日期用于展示 2022年02月03日 pinia
      let newDateStr = `${year}年${month}月${day}日`
      useOrderStore().updateSubscribeDateShow(newDateStr)
      // 存储星期
      useOrderStore().updateSubscribeWeek(week)

      return `${year}年${month}月${day}日 周${week}`
      // return `${date.getFullYear()}-${
      //   date.getMonth() + 1
      // }-${date.getDate()} 星期${week}`
    },
    onConfirm(date) {
      this.show = false
      useOrderStore().updateSubscribeDate('')
      this.date = this.formatDate(date)
      this.title = '重新选择日期'
      console.log('onConfirm', this.subscribeDate)
    },
    siteConfirm(site) {
      this.site = site
      console.log('siteConfirm',site)
      useAreaStore().setCurrentAreaSite(site)
      this.siteTitle = '重新选择场地'
      this.showPicker = false
      // 渲染父组件的预约时间
      this.$emit('showSelectTime')
    },
    selectSite() {
      this.showPicker = true
    },
    loadSportsHallFields() {
      getSportsHallFields({
        venueName: useHomeStore().getCurrentSportHall.venueName,
        REALUSERNAME: window.localStorage.getItem('REALUSERNAME'),
      }).then(res => {
        if (res.data.rs !== '1') {
          console.log(res.data.rs)
        } else {
          console.log('querySportsHallFields', res.data.querySportsHallFields)
          let hallList = res.data.querySportsHallFields
          let columns = []
          this.newList = hallList.map(item => {
            if (item.siteFile) {
              item.siteFile = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${item.siteFile}`
            }
            if (item.siteType === this.currentArea.siteType) {
              columns = columns.concat(item.siteNumber)
            }
            return item
          })
          // this.newList = this.newList.concat(hallList)
          this.columns = columns
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
