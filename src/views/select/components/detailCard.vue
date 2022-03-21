<template>
  <div class="detailCard">
    <van-card>
      <template #thumb>
        <div class="thumb">
          <van-image
            width="5rem"
            height="5rem"
            fit="contain"
            :src="currentSportHall.siteFile"
          />
        </div>
      </template>
      <template #title>
        <h3 class="van-multi-ellipsis">
          {{ currentArea.siteType + ' ' + currentArea.siteNumber }}
        </h3>
      </template>
      <template #desc>
        <h3 class="van-multi-ellipsis--l2">
          <!-- 位于场馆左侧，可用于比赛、练习、大众健身等，欢迎预定。 -->
          {{ currentArea.siteRemark }}
        </h3>
      </template>
    </van-card>
  </div>
</template>

<script>
import { useAreaStore } from '@/store/area'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    currentArea() {
      return useAreaStore().getCurrentArea
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less"></style>
