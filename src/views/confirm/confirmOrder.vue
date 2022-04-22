<!-- 订单确认页面 -->
<template>
  <div class="confirmOrder">
    <div class="topNav">
      <van-nav-bar
        fixed
        placeholder
        title="订单确认"
        left-text=""
        right-text="规则说明"
        left-arrow
        @click-left="backPage"
        @click-right="toRules"
      />
    </div>
    <div class="orderInfo">
      <van-cell-group inset>
        <van-cell center>
          <van-card centered :thumb="currentArea.siteFile">
            <template #title>
              <div class="carName">{{ currentSportHall.venueName }}</div>
            </template>
            <template #desc>
              <div class="carDesc">
                {{ currentArea.siteType + ' ' + currentAreaSite }}
              </div>
            </template>
          </van-card>
        </van-cell>
        <van-cell title-class="lesseeTitle">
          <template #title>
            <div>
              <span><i class="verticalLine"></i> 预约信息</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div>
              <span>预约时间：</span>
            </div>
          </template>
          <template>
            <div>
              <div>{{ subscribeDateShow + ' ' + '周' + subscribeWeek }}</div>
              <div>{{ subscribeTimeSlot }}</div>
            </div>
          </template>
        </van-cell>
        <van-cell title="费用总计：">
          <template #default>
            <div>
              <!-- <span>￥{{ driverFeeShow }} x {{ dayToDay }} </span
              >&nbsp;&nbsp;&nbsp;&nbsp; -->
              <span class="totalPrice">￥{{ totalFee }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- <div class="lesseeInfo">
      <van-cell-group inset>
        <van-cell title-class="lesseeTitle">
          <template #title>
            <div>
              <span><i class="verticalLine"></i> 联系信息</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div>
              <span><van-icon size="1rem" name="friends-o" /> 联系人：</span>
            </div>
          </template>
          <template>
            <div>
              <div>张三</div>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div>
              <span><van-icon size="1rem" name="phone-o" /> 联系电话：</span>
            </div>
          </template>
          <template>
            <div>
              <div>13888888888</div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div> -->
    <div class="payMethod">
      <van-cell-group inset>
        <van-cell title-class="payTitle">
          <template #title>
            <div>
              <span><i class="verticalLine"></i> 支付方式</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div>
              <!-- <span v-if="tabName === '单位租'">月结</span> -->
              <span
                ><van-icon name="wechat-pay" color="#0ccf67" size="1.2rem" />
                微信支付</span
              >
            </div>
          </template>
          <template #extra>
            <div>
              <van-checkbox v-model="payChecked"></van-checkbox>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="costDescription">
      <van-cell-group inset>
        <van-cell title-class="payTitle">
          <template #title>
            <div>
              <span><i class="verticalLine"></i> 预定须知</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template #title>
            <div>
              <div>
                <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                1.预约后请及时到场，如因特殊情况不能及时到场，请及时取消订单；
              </div>
              <div>
                <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                2.在预约时间到达前6个小时可免费取消订单，超过则不可取消，谢谢理解！
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- <div style="height: 6rem"></div> -->
    <div class="confirmOrderBox">
      <van-submit-bar button-text="提交订单" @submit="orderSubmit">
      </van-submit-bar>
    </div>

    <!-- <div class="orderSuccess">
      <we-chat-pay :show="orderSuccessShow"></we-chat-pay>
    </div> -->
  </div>
</template>

<script>
// import { BASE_COMNAME } from '@/global/config'

import { useAreaStore } from '@/store/area'
import { useHomeStore } from '@/store/home'
import { useOrderStore } from '@/store/order'

import {
  getVenueReservationPrice,
  createSiteReservationOrder,
} from '@/api/order'

export default {
  name: 'confirmOrder',
  components: {},
  props: {},
  data() {
    return {
      payChecked: true,
      orderSuccessShow: false,
      totalFee: 0,
    }
  },
  computed: {
    currentSportHall() {
      return useHomeStore().getCurrentSportHall
    },
    currentArea() {
      return useAreaStore().getCurrentArea
    },
    currentAreaSite() {
      return useAreaStore().getCurrentAreaSite
    },
    subscribeDate() {
      return useOrderStore().getSubscribeDate
    },
    subscribeDateShow() {
      return useOrderStore().getSubscribeDateShow
    },
    subscribeWeek() {
      return useOrderStore().getSubscribeWeek
    },
    subscribeTimeSlot() {
      return useOrderStore().getSubscribeTimeSlot
    },
  },
  watch: {},
  created() {
    console.log('currentSportHall:', this.currentSportHall)
    console.log('currentArea:', this.currentArea)
    console.log('currentAreaSite:', this.currentAreaSite)
    console.log('subscribeDate:', this.subscribeDate)
    console.log('subscribeTimeSlot:', this.subscribeTimeSlot)

    this.getOrderPrice()
  },
  mounted() {},
  methods: {
    // 跳转到规则页面
    toRules() {
      this.$router.push('/rules')
    },
    backPage() {
      this.$router.back()
    },
    // 获取订单价格
    getOrderPrice() {
      // {
      //     "recName":{
      //         "transDate":"20220407",
      //         "actNo":"202112042249501338950598",
      //         "saleCmpName":"广州睿颢软件技术有限公司",
      //         "productName":"羽毛球场出租",
      //         "srlID":"天河体育中心体育场",
      //         "remark":""
      //     },
      //     "recList":[
      //         {
      //             "timeQuantum":"09:00-10:00",
      //             "posList":"1号场"
      //         }
      //     ]
      // }
      // 时间段09:00-10:00 转为090000-100000
      // let start = this.subscribeTimeSlot.split('-')[0]
      // let end = this.subscribeTimeSlot.split('-')[1]
      // start = start.split(':')[0] + start.split(':')[1] + '00'
      // end = end.split(':')[0] + end.split(':')[1] + '00'
      const params = {
        recName: {
          transDate: this.subscribeDate,
          actNo: this.currentArea.actNo,
          saleCmpName: window.localStorage.getItem('REALUSERNAME'),
          productName: this.currentArea.siteType + '出租',
          srlID: this.currentArea.venueName,
          remark: '',
        },
        recList: [
          {
            timeQuantum: this.subscribeTimeSlot,
            // timeQuantum: `${start}-${end}`,
            posList: this.currentAreaSite,
          },
        ],
      }
      console.log('params:', params)
      getVenueReservationPrice(params).then(res => {
        if (res.data.rs === '1') {
          console.log(res.data.rsInfo) // {"totalPrice":"160.00","totalDiscountPrice":"160.00"}
          let rsInfo = JSON.parse(res.data.rsInfo)
          this.totalFee = rsInfo.totalDiscountPrice
        } else {
          this.$toast(res.data.rs)
        }
      })
    },
    orderSubmit() {
      // 时间段09:00-10:00 转为090000-100000

      // let start = this.subscribeTimeSlot.split('-')[0]
      // let end = this.subscribeTimeSlot.split('-')[1]
      // start = start.split(':')[0] + start.split(':')[1] + '00'
      // end = end.split(':')[0] + end.split(':')[1] + '00'
      // 下单
      const params = {
        recName: {
          transDate: this.subscribeDate,
          actNo: this.currentArea.actNo,
          saleCmpName: window.localStorage.getItem('REALUSERNAME'),
          productName: this.currentArea.siteType + '出租',
          srlID: this.currentArea.venueName,
          remark: '',
        },
        recList: [
          {
            timeQuantum: this.subscribeTimeSlot,
            // timeQuantum: `${start}-${end}`,
            posList: this.currentAreaSite,
          },
        ],
      }
      console.log('params:', params)
      createSiteReservationOrder(params).then(res => {
        if (res.data.rs === '1') {
          // console.log(res.data.rsInfo) // {"totalPrice":"160.00","totalDiscountPrice":"160.00"}
          let rsInfo = JSON.parse(res.data.rsInfo)
          // this.totalFee = rsInfo.totalDiscountPrice
          console.log('rsInfo:', rsInfo)
          // 存储订单信息(用于支付)
          let orderInfo = {
            billNo: rsInfo.billNo,
            totalAmt: rsInfo.totalAmt,
          }
          useOrderStore().updateOrderInfo(orderInfo)
          // 提示下单成功
          // this.$toast('下单成功')

          // 下单成功界面
          this.$router.push('/over')
          // this.orderSuccessShow = true
        } else {
          this.$toast(res.data.rs)
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.verticalLine {
  // 左侧垂直居中
  position: absolute;
  left: 0.3rem;
  top: 25%;
  width: 0.2rem;
  height: 50%;
  background: #f97f04;
}
.confirmOrder {
  background: #f6f6f8;
}

.topNav {
  padding-bottom: 0.5rem;
}
.useCarTime {
  display: flex;
  height: 1rem;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  /deep/ .van-cell {
    padding: 0;
  }
  .dayinTotal {
    flex: 1;
    font-size: 0.5rem;
    .dayinTotalNum {
      color: #f97f04;
      background: #fef2e2;
      padding: 0 0.5rem;
    }
  }

  .timeText {
    font-size: 0.8rem;
    color: #565656;
  }
}
.van-card {
  background-color: #fff;
  padding: 0;
}
.tagChecks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  font-size: small;
}
.orderInfo {
  padding-bottom: 0.5rem;
  .carName {
    font-size: 1.1rem;
    color: #333131;
    padding: 0.5rem 0;
    margin-left: 1rem;
    font-weight: 600;
  }
  .carDesc {
    font-size: 1rem;
    color: #565656;
    padding: 0.5rem 0;
    margin-left: 1rem;
  }
}
.lesseeInfo {
  padding-bottom: 0.5rem;
  .lesseeTitle {
    font-weight: 600;
    color: #565656;
  }
}
.van-cell__value {
  .totalPrice {
    color: #fec760;
    font-size: 1.2rem;
  }
}
.rentalCost {
  padding-bottom: 0.5rem;
  .costTitle {
    font-weight: 600;
    color: #565656;
  }
}

.payMethod {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.payTitle {
  font-weight: 600;
  color: #565656;
}
</style>
