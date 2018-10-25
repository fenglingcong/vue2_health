<template>
  <div>我是{{msg}}页
    <div class="circle"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '预览'
    }
  }
}
</script>

<style lang="stylus">
.circle{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #f30;
  border-bottom: 0;
}
</style>
