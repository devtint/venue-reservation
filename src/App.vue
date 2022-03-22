<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getAdImages } from '@/api/home'
import { silenceLogin } from '@/api/user'
import { BASE_DOMAIN } from '@/global/config'
export default {
  name: 'orderRules',
  components: {},
  props: {},
  data() {
    return {
      adImagesLink: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less"></style>
