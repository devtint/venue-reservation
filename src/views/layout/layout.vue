<!-- 布局容器 -->
<template>
  <div class="layout">
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <footer-tabbar></footer-tabbar>
    </footer>
  </div>
</template>

<script>
import FooterTabbar from '@/views/layout/components/FooterTabbar.vue'
export default {
  name: 'layout',
  components: {
    FooterTabbar,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.layout {
  background: #f8f8f8;
}
</style>
