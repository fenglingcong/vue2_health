<template>
  <div>
    我是{{msg}}页
    <router-link to="/index">首页</router-link>
    <router-link to="/login">登录页</router-link>
    <router-link to="/preview_article">预览页</router-link>
    <hr>
    <router-link to="/index/home">主页</router-link>
    <router-link to="/index/publish">发表</router-link>
    <router-link to="/index/count">统计</router-link>
    <router-link to="/index/setting">设置</router-link>
    <hr>
    <router-link to="/index/manage">管理</router-link>
    <router-link to="/index/manage/articles/own">我发表的</router-link>
    <router-link to="/index/manage/comment/newest">最新评论</router-link>
    <router-link to="/index/manage/comment/all">所有</router-link>
    <router-link to="/index/manage/material/pic">素材管理</router-link>
    <router-view></router-view>
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

<style lang="stylus"></style>
