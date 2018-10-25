<template>
  <div>
    我是{{msg}}页
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '评论管理'
    }
  }
}
</script>

<style lang="stylus"></style>
