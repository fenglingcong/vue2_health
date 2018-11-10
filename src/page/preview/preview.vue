<template>
  <div id="preview">
    <my-header></my-header>
    <div class="layout">
      <div class="mobileOptions">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; font-size: 13px">{{ item.size }}</span>
          </el-option>
        </el-select>
      </div>
      <article class="article" v-if="json" :class="value">
        <h1 class="article_title">{{json.title}}</h1>
        <div class="article_sub">
          <span>{{json.befrom}}</span>
          <span>{{json.time}}</span>
        </div>
        <div class="article_content" v-html="json.newstext"></div>
      </article>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { getArticle } from '@/api'
export default {
  data () {
    return {
      json: {},
      value: 'iPhone6',
      options: [
        {
          value: 'iPhone5',
          label: 'iPhone5',
          size: '320 x 568'
        },
        {
          value: 'iPhone6',
          label: 'iPhone6',
          size: '375 x 667'
        },
        {
          value: 'iPhone6Plus',
          label: 'iPhone6 Plus',
          size: '414 x 736'
        },
        {
          value: 'iPad',
          label: 'iPad',
          size: '768 x 1024'
        }
      ]
    }
  },
  methods: {
    get_article () {
      getArticle(this.$route.query.id)
        .then(res => {
          if (res.data) {
            this.json = res.data
          } else {
            this.$message.error('没有文章数据1')
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('没有文章数据2')
        })
    }
  },
  created () {
    this.get_article()
  }
}
</script>

<style lang="stylus">
#preview{
  position: relative;
  width: 100%;
  .layout{
    position: relative;
    margin: 20px auto 30px;
    width: 1138px;
    min-width: 1138px;
    font-size: 0;
    .mobileOptions{
      position: absolute;
      top: 10px;
      z-index: 99;
      width: 100%;
      text-align: center;
      .el-select .el-input.is-focus .el-input__inner, .el-select .el-input__inner:focus{
        border-color: #f95e58;
      }
    }
  }
  .article{
    padding: 50px 16px 0;
    position: relative;
    margin: 0 auto;
    width: 375px;
    height: 667px;
    border-radius: 6px;
    background: #fff;
    overflow-y: auto;
    &.iPhone5{
      width: 320px;
      height: 568px;
    }
    &.iPhone6{
      width: 375px;
      height: 667px;
    }
    &.iPhone6Plus{
      width: 414px;
      height: 763px;
    }
    &.iPad{
      width: 768px;
      height: 1024px;
    }
    .article_title{
      padding-top: 16px;
      font-size: 20px;
      font-weight: 700;
      color: #333;
    }
    .article_sub{
      margin-top: 12px;
      margin-bottom: 16px;
      font-size: 13px;
      span{
        margin-right: 2px;
        color: #666;
      }
    }
    .article_content{
      padding-bottom: 24px;
      position: relative;
      line-height: 30px;
      font-size: 18px;
      color: #333;
      p{
        margin-bottom: 15px;
      }
      img{
        width: 100%;
        height: auto;
      }
      img[type="icon"]{
        width: inherit !important;
      }
      *{
        text-indent: inherit !important;
        font-size: inherit !important;
        font-family: inherit !important;
        line-height: inherit !important;
        text-align: justify !important;
        text-justify: inter-ideograph !important;
      }
    }
  }
}
.el-select-dropdown__item.selected {
  color: #f95e58;
}
.el-select-dropdown__item span{
  user-select: none;
}
</style>
