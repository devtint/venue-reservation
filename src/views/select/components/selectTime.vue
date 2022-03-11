<template>
  <div class="selectTime">
    <div class="title">
      <h3>选择预约时间</h3>
    </div>
    <main>
      <van-grid :column-num="3" :gutter="10" clickable>
        <van-grid-item
          v-for="(value, index) in timeLists"
          :class="{ selected: value.selected }"
          :key="index"
          @click="selectItem(value)"
        >
          <template #icon>
            <div class="time">
              <div>{{ value.time }}</div>
            </div>
          </template>
          <template #text>
            <div class="text">
              <div>{{ value.price }}</div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </main>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      timeLists: [
        {
          id: 1,
          time: '7:00-08:00',
          price: '免费',
          selected: false,
        },
        {
          id: 2,
          time: '8:00-09:00',
          price: '免费',
          selected: false,
        },
        {
          id: 3,
          time: '9:00-10:00',
          price: '免费',
          selected: false,
        },
        {
          id: 4,
          time: '10:00-11:00',
          price: '免费',
          selected: false,
        },
        {
          id: 5,
          time: '11:00-12:00',
          price: '免费',
          selected: false,
        },
        {
          id: 6,
          time: '12:00-13:00',
          price: '免费',
          selected: false,
        },
        {
          id: 7,
          time: '13:00-14:00',
          price: '免费',
          selected: false,
        },
        {
          id: 8,
          time: '14:00-15:00',
          price: '免费',
          selected: false,
        },
        {
          id: 9,
          time: '15:00-16:00',
          price: '免费',
          selected: false,
        },
        {
          id: 10,
          time: '16:00-17:00',
          price: '免费',
          selected: false,
        },
        {
          id: 11,
          time: '17:00-18:00',
          price: '免费',
          selected: false,
        },
        {
          id: 12,
          time: '18:00-19:00',
          price: '免费',
          selected: false,
        },
        {
          id: 13,
          time: '19:00-20:00',
          price: '免费',
          selected: false,
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    selectItem(value) {
      console.log(value.time)
      // 选择时间段变成选中样式
      this.timeLists.forEach(item => {
        if (item.id === value.id) {
          item.selected = true
        } else {
          item.selected = false
        }
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
</style>
