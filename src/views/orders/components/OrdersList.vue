<template>
  <div class="OrdersList">
    <!-- description 展示描述信息 -->
    <van-action-sheet
      v-model="showDescription"
      :actions="actions"
      cancel-text="关闭"
      :description="descriptionText"
      close-on-click-action
      get-container="body"
    />
    <div class="orderList">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-grid :gutter="15" :column-num="1">
            <van-grid-item v-for="item in list" :key="item">
              <!-- <van-grid-item> -->
              <div class="orderItem">
                <div class="useStatus">
                  <span
                    >{{ item.venueName }}
                    <!-- <van-tag color="#f4f4f4" text-color="#adadad">{{
                      item.siteType + ' ' + item.siteNum
                    }}</van-tag> -->
                  </span>
                  <!-- <span
                    :class="{
                      statusShow: item.tradeStatus === '2',
                      defaultStatusShow: item.tradeStatus !== '2',
                    }"
                    >{{
                      item.tradeStatus !== '2' ? item.orderStatusShow : '已取消'
                    }}</span
                  > -->
                  <span>{{
                    item.payStatus === '3' ? '已支付' : '待付款'
                  }}</span>
                </div>
                <div class="orderInfo">
                  <p>
                    <!-- 预约场地 : {{ siteOF(item.siteType) + ' ' + item.siteNum }} -->
                    预约场地 : {{ item.siteType + ' ' + item.siteNum }}
                  </p>
                  <p>下单时间 : {{ item.transDate + ' ' + item.transTime }}</p>
                  <p>订单编号 : {{ item.billNo }}</p>
                  <p>预约日期 : {{ item.siteUseDateBegin }}</p>
                  <p>
                    预约时间 :
                    {{ item.siteUseBeginTime + '-' + item.siteUseEndTime }}
                  </p>
                  <p>订单金额 : ￥{{ item.totalPrice }}</p>
                  <div class="orderBtn">
                    <template>
                      <van-button
                        class="navigation"
                        size="small"
                        color="#409eff"
                        @click="navigation(item)"
                        >地图导航</van-button
                      >
                      <van-button
                        class="weChatPay"
                        size="small"
                        color="#409eff"
                        @click="goPay(item)"
                        v-if="item.payStatus !== '3'"
                        >去支付</van-button
                      >
                      <van-button
                        class="cancelOrder"
                        size="small"
                        color="#a6a9ad"
                        @click="cancelOrder(item)"
                        v-if="item.orderStatus !== '2'"
                        >取消订单</van-button
                      >
                    </template>
                  </div>
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
        <div style="height: 3rem"></div>
      </van-pull-refresh>
    </div>
    <div class="orderSuccess">
      <!-- <WeChatPay ref="orderPayShow"></WeChatPay> -->
      <!-- <we-chat-pay ref="orderPayShow"></we-chat-pay> -->
      <mobile-pay ref="mobilePayShow"></mobile-pay>
      <!-- <mobile-pay :show="mobilePayShow"></mobile-pay> -->
    </div>
  </div>
</template>

<script>
import {
  getMyOrders,
  getMyOrdersByPayStatus,
  getMyOrdersCancelled,
} from '@/api/order'
import { BASE_COMNAME } from '@/global/config'
import wx from 'weixin-js-sdk'

import { useOrderStore } from '@/store/order'

