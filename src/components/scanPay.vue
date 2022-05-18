<template>
  <div class="scanPay">
    <div class="myNavBar">
      <van-nav-bar left-text="向商家付款" left-arrow @click-left="goIndex" />
      <div class="businessesInfo">
        <!-- 商家头像 -->
        <div class="businessesFace">
          <!-- <van-image
            round
            width="7rem"
            height="7rem"
            fit="cover"
            :src="picFile"
          /> -->
          <img class="faceImg" :src="picFile" alt="" />
        </div>
        <div class="businessesName">{{ companyName }}</div>
      </div>
      <div class="payBox">
        <div class="payTitle">
          <p>付款金额</p>
          <van-field v-model="payMoney" type="number" size="large" autofocus>
            <template #label>
              <span class="rmb">￥</span>
            </template>
          </van-field>
        </div>
        <div class="payBtn">
          <van-button type="primary" color="#23d96e" block @click="goPay">
            立即支付
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryVenueInfo,
  createOfflineOrder,
  getPayTools,
  getWxPay,
  setPayed,
  getPaySsnByBillNo,
} from '@/api/order'
import { BASE_DOMAIN } from '@/global/config'
export default {
  name: 'scanPay',
  components: {},
  props: {},
  data() {
    return {
      venueNo: '',
      actNo: '',
      companyName: '',
      picFile: '',
      prdNo: '',
      payMoney: '',

      // 支付信息
      payInfo: {},
      billNo: '',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.venueNo = this.$route.params.venueID
    this.getVenueInfo()
  },
  mounted() {},
  methods: {
    toastLoading(flag) {
      if (flag === 'show') {
        const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '请求支付中...',
      })
      } else {
        this.$toast.clear()
      }
      
    },
    goIndex() {
      console.log('goIndex')
      this.$router.push({
        path: '/',
      })
      // this.$router.go(-1)
    },
    async getVenueInfo() {
      const res = await queryVenueInfo({
        venueNo: this.venueNo,
      }).then(res => {
        return res
      })

      if (res.data.rs !== '1') {
        return
      }
      let info = res.data.queryOfflineActInforByVenue[0]
      this.actNo = info.actNo
      this.companyName = info.companyName
      this.picFile = `${BASE_DOMAIN}/socketServer/images/cardMall/imgsrc/${info.picFile}`
      this.prdNo = info.prdNo

      console.log('getVenueInfo', this.companyName)
      console.log('getVenueInfo', this.picFile)
    },
    goPay() {
      console.log('goPay')
      this.createOrder()
    },
    createOrder() {
      // srlIDForEngine: Splenwise微信预约点餐系统
      // busiNameForEngine: 运动场地出租业务
      // busiFunNameForEngine: 创建线下订单
      // miniProcNameForEngine: 创建线下订单
      // totalAmount: 3.5
      // venueNo: 1496 - 20220512173507 - 00085083 - 2230
      // TELLERCOMPANY: 广州睿颢软件技术有限公司
      // REALUSERNAME: 广州睿颢软件技术有限公司
      // REALTERMTYPE: 微信预约点餐公众号
      // TERMID: 桂林科友微信预约点餐WEB端服务系统
      let data = {
        srlIDForEngine: 'Splenwise微信预约点餐系统',
        busiNameForEngine: '运动场地出租业务',
        busiFunNameForEngine: '创建线下订单',
        miniProcNameForEngine: '创建线下订单',
        totalAmount: this.payMoney,
        venueNo: this.venueNo,
        prdNo: this.prdNo,
        TELLERCOMPANY: '广州睿颢软件技术有限公司',
        REALUSERNAME: '广州睿颢软件技术有限公司',
        REALTERMTYPE: '微信预约点餐公众号',
        TERMID: '桂林科友微信预约点餐WEB端服务系统',
      }
      console.log('createOrder data', data)
      createOfflineOrder(data).then(res => {
        if (res.data.rs === '1') {
          let rsInfo = JSON.parse(res.data.rsInfo)
          this.billNo = rsInfo.SERVICELOGSSN
          console.log('createOrder res', rsInfo.SERVICELOGSSN)
          this.toastLoading('show')

          this.loadPayTools()
        } else {
          console.log('createOrder', res.data.rs)
        }
      })
    },
    loadPayTools() {
      getPayTools().then(res => {
        console.log('getPayTools res', res.data.queryPayTools)
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
          return item.payToolNum === 'weixin'
        })
        // 获取订单信息
        // console.log(this.orderInfo)
        let billNo = this.billNo
        let price = this.payMoney
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


        this.toastLoading('end')
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
            
            // 微信支付
            this.weChatPay()
            // this.isDisabled = false
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
                this.$router.push('/')
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
        // this.show = false
      }
    },
  },
}
</script>

<style scoped lang="less">
.businessesInfo div {
  // 居中
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  .faceImg {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
  }
}
.payBox {
  margin-top: 1.5rem;
  .payTitle {
    margin-top: 1rem;
    p {
      font-size: 1.2rem;
      margin: 1rem;
      color: #333;
    }
    .rmb {
      font-size: 2.5rem;
    }
    /deep/ .van-cell-large {
      padding: 1.5rem;
    }
    /deep/ .van-field__label {
      width: 3.5rem;
      line-height: 3rem;
    }
    /deep/ .van-field__body {
      font-size: 2.5rem;
    }
  }
}
.payBtn {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
