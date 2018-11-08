<template>
  <el-header id="header" height="76px">
    <div class="header_wrap">
      <router-link to="/" class="logo"></router-link>
      <div class="right">
        <router-link to="/">
          <el-button type="primary">发表</el-button>
        </router-link>
        <el-dropdown class="user" @command="handleCommand">
          <div class="userinfo">
            <img src="http://wx.qlogo.cn/mmopen/vi_32/kAPpoX9tk40ZdeV9lyaJ9FjicsHJamL6MRsNicObcr1ejXkh00qtoG56NIiaWjLia5wdXHqDeQiaf2rcw5efCiaatPtA/132" alt="">
            <span class="el-dropdown-link">是肯</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  methods: {
    handleCommand (command) {
      console.log(command)
    }
  }
}
</script>

<style lang="stylus">
#header{
  position: relative;
  width: 100%;
  min-width: 1138px;
  background: #fff;
  border-top: 4px solid #f95e58;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .12);
  .header_wrap{
    position: relative;
    margin: 0 auto;
    width: 1138px;
    height: 100%;
    z-index: 100;
  }
  .logo{
    float: left;
    display: block;
    width: 94px;
    height: 100%;
    background: url(../assets/img/logo.png) no-repeat center;
    background-size: contain;
  }
  .right{
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    .user{
      margin-left: 40px;
      .userinfo{
        cursor: pointer;
        img{
          margin-right: 5px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
