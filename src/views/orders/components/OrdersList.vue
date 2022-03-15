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
            <!-- <van-grid-item v-for="item in list" :key="item"> -->
            <van-grid-item>
              <div class="orderItem">
                <div class="useStatus">
                  <span
                    >体育中心<van-tag color="#f4f4f4" text-color="#adadad"
                      >1号羽毛球场</van-tag
                    ></span
                  >
                  <!-- <span
                    :class="{
                      statusShow: item.tradeStatus === '2',
                      defaultStatusShow: item.tradeStatus !== '2',
                    }"
                    >{{
                      item.tradeStatus !== '2' ? item.orderStatusShow : '已取消'
                    }}</span
                  > -->
                  <span>已取消</span>
                </div>
                <div class="orderInfo">
                  <!-- <p>订单编号 : {{ item.billNo }}</p> -->
                  <p>下单时间 : 2022-02-01 16:34:45</p>
                  <p>订单编号 : 163023495883</p>
                  <p>预约日期 : 2022-02-02 周二</p>
                  <p>预约时间 : 10:00-11:00</p>
                  <p>联系人 : 王五</p>
                  <p>联系电话 : 18611112233</p>
                  <!-- <div class="orderBtn" v-if="item.tradeStatus !== '2'">
                    <template
                      v-if="
                        item.orderStatusShow !== '已提车' &&
                        item.orderStatusShow !== '已还车'
                      "
                    >
                      <van-button
                        class="cancelOrder"
                        size="small"
                        type="warning"
                        @click="cancelOrder(item)"
                        >取消订单</van-button
                      >
                    </template>
                    <template v-if="item.driver">
                      <van-button
                        class="checkDriver"
                        size="small"
                        type="primary"
                        @click="checkDriver(item)"
                        >查看司机</van-button
                      >
                    </template>
                    <template v-if="item.orderStatusShow === '已还车'">
                      <van-button
                        class="feeDetailed"
                        size="small"
                        type="primary"
                        @click="feeDetailed(item)"
                        >费用明细</van-button
                      >
                    </template>
                  </div> -->
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
        <div style="height: 3rem"></div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
// import {
//   getNotOutOrder,
//   getAllOrder,
//   setCancelOrder,
//   getOrderFeeDetailed,
// } from '@/api/order'
import { BASE_COMNAME } from '@/global/config'
// import moment from 'moment'
export default {
  name: 'OrdersList',
  components: {},
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
    }
  },
  computed: {},
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
        let memberID = window.localStorage.getItem('memberID')
        if (memberID) {
          if (this.thisTab === '0') {
            this.loadAllOrder()
          } else {
            this.loadNotOutOrder()
          }
        } else {
          // this.$router.push('/login')
          // 提示登录过期,跳转到登录页面
          this.$toast('登录过期,请重新登录')
          // 加载状态结束
          this.loading = false
          // 数据全部加载完成
          // if (this.totalNum.length) {
          this.finished = true
          // }
        }
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
    // 查看司机
    checkDriver(item) {
      this.showDescription = true
      this.descriptionText = '当前指派的司机详情'
      this.actions = [
        {
          name: '司机姓名：' + item.driver,
        },
        {
          name: '联系方式：' + item.driverMobile,
        },
      ]
    },
    // 费用明细
    feeDetailed(item) {
      this.showDescription = true
      this.descriptionText = '所有费用明细'
      // 费用计算清单：基础租车费、司机费用、超百公里费用、过路费、其它费用，总计费用。
      getOrderFeeDetailed({
        billNo: item.billNo,
      }).then(res => {
        if (res.data.rs === '1') {
          let data = res.data.queryMyCarOrderCostDtl
          this.actions = []
          data.forEach(item => {
            this.actions.push({
              name: item.srlID + '：' + item.costTotal,
            })
          })
        } else {
          this.$toast(res.data.rs)
        }
      })
    },
    loadAllOrder() {
      getAllOrder({
        currentPage: this.page,
        numOfPerPage: this.pageSize,
      }).then(res => {
        console.log('获取全部订单', res)
        this.list = this.list.concat(res.data.queryMyAllCarOrders)
        this.totalNum = res.data.queryMyAllCarOrders_totalRecNum

        console.log('orders(全部) list', this.list, 'page:', this.page)
        this.loading = false
        this.finished =
          this.list.length >= res.data.queryMyAllCarOrders_totalRecNum
      })
    },
    loadNotOutOrder() {
      getNotOutOrder({
        currentPage: this.page,
        numOfPerPage: this.pageSize,
      }).then(res => {
        this.list = this.list.concat(res.data.queryMyCarOrdersOfNoTravel)
        this.totalNum = res.data.queryMyCarOrdersOfNoTravel_totalRecNum
        console.log('orders(未出行) list', this.list, 'page:', this.page)
        this.loading = false
        this.finished =
          this.list.length >= res.data.queryMyCarOrdersOfNoTravel_totalRecNum
      })
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
