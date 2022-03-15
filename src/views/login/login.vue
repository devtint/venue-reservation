<!-- 登录页面 -->
<template>
  <div class="login">
    <div class="loginBox">
      <div class="topNav">
        <van-nav-bar
          title=""
          left-arrow
          @click-left="backPage"
          @click-right="toRegister"
        >
          <template #right>
            <div class="register">
              <a>注册</a>
            </div>
          </template>
        </van-nav-bar>
      </div>
      <div class="logoBox">
        <van-image
          width="10rem"
          height="4rem"
          fit="contain"
          :src="require('./logo.jpg')"
        />
      </div>
      <main>
        <van-form @submit="checkInfo">
          <van-field
            v-model="username"
            name="账号"
            label="账号"
            placeholder="请输入账号"
            clearable
            :rules="unameRules"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入密码"
            clearable
            :rules="pwdRules"
          />
          <p class="unPassword"><a>忘记密码？</a></p>
          <div style="margin: 16px">
            <van-button block type="info" color="#ffc65f" native-type="submit"
              >登录</van-button
            >
          </div>
          <p
            class="toPersonalLogin"
            v-if="tabName === '单位租'"
            @click="changePersonal"
          >
            我是个人用户 <van-icon name="sort" />
          </p>
          <p
            class="toPersonalLogin"
            v-if="tabName === '个人租'"
            @click="changeCompany"
          >
            我是单位用户 <van-icon name="sort" />
          </p>
        </van-form>
      </main>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
// import { mapGetters, mapMutations } from 'vuex'
import global_ from '@/global/config_global'
// import { loginOfAccount } from '@/api/user'

