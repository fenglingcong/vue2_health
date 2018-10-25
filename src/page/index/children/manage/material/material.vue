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
      msg: '素材管理'
    }
  }
}
</script>

<style lang="stylus"></style>