import MobilePay from '@/components/MobilePay.vue'
// import moment from 'moment'
export default {
  name: 'OrdersList',
  components: {
    MobilePay,
  },
  props: ['thisTab'],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 0, // 当前页码
      pageSize: 10, // 每页条数
      totalNum: 0, // 总条数

      showDescription: false, // 是否展示描述信息
      descriptionText: '', // 描述信息
      actions: [], // 描述信息

      // orderPayShow: false, // 是否展示支付信息
    }
  },
  computed: {
    siteOF(item) {
      if (item.indexOf('出租')) {
        // 去掉'出租'
        return item.replace('出租', '')
      }
      return item
    },
  },
  watch: {
    $router() {
      this.onRefresh()
    },
  },
  created() {
    // this.checklogin()
  },
  mounted() {
    // console.log('首次 mounted', this.thisTab)
    // this.onLoad()
  },
  methods: {
    onLoad() {
      console.log('onLoad')
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.loading = true
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        this.page++
        // console.log('this.thisTab', this.thisTab)
        // 判断有没有登录过期
        // let memberID = window.localStorage.getItem('memberID')
        // if (memberID) {
        if (this.thisTab === '0') {
          this.loadAllOrder()
        } else if (this.thisTab === '3') {
          this.loadOrderByCancelled()
        } else {
          if (this.thisTab === '1') {
            this.loadOrderByPayStatus('0')
          } else {
            this.loadOrderByPayStatus('3')
          }
        }
        // } else {
        // this.$router.push('/login')
        // 提示登录过期,跳转到登录页面
        // this.$toast('登录过期,请重新登录')
        // // 加载状态结束
        // this.loading = false
        // // 数据全部加载完成
        // // if (this.totalNum.length) {
        // this.finished = true
        // }
        // }
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1)
        // }
        // 加载状态结束
        // this.loading = false
        // // 数据全部加载完成
        // if (this.totalNum.length) {
        //   this.finished = true
        // }
      }, 800)
    },
    onRefresh() {
      // 清空列表数据
      this.list = []
      this.finished = false
      this.page = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    // 导航
    navigation(item) {
      this.$toast('正在跳转导航...')
      // 根据地址获取经纬度
      let region = item.city
      let address = item.address
      let venueName = item.venueName
      // let region = '广州市'
      // let address = '天河路299号'
      // let venueName = '天河体育中心体育场'
      let map = new TMap.service.Geocoder()
      let data = map.getLocation({
        address: `${region}${address}`,
        // region: region,
      })
      data.then(res => {
        console.log(res)
        console.log(res.result.location)
        let latitude = res.result.location.lat
        let longitude = res.result.location.lng
        console.log('当前位置经纬度', latitude, longitude)
        // this.openMap(latitude,longitude,item.venueName,item.address)
        this.openMap(latitude, longitude, venueName, address)
      })
    },
    // 打开地图
    openMap(lat, lng, title, address) {
      wx.openLocation({
        latitude: lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: lng, // 经度，浮点数，范围为180 ~ -180。
        name: title, // 位置名
        address: address, // 地址详情说明
        scale: 16, // 地图缩放级别,整型值,范围从1~28。默认为最大
        infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
        success(res) {
          console.log('打开地图成功')
          console.log(res)
        },
        fail(err) {
          console.log('打开地图失败')
          console.log(err)
        },
      })
    },
    // 取消订单
    cancelOrder(item) {
      // 格式化当前时间
      let cancelDate = moment().format('YYYYMMDD')
      let cancelTime = moment().format('HHmmss')
      console.log('cancelDate', cancelDate)
      console.log('cancelTime', cancelTime)
      let params = {
        srlIDForEngine: 'Splenwise微信预约点餐系统',
        busiNameForEngine: '汽车租赁业务',
        busiFunNameForEngine: '取消租车订单',
        miniProcNameForEngine: '取消租车订单',
        saleCmpName: BASE_COMNAME,
        driver: item.driver ? item.driver : '',
        carSender: '',
        carReceiver: '',
        carID: item.carID ? item.carID : '',
        billNo: item.billNo,
        cancelDate: cancelDate,
        cancelTime: cancelTime,
        remark: '',
      }
      console.log('取消订单参数', params)
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定取消订单吗？',
        })
        .then(() => {
          setCancelOrder(params).then(res => {
            if (res.data.rs === '1') {
              this.onRefresh()
              this.$toast('取消订单成功')
            } else {
              this.$toast(res.data.rs)
            }
          })
        })
    },
    loadAllOrder() {
      getMyOrders({
        currentPage: this.page,
        numOfPerPage: this.pageSize,
      }).then(res => {
        if (res.data.rs !== '1') {
          console.log('获取订单失败', res.data.rs)
          return
        }
        console.log('获取全部订单', res)
        this.list = this.list.concat(res.data.queryMyAllOrdersBySport)
        this.totalNum = res.data.queryMyAllOrdersBySport_totalRecNum

        this.loading = false
        console.log('orders(全部) list', this.list, 'page:', this.page)
        this.finished =
          this.list.length >= res.data.queryMyAllOrdersBySport_totalRecNum
      })
    },
    loadOrderByPayStatus(i) {
      getMyOrdersByPayStatus({
        currentPage: this.page,
        numOfPerPage: this.pageSize,
        payStatus: i,
      }).then(res => {
        if (res.data.rs !== '1') {
          console.log('根据交易状态获取订单失败', res.data.rs)
          return
        }
        this.list = this.list.concat(res.data.queryMyOrdersPayStatusBySport)
        this.totalNum = res.data.queryMyOrdersPayStatusBySport_totalRecNum
        console.log(
          'orders(根据交易状态) list',
          'payStatus:',
          i,
          this.list,
          'page:',
          this.page
        )
        this.loading = false
        this.finished =
          this.list.length >= res.data.queryMyOrdersPayStatusBySport_totalRecNum
      })
    },
    loadOrderByCancelled() {
      getMyOrdersCancelled({
        currentPage: this.page,
        numOfPerPage: this.pageSize,
        // payStatus: this.payStatus,
      }).then(res => {
        if (res.data.rs !== '1') {
          console.log('获取已取消订单失败', res.data.rs)
          return
        }
        this.list = this.list.concat(res.data.queryMyCancelledOrdersBySport)
        this.totalNum = res.data.queryMyCancelledOrdersBySport_totalRecNum
        console.log('orders(已取消) list', this.list, 'page:', this.page)
        this.loading = false
        this.finished =
          this.list.length >= res.data.queryMyCancelledOrdersBySport_totalRecNum
      })
    },
    goPay(item) {
      console.log('去支付', item)
      let orderInfo = {
        billNo: item.billNo,
        totalAmt: item.totalPrice,
      }
      useOrderStore().updateOrderInfo(orderInfo)
      // console.log('goPay',this.$refs.orderPayShow)
      this.$refs.mobilePayShow.showPopup()
      // this.mobilePayShow = true
    },
  },
}
</script>

<style scoped lang="less">
.orderList {
  padding-top: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.orderItem {
  width: 95%;
  // height: 8rem;
}
.useStatus {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.orderInfo {
  font-size: small;
  color: #6f6f6f;
  line-height: 0.5rem;
  .orderBtn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /deep/ .van-button {
      margin-left: 0.5rem;
    }
  }
}
.statusShow {
  font-size: small;
  color: #6f6f6f;
}
.defaultStatusShow {
  font-size: small;
}
</style>
