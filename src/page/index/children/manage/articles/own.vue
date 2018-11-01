<template>
  <div id="own">
    <el-tabs class="tab_sub" v-model="activeName" type="card">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="已发表" name="passed"></el-tab-pane>
      <el-tab-pane label="未通过" name="unpassed"></el-tab-pane>
      <el-tab-pane label="草稿" name="draft"></el-tab-pane>
      <el-tab-pane label="已撤回" name="recall"></el-tab-pane>
    </el-tabs>
    <div class="own_content">
      <my-loading></my-loading>
      <article-list :itemJson="itemJson"></article-list>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
export default {
  data () {
    return {
      activeName: 'all',
      itemJson: []
    }
  },
  methods: {
    async init () {
      this.get_article()
    },
    async get_article () {
      let params = {
        type: this.activeName,
        page: 1
      }
      await getArticleList(params)
        .then(res => {
          console.log(res)
          this.itemJson = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="stylus"></style>
