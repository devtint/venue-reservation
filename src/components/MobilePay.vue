<template>
  <div class="weChatPay">
    <van-popup
      v-model="show"
      :style="{ height: '45%' }"
      get-container="body"
      round
      position="bottom"
      safe-area-inset-bottom
    >
      <div class="orderWeChatPay">
        <!-- 订单标题 -->
        <div class="orderTitle">惠运动预约订单</div>
        <!-- 订单号 -->
        <div class="billNo">
          {{ orderInfo.billNo }}
        </div>
        <!-- 支付价格 -->
        <div class="payPrice">
          ￥<span>{{ orderInfo.totalAmt }}</span>
        </div>
        <!-- 收款方 -->
        <div class="Payee">
          <van-cell-group>
            <van-cell size="large" title="收款方" :value="payeeName" />
          </van-cell-group>
        </div>
        <!-- 立即支付按钮 -->
        <div class="pay">
          <van-button
            type="primary"
            color="#05c25e"
            block
            @click="weChatPay"
            :disabled="isDisabled"
            >立即支付</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getPayTools, getPaySsnByBillNo, getWxPay, setPayed } from '@/api/order'
import { useOrderStore } from '@/store/order'

import wx from 'weixin-js-sdk'
export default {
  name: 'weChatPay',
  components: {},
  props: {
  },
  data() {
    return {
      show: false,
      time: 30 * 60 * 1000,
      // 支付信息
      payInfo: {},
      wxPayData: {},
      sub_mch_id: '',
      mch_id: '',
      paySsn: '',
      // 收款方
      payeeName: '',
      isDisabled: true,
    }
  },
  computed: {
    orderInfo() {
      return useOrderStore().getOrderInfo
    },
  },
  watch: {
    // show(val) {
    //   if (val === true) {
    //     this.loadPayTools()
    //   }
    // },
  },
  created() {
    // 获取支付方式
    console.log('created', this.showPay)
  },
  mounted() {},
  methods: {
    showPopup(payeeName) {
      this.payeeName = payeeName
      this.show = true
      this.loadPayTools()
    },
    toOrders() {
      this.$router.push('/orders')
    },
    loadPayTools() {
      getPayTools().then(res => {
        console.log(res.data.queryPayTools)
        if (res.data.rs !== '1') {
          console.log('获取支付方式失败', res.data.rs)
          return
        }
        // PAYTOOLID: "1128-20180420103743-00009022-0452"
        // companyName: "深圳市腾讯计算机系统有限公司"
        // iconFileName: ""
        // payToolNum: "weixin"
        // payer: "微信支付"
        // payerName: "微信支付"

        //获取微信的支付方式
        const weChatPay = res.data.queryPayTools.filter(item => {
          return item.payer === '微信支付'
        })
        // 获取订单信息
        console.log(this.orderInfo)
        let billNo = this.orderInfo.billNo
        let price = this.orderInfo.totalAmt
        this.payInfo = {
          billNo,
          reqPaidAmt: price,
          paytoolid: weChatPay[0].PAYTOOLID,
          // payToolNum: weChatPay[0].payToolNum,
          payer: weChatPay[0].payer,
          // payerName: weChatPay[0].payerName,
        }
        this.loadPayInfo(this.payInfo)
        console.log('weChatPay', this.payInfo)
      })
    },
    loadPayInfo(params) {
      getPaySsnByBillNo(params).then(res => {
        console.log('payInfo', res)
        console.log('payInfo', res.data)
        let payData = res.data
        this.paySsn = payData.paySsn

        let wxPayData = {
          paySsn: payData.paySsn,
          payDate: payData.payDate,
          totalAmt: payData.totalAmt,
          // totalAmt: '0.01',
          payer: this.payInfo.payer,
          paidAmtEBag: '0',
          billNo: payData.billNo,
          goodsName: '场地预约',
          number: '1',
          appid: payData.appid,
          mch_id: payData.mch_id,
          sub_mch_id: payData.sub_mch_id,
          sub_appid: payData.sub_appid,
          type: 'buy',
        }
        getWxPay(wxPayData).then(res => {
          if (res.status === 200) {
            console.log('getWxPay', res.data)
            this.wxPayData = res.data
            this.isDisabled = false
          } else {
            console.log('获取getWxPay失败', res)
          }
        })
      })
    },
    onBridgeReady() {
      // const payData = this.wxPayData
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: this.wxPayData.appId, //公众号ID，由商户传入
          timeStamp: this.wxPayData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: this.wxPayData.nonceStr, // 支付签名随机串，不长于 32 位
          package: this.wxPayData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: this.wxPayData.signType, // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
          paySign: this.wxPayData.sign, // 支付签名
        },
        res => {
          console.log('支付res', res)
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。

            // paySsn:2204121235369008
            // price:0.01
            // billNo:14752204111005524531
            // payer:微信支付
            // goodsName:
            // sub_mch_id:
            // mch_id:1491531702
            let payed = {
              paySsn: this.paySsn,
              price: this.payInfo.reqPaidAmt,
              billNo: this.payInfo.billNo,
              payer: this.payInfo.payer,
              goodsName: '场地预约',
              sub_mch_id: '',
              mch_id: this.wxPayData.mch_id,
            }
            console.log('payed', payed)
            setPayed(payed).then(res => {
              console.log('payed', res)
              if (res.data.rs === '1') {
                console.log('支付成功')
                this.$router.push('/orders')
                // this.paySuccess()
                // this.$toast('支付成功')
              }
            })
          }
        }
      )
    },
    weChatPay() {
      console.log('weChatPay')
      if (typeof WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
        }
      } else {
        this.onBridgeReady()
        this.show = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.weChatPay {
  display: flex;
  justify-content: center;
  align-items: center;
}
.orderTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
.billNo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.payPrice {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  span {
    font-size: 2.5rem;
  }
}
.Payee {
  margin-bottom: 1rem;
}
.pay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 0.1rem;
  // width: 90%;
  .van-button {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    margin-top: 1rem;
  }
}
</style>
