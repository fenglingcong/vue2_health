<template>
  <div class="article-list" v-if="itemJson">
    <el-row class="article-item" v-for="(item, index) in itemJson" :key="index" :class="{'unpassed': item.state === '4'}">
      <!-- 草稿 -->
      <template v-if="item.state === '2'">
        <div class="content">
          <a :href="previewURL(item)" class="title" target="_blank">{{item.title}}</a>
          <div class="abstruct">
             <span class="draft">草稿</span>
             <span class="time">{{item.newstime}}</span>
          </div>
          <div class="action">
            <el-button type="primary" icon="el-icon-edit" circle @click="editArticle(item)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteArticle(item, index)"></el-button>
          </div>
        </div>
      </template>
      <!-- 未通过 / 已发表 / 审核中 / 已撤回 -->
      <template v-else>
        <el-col class="picture" :span="4">
          <a :href="previewURL(item)" target="_blank">
            <img :src="item.titlepic" alt="">
            <div class="playRound" v-if="item.playonlineurl">
              <div class="playSan"></div>
            </div>
          </a>
        </el-col>
        <el-col class="content" :span="20">
          <a :href="previewURL(item)" class="title" target="_blank">{{item.title}}</a>
          <!-- 未通过 -->
          <template v-if="item.state === '4'">
            <p class="unpassed_reason">未通过原因，内容不适合收录</p>
            <div class="action">
              <el-tooltip content="内容不适合收录，禁止修改" effect="light">
                <el-button type="primary" icon="el-icon-edit" circle class="disabled"></el-button>
              </el-tooltip>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteArticle(item, index)"></el-button>
            </div>
          </template>
          <!-- 已发表 / 草稿 / 撤回 -->
          <template v-else>
            <div class="abstruct">
              <a class="recommend" v-if="item.state === '0'">已推荐</a>
              <span class="passed" v-if="item.state === '0' || item.state === '1'">已发表</span>
              <span class="auditing" v-if="item.state === '3'">审核中</span>
              <span class="recall" v-if="item.state === '5'">已撤回</span>
              <span class="time" v-if="item.newstime">{{item.newstime}}</span>
            </div>
            <div class="count">
              <span v-if="item.onclick">阅读 {{item.onclick}}</span>
              <span v-else>阅读 0</span>
              <span v-if="item.plnum">评论 {{item.plnum}}</span>
              <span v-else>评论 0</span>
              <span v-if="item.collectnum">收藏 {{item.collectnum}}</span>
              <span v-else>收藏 0</span>
            </div>
            <div class="action">
              <el-button type="primary" icon="el-icon-edit" circle @click="editArticle(item)"></el-button>
              <el-button type="danger" icon="el-icon-share" circle @click="centerDialogVisible = true"></el-button>
              <el-dropdown trigger="click">
                <el-button type="info" icon="el-icon-more" circle></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="recallArticle(item)">撤回</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteArticle(item, index)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-col>
      </template>
    </el-row>
    <!-- 分享 -->
    <el-dialog
      title="分享"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <ul class="share-wrap">
        <li class="wx"></li>
        <li class="qq"></li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import { postArticle } from '@/api'
export default {
  props: {
    itemJson: Array
  },
  data () {
    return {
      centerDialogVisible: false
    }
  },
  methods: {
    previewURL (item) {
      if (item.state === '0' || item.state === '1') {
        return `http://m.toutiaojk.com/#detail?classid={item.classid}&id=${item.id}&datafrom=${item.datafrom}`
      } else {
        return `/#/preview_article?id=${item.id}`
      }
    },
    editArticle (item) {
      this.$router.push(`/index/publish?id=${item.id}`)
    },
    recallArticle (item) {
      this.$confirm('确认撤回这篇文章吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let params = {
          type: 'recall',
          id: item.id,
          state: '5'
        }
        postArticle(params)
          .then(res => {
            item.state = '5'
            this.$notify.success('撤回成功')
          })
          .catch(err => {
            console.log('撤回失败', err)
            this.$notify.error('撤回失败')
          })
      }).catch(() => {
        console.log('取消撤回')
      })
    },
    deleteArticle (item, index) {
      this.$confirm('确认删除这篇文章吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let params = {
          type: 'del',
          id: item.id,
          datafrom: item.datafrom
        }
        postArticle(params)
          .then(res => {
            this.itemJson.splice(index, 1)
            this.$notify.success('删除成功')
          })
          .catch(err => {
            console.log('删除失败', err)
            this.$notify.error('删除失败')
          })
      }).catch(() => {
        console.log('取消删除')
      })
    }
  }
}
</script>

<style lang="stylus">
.article-list{
  padding: 0 24px;
  .article-item{
    position: relative;
    padding: 20px 0;
    border-bottom: 1px solid #e8e8e8;
    font-size: 0;
    a{
      display: block;
      color: #333;
    }
    .picture{
      position: relative;
      display: inline-block;
      vertical-align: middle;
      float: none;
      height: 102px;
      overflow: hidden;
      img{
        width: 100%;
        min-height: 102px;
      }
    }
    .playRound{
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 222;
      margin-top: -20px;
      margin-left: -20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0, 0, 0, .6);
    }
    .playSan{
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -2px;
      margin-top: -10px;
      width: 0;
      height: 0;
      font-size: 0;
      border: 10px solid white;
      border-color: transparent transparent transparent rgba(255, 255, 255, .6);
    }
  }
  .content{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    float: none;
    padding-left: 18px;
    line-height: 2;
    .title{
      line-height: 1.8;
      font-size: 18px;
      font-weight: 700;
      color: #111;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:hover{
        opacity: 0.6;
      }
    }
    .abstruct{
      span{
        display: inline-block;
        font-size: 14px;
        color: #666;
      }
      span:not(:last-child)::after{
        content: '\FF65';
        margin: 0 4px;
      }
      .recommend{
        padding: 2px 2px 0;
        margin-right: 10px;
        display: inline-block;
        border: 1px solid #60a3f5;
        line-height: 18px;
        font-size: 12px;
        color: #60a3f5;
      }
    }
    .count{
      span{
        margin-right: 26px;
        display: inline-block;
        font-size: 14px;
        color: #777;
      }
    }
    .action{
      button{
        margin: 0 26px 0 0;
      }
    }
    .unpassed_reason{
      line-height: 2;
      font-size: 14px;
      color: #ed4040;
    }
  }
  .article-item.unpassed{
    .action{
      button{
        &.disabled{
          cursor: not-allowed;
          &:hover{
            background-color: #409eff;
            border-color: #409eff;
          }
        }
      }
    }
  }
  .share-wrap{
    margin-top: -16px;
    text-align: center;
    font-size: 0;
  }
  .share-wrap li{
    margin: 0 10px;
    display: inline-block;
    width: 40px;
    height: 40px;
  }
}
</style>
<style>
.share-wrap .wx {
  background: url(~@/assets/icon/icon_wx_pc.svg) no-repeat top center;
}
.share-wrap .qq{
  background: url(~@/assets/icon/icon_qq_pc.svg) no-repeat top center;
}
</style>
