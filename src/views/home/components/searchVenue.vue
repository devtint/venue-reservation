<template>
  <div class="searchVenue">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import { searchSportsHalls } from '@/api/home'

import { useHomeStore } from '@/store/home'
export default {
  name: 'searchVenue',
  components: {},
  props: {},
  data() {
    return {
      value: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearch() {
      console.log('search:', this.value)
      searchSportsHalls({
        keyWordsFld: this.value,
      }).then(res => {
        if (res.data.rs !== '1') {
          console.log(res.data.rs)
          return
        }
        console.log(res.data.querySportsHallsBySearch)
        useHomeStore().setSportsHallsOfSearch(res.data.querySportsHallsBySearch)
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
