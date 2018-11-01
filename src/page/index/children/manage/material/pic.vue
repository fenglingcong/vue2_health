<template>
  <div id="pic">
    <el-tabs class="tab_sub" v-model="activeName" type="card">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="收藏" name="collect"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'
    }
  }
}
</script>

<style lang="stylus">
#pic{
  padding-top: 20px;
}
</style>
