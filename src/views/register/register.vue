<!-- 注册页面 -->
<template>
  <div class="register">
    <div class="topNav">
      <van-nav-bar
        title=""
        left-arrow
        @click-left="backPage"
        @click-right="toRegister"
      >
      </van-nav-bar>
    </div>
    <div class="registerTitle">
      <p>快捷登录注册</p>
    </div>
    <main>
      <van-form validate-first @submit="onSubmit">
        <van-cell-group inset>
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field
            v-model="tel"
            type="tel"
            left-icon="phone"
            placeholder="  请输入手机号"
            @click="isNumKeyShow"
            :rules="[{ pattern: phonePattern, message: '请输入正确的手机号' }]"
          ></van-field>
          <div class="keyPopup">
            <van-number-keyboard
              :show="numKeyShow"
              v-model="tel"
              theme="custom"
              extra-key=""
              close-button-text="完成"
              @blur="numKeyShow = false"
              @input="onInput"
              @delete="onDelete"
            />
          </div>
          <!-- 输入验证码 -->
          <van-field
            v-model="digitSms"
            center
            clearable
            type="digit"
            left-icon="umbrella-circle"
            placeholder="  请输入短信验证码"
            validate-trigger="onChange"
            :rules="[{ pattern: smsPattern, message: '请输入6位数验证码' }]"
            @touchstart.native.stop="smsShow = true"
          >
            <template #button>
              <van-button size="small" type="primary">发送验证码</van-button>
            </template>
          </van-field>
          <van-number-keyboard
            v-model="digitSms"
            :show="smsShow"
            @blur="smsShow = false"
            @input="onInput"
            @delete="onDelete"
          />
          <!-- 输入密码 -->
          <van-field
            v-model="password"
            type="password"
            left-icon="lock"
            placeholder="  请设置您的登录密码"
          />
          <van-field
            v-model="password"
            type="password"
            left-icon="lock"
            placeholder="  请再次输入您的密码"
          />
        </van-cell-group>

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </main>
  </div>
</template>

<script>
export default {
  name: 'register',
  components: {},
  props: {},
  data() {
    return {
      tel: '',
      password: '',
      digitSms: '',
      numKeyShow: false,
      smsShow: false,

      phonePattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      smsPattern: /^\d{6}$/,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    backPage() {
      this.$router.go(-1)
    },
    isNumKeyShow() {
      this.numKeyShow = true
    },
  },
}
</script>

<style scoped lang="less">
.registerTitle {
  font-size: larger;
  margin-top: 1.5rem;
  margin-left: 3rem;
  margin-bottom: 0.5rem;
  text-align: left;
}
</style>
