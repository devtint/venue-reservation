<template>
  <div class="ContactCard">
    <van-cell center is-link size="large" @click="onListContact">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #default>
        <div style="color: #fcc55e">
          {{ currentContact.name ? '更换' : '选择' }}
        </div>
      </template>
      <template #title>
        <div class="custom-title">
          <span class="title-name">{{
            currentContact.name ? currentContact.name : '选择承租人'
          }}</span
          >&nbsp;&nbsp;
          <span class="title-tel">{{ currentContact.tel }}</span>
        </div>
      </template>
      <template #label>
        <div class="custom-label">
          <span class="label-address">{{ currentContact.address }}</span>
        </div>
      </template>
    </van-cell>

    <div class="listPupop">
      <van-popup
        v-model="listPupopShow"
        position="right"
        :style="{ width: '100%', height: '100%' }"
      >
        <div class="listPupopTop">
          <van-nav-bar
            fixed
            placeholder
            title="承租人"
            left-arrow
            @click-left="backPage"
          />
        </div>
        <div class="noticeBar">
          <van-notice-bar
            text="订单支付成功后，将同步到承租人账号"
            :scrollable="false"
          />
        </div>
        <main>
          <van-address-list
            v-model="contact.chosenContactId"
            :list="contact.list"
            default-tag-text="默认"
            add-button-text="新增联系人"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
          />
        </main>
      </van-popup>
    </div>
    <div class="editPupop">
      <van-popup
        v-model="editPupopShow"
        position="right"
        :style="{ width: '100%', height: '100%' }"
      >
        <div class="editPupopTop">
          <van-nav-bar
            fixed
            placeholder
            title="新建承租人"
            set-default-label="设为默认联系人"
            left-arrow
            @click-left="backListPage"
          />
        </div>
        <div class="noticeBar">
          <van-notice-bar
            text="提示：姓名、手机号须真实有效，否则影响取车"
            :scrollable="false"
          />
        </div>
        <main>
          <!-- <van-contact-edit
            is-edit
            :contact-info="editingContact"
            @save="onSave"
            @delete="onDelete"
          /> -->
          <van-address-edit
            :area-list="areaList"
            :address-info="editingContact"
            show-delete
            :show-set-default="isShowSetDefault"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
          />
        </main>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import {
  getMyAddress,
  addMyAddress,
  updateMyAddress,
  deleteMyAddress,
} from '@/api/user'
var _ = require('lodash')
export default {
  name: 'ContactCard',
  components: {},
  props: {},
  data() {
    return {
      areaList, // 地区列表
      areaCode: '', // 地区编码
      addOrEdit: '', // 新增或编辑
      engine_NAME: '',

      isShowSetDefault: false, // 是否显示设为默认联系人
      listPupopShow: false,
      editPupopShow: false,
      currentContact: {},
      contact: {
        chosenContactId: '',
        list: [],
      },

      editingContact: {},
    }
  },
  computed: {},
  watch: {
    currentContact: {
      handler(newVal, oldVal) {
        console.log('setCurrentContactInfo', newVal)
        this.$store.commit('order/setCurrentContactInfo', newVal)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // 初始化联系人列表
    this.initContact()
  },
  mounted() {},
  methods: {
    initContact() {
      // 获取联系人,并设置默认联系人
      getMyAddress().then(res => {
        if (res.data.rs === '1') {
          this.contact.list = res.data.queryMyAddr.map(item => {
            return {
              id: item.addrID,
              name: item.receiverName,
              tel: item.phone,
              address: item.province + item.city + item.areaName + item.address,
              isDefault: item.isDefault === '1' ? true : false,
              province: item.province,
              city: item.city,
              county: item.areaName,
              addressDetail: item.address,
            }
          })

          this.contact.list.forEach(item => {
            if (item.isDefault) {
              this.currentContact = item
              this.contact.chosenContactId = item.id
            }
          })

          console.log('contact', this.contact.list)
        }
      })
    },
    async areaCodeInit(contact) {
      // 这里是点击编辑拿到的地址
      let city = contact.city //城市
      let district = contact.county //区/县
      _.forEach(this.areaList.city_list, (o, c) => {
        if (o == city) {
          let cityId = String(_.take(c, 2))
          _.forEach(this.areaList.county_list, (i, a) => {
            if (i == district) {
              let districtId = String(_.take(a, 2))
              if (cityId == districtId) {
                this.areaCode = a
              }
            }
          })
        }
      })
    },

    onListContact() {
      this.listPupopShow = true
    },
    backPage() {
      this.listPupopShow = false
    },
    backListPage() {
      this.editPupopShow = false
    },
    onAdd() {
      // this.$toast('新增')
      this.addOrEdit = 'add'
      this.isShowSetDefault = false
      this.editingContact = {}
      this.editPupopShow = true
    },
    onEdit(contact) {
      // this.$toast('编辑' + contact.id)
      this.addOrEdit = 'edit'
      this.isShowSetDefault = true
      // 获取areaCode
      this.areaCodeInit(contact)
      this.editingContact = {
        id: contact.id,
        name: contact.name,
        tel: contact.tel,
        province: contact.province,
        city: contact.city,
        county: contact.county,
        addressDetail: contact.addressDetail,
        isDefault: contact.isDefault,
        areaCode: this.areaCode,
      }
      this.editPupopShow = true
    },
    onSelect(contact) {
      // console.log('选择', contact)
      // this.$toast('选择' + contact.id)
      // 赋值到currentContact
      this.currentContact = contact
      // 选择完后关闭弹窗
      this.listPupopShow = false
    },
    onSave(contactInfo) {
      console.log('保存', contactInfo)
      // this.$toast('保存')
      // 先判断是新增还是修改
      if (this.addOrEdit === 'edit') {
        this.engine_NAME = '修改会员地址'
        // this.$toast('修改')
      } else {
        this.engine_NAME = '新增会员地址'
        // this.$toast('新增')
      }
      let params = {
        srlIDForEngine: 'Splenwise微信预约点餐系统',
        busiNameForEngine: '汽车租赁业务',
        busiFunNameForEngine: this.engine_NAME,
        miniProcNameForEngine: this.engine_NAME,
        addrID: contactInfo.id,
        province: contactInfo.province,
        city: contactInfo.city,
        areaName: contactInfo.county,
        address: contactInfo.addressDetail,
        receiverName: contactInfo.name,
        phone: contactInfo.tel,
        isDefault: contactInfo.isDefault ? '1' : '0',
      }
      // 先判断是新增还是修改
      if (this.addOrEdit === 'edit') {
        // 修改后保存
        updateMyAddress(params).then(res => {
          console.log('修改后保存', res)
          if (res.data.rs === '1') {
            this.$toast('修改成功')
            // 刷新联系人列表
            this.initContact()
          }
        })
      } else {
        // 新增后保存
        addMyAddress(params).then(res => {
          if (res.data.rs === '1') {
            this.$toast('新增成功')
            // 刷新联系人列表
            this.initContact()
          }
        })
      }

      this.editPupopShow = false
    },
    onDelete(contactInfo) {
      console.log('删除', contactInfo)
      // 判断是否是默认地址,如果是默认地址,则不能删除

      // srlIDForEngine=Splenwise微信预约点餐系统
      // busiNameForEngine=汽车租赁业务
      // busiFunNameForEngine=删除会员地址
      // miniProcNameForEngine=删除会员地址
      // addrID=2202151004444261
      let params = {
        srlIDForEngine: 'Splenwise微信预约点餐系统',
        busiNameForEngine: '汽车租赁业务',
        busiFunNameForEngine: '删除会员地址',
        miniProcNameForEngine: '删除会员地址',
        addrID: contactInfo.id,
      }
      deleteMyAddress(params).then(res => {
        console.log('删除', res)
        if (res.data.rs === '1') {
          this.$toast('删除成功')
          // 刷新联系人列表
          this.initContact()
        }
      })
      this.editPupopShow = false
      // 更新contact.list
      this.contact.list = this.contact.list.filter(
        item => item.id !== contactInfo.id
      )
    },
  },
}
</script>

<style scoped lang="less"></style>
