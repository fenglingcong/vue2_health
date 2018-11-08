<template>
  <div id="index">
    <el-container id="" direction="vertical">
      <my-header></my-header>
      <el-container id="horContainer">
        <my-menu></my-menu>
        <el-container direction="vertical">
          <my-page></my-page>
          <my-footer></my-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '首页首页'
    }
  }
}
</script>

<style lang="stylus">
#index{
  height: 100%;
  #horContainer{
    margin: 36px auto 0;
    width: 1138px;
  }
}
</style>