export default {
  name: 'login',
  components: {
    [Dialog.name]: Dialog,
  },
  props: {},
  data() {
    return {
      username: '',
      password: '',
      unameRules: [
        {
          required: true,
          message: '请输入账号',
        },
        // {
        //   // 自定义校验规则
        //   validator: value => {
        //     return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
        //       value
        //     )
        //   },
        //   message: '请输入正确格式的手机号码',
        //   trigger: 'onBlur',
        // },
      ],
      pwdRules: [
        {
          required: true,
          message: '请输入密码',
        },
        {
          // 自定义校验规则
          validator: value => {
            return /^[a-zA-Z0-9_]{6,16}$/.test(value)
          },
          message: '请输入正确格式的密码',
          trigger: 'onBlur',
        },
      ],
    }
  },
  computed: {
    // ...mapGetters({
    //   // 将store中的数据映射到当前组件的data中
    //   tabName: 'getTabName',
    // }),
  },
  watch: {},
  created() {
    let storage = window.localStorage
    this.token = storage.getItem('token')
    this.appid = storage.getItem('appid')
    this.show = true
    this.getCookie()
    this.getPK()
  },
  mounted() {},
  methods: {
    // ...mapMutations({
    //   // 将store中的方法映射到当前组件的methods中
    //   setTabName: 'setTabName',
    // }),
    backPage() {
      this.$router.back()
    },
    toRegister() {
      this.$router.push('/register')
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    changePersonal() {
      // this.setTabName('个人租')
      // this.$router.push('/personalLogin')
    },
    changeCompany() {
      // this.setTabName('单位租')
      // this.$router.push('/companyLogin')
    },

    checkInfo() {
      // if (this.$store.getters.getTabName !== '单位租') {
      //   this.$toast('个人租暂未开放,敬请期待')
      //   this.setTabName('单位租')
      //   return false
      // }
      if (this.username == '') {
        // Toast.fail('请输入账号')
        return false
      }
      if (this.password == '') {
        // Toast.fail('请输入密码')
        return false
      } else {
        //密码前面添加4位长度
        let newPassword = this.PrefixZero(this.password.length * 2, 4)
        newPassword = newPassword + this.stringToHex(this.password)
        //使用标准RSA算法处理
        let privateKey =
          '-----BEGIN PUBLIC KEY-----' +
          this.pkbase64 +
          '-----END PUBLIC KEY-----'
        newPassword = this.encryptedData(privateKey, newPassword)
        var password_temp = newPassword.replace(/\+/g, '%2B')
      }
      if (this.checked) {
        // console.log("选中记住密码")
        //传入手机号，密码，和保存天数3个参数
        this.setCookie(this.username, this.password, 7)
      } else {
        //   console.log("清空cookie")
        this.clearCookie()
      }
      // var that = this
      console.log('this.token', this.token)
      console.log('this.appid', this.appid)
      console.log('this.username', this.username)
      console.log('this.password', password_temp)
      const toast = this.$toast.loading({
        duration: 1000, // 持续展示 toast
        forbidClick: true,
        message: '登录中...',
      })

      loginOfAccount({
        _csrf: this.token,
        cipherText: password_temp,
        tellerNo: this.username,
        appId: this.appid,
      })
        .then(res => {
          //请求成功
          var result = res.data.rs
          console.log(result)
          console.log('res.data', res.data)
          if (result == '1') {
            let storage = window.localStorage
            var userName = res.data.memberID
            // var nickName = res.data.usernameLERNAME
            var nickName = res.data.TELLERNAME
            global_.userName = userName
            global_.nickName = nickName
            global_.usernameLERCOMPANY = res.data.usernameLERCOMPANY
            global_.usernameLERROLE = res.data.usernameLERROLE
            global_.token = res.data.token.token

            /* --当刷新页面导致token不存在时,使用sessionStorage中的token--*/
            storage.setItem('token', global_.token)
            storage.setItem('memberID', global_.userName)
            storage.setItem('usernameLERROLE', res.data.usernameLERROLE)
            storage.setItem('usernameLERCOMPANY1', res.data.usernameLERCOMPANY)
            storage.setItem('user', JSON.stringify(res.data))
            storage.setItem('nickName', nickName)
            storage.setItem('memberID', userName)

            storage.setItem('REALUSERNAME', res.data.TELLERCOMPANY)
            // 单位token 存储到vuex(localStorage)
            // that.$store.commit('setUnitToken', res.data.token.token)

            let second = 1
            const timer = setInterval(() => {
              second--
              if (second) {
                toast.message = `正在登录,稍后跳转到登录前页面(${second}s)`
              } else {
                clearInterval(timer)
                // 手动清除 Toast
                this.$toast.clear()
                toast.message = '登录成功'
                toast.icon = 'success'
                // 跳转到订单确定页面
                if (this.$route.params.toPath === 'confirm') {
                  this.$router.push({
                    name: 'confirm',
                    params: {
                      toPath: '',
                    },
                  })
                } else {
                  // 登录成功返回上一级页面
                  this.$router.go(-1)
                }
              }
            }, 1000)

            // that.$router.push('/')
            // window.location.href = global_.clientUrl
          } else {
            this.$dialog
              .alert({
                message: result,
              })
              .then(() => {
                return false
              })
          }
        })
        .catch(err => {
          //请求失败
          console.log(err)
        })
      // this.$http
      //   .post(
      //     'http://www.paytunnel.cn/carRentalServerRH/app/apploginByAccount?_csrf=' +
      //       this.token +
      //       '&cipherText=' +
      //       password_temp +
      //       '&tellerNo=' +
      //       this.username +
      //       '&appId=' +
      //       this.appid
      //   )
      //   .then(function (response) {
      //     //请求成功
      //     var result = response.data.rs
      //     console.log('result', result)
      //     console.log('response.data', response.data)
      //     if (result == '1') {
      //       let storage = window.localStorage
      //       var userName = response.data.memberID
      //       // var nickName = response.data.usernameLERNAME
      //       var nickName = response.data.TELLERNAME
      //       global_.userName = userName
      //       global_.nickName = nickName
      //       global_.usernameLERCOMPANY = response.data.usernameLERCOMPANY
      //       global_.usernameLERROLE = response.data.usernameLERROLE
      //       global_.token = response.data.token.token

      //       /* --当刷新页面导致token不存在时,使用sessionStorage中的token--*/
      //       storage.setItem('token', global_.token)
      //       storage.setItem('memberID', global_.userName)
      //       storage.setItem('usernameLERROLE', response.data.usernameLERROLE)
      //       storage.setItem(
      //         'usernameLERCOMPANY1',
      //         response.data.usernameLERCOMPANY
      //       )
      //       storage.setItem('user', JSON.stringify(response.data))
      //       storage.setItem('nickName', nickName)
      //       storage.setItem('memberID', userName)
      //       // 单位token 存储到vuex(localStorage)
      //       // that.$store.commit('setUnitToken', response.data.token.token)

      //       let second = 1
      //       const timer = setInterval(() => {
      //         second--
      //         if (second) {
      //           toast.message = `正在登录,稍后跳转到登录前页面(${second}s)`
      //         } else {
      //           clearInterval(timer)
      //           // 手动清除 Toast
      //           that.$toast.clear()
      //           toast.message = '登录成功'
      //           toast.icon = 'success'
      //           // 跳转到订单确定页面
      //           if (that.$route.params.toPath === 'confirm') {
      //             that.$router.push({
      //               name: 'confirm',
      //               params: {
      //                 toPath: '',
      //               },
      //             })
      //           } else {
      //             // 登录成功返回上一级页面
      //             that.$router.go(-1)
      //           }
      //         }
      //       }, 1000)

      //       // that.$router.push('/')
      //       // window.location.href = global_.clientUrl
      //     } else {
      //       // Dialog.alert({
      //       //   message: result,
      //       // }).then(() => {
      //       //   return false
      //       // })
      //       let second = 1
      //       const timer = setInterval(() => {
      //         second--
      //         if (second) {
      //           toast.message = `正在登录...`
      //         } else {
      //           clearInterval(timer)
      //           // 手动清除 Toast
      //           that.$toast.clear()
      //           toast.message = '登录失败'
      //           toast.icon = 'fail'
      //           // 登录成功返回上一级页面
      //           that.$router.go(-1)
      //         }
      //       }, 1000)
      //     }
      //   })
      //   .catch(function (error) {
      //     //请求失败
      //     console.log('error:' + error)
      //   })
    },
    setCookie(username, pass, exdays) {
      var exdate = new Date() //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        'userName' + '=' + username + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'userPwd' + '=' + pass + ';path=/;expires=' + exdate.toGMTString()
    },
    //读取cookie
    getCookie() {
      console.log('getCookie')
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') //再次切割
          //判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.username = arr2[1] //保存到保存数据的地方
          } else if (arr2[0] == 'userPwd') {
            this.password = arr2[1]
          }
        }
      }
      console.log(this.username)
      console.log(this.password)
    },
    //清除cookie
    clearCookie() {
      this.setCookie('', '', -1)
    },
    Timmer() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.showBg = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.showBg = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
  },
}
</script>

<style scoped lang="less">
/deep/ .van-button--info {
  font-size: 1rem;
  color: #3c3839;
}

/deep/ .van-field__control {
  -webkit-appearance: none; /*去除系统默认的样式*/
}
// select {
//   -webkit-appearance: none; /*去除系统默认的样式*/
// }
.logoBox {
  text-align: center;
  margin-top: 2rem;
}
.unPassword {
  font-size: 0.9rem;
  text-align: right;
  margin-top: 1rem;
  margin-right: 1rem;
  color: #ccc;
}
.toPersonalLogin {
  font-size: 0.9rem;
  text-align: center;
  margin-top: 2rem;
  color: #ff7636;
}
</style>
