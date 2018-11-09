<template>
  <div id="app">
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- 进度条 -->
    <vue-progress-bar></vue-progress-bar>
    <my-backTop></my-backTop>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    init_Progress () {
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start()
        next()
      })
      this.$router.afterEach((to, from, next) => {
        this.$Progress.finish()
      })
    }
  },
  created () {
    this.$Progress.start()
    this.init_Progress()
  },
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<style>
#app {
  position: relative;
  height: 100%;
  min-height: inherit;
}
</style>
