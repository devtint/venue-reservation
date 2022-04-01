<template>
  <div id="app">
    <!-- <router-view /> -->
    <!-- <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> -->
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // include: [],
    }
  },
  watch: {
    // $route(to, from) {
    //   // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
    //   if (to.meta.keepAlive) {
    //     !this.include.includes(to.name) && this.include.push(to.name)
    //   }
    //   // 如果 要 form(离开) 的页面是 keepAlive缓存的，
    //   // 再根据 deepth 来判断是前进还是后退
    //   // 如果是后退：
    //   if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
    //     const index = this.include.indexOf(from.name)
    //     index !== -1 && this.include.splice(index, 1)
    //   }

    //   console.log('keepAlive this.include', this.include)
    // },
  },
}
</script>

<style lang="less"></style>
