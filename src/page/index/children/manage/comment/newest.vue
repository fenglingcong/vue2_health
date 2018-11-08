<template>
  <div id="newestWrap">
    <div class="comment-tip">与读者（特别是与粉丝）互动有助于提升「头条号指数」中的「关注度」。可以对优质评论进行推荐，被推荐的评论将突出展示，每篇文章可推荐一条评论</div>
    <div class="comment-container">
      <comment-list></comment-list>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '最新评论'
    }
  }
}
</script>

<style lang="stylus">
#newestWrap{
  padding: 20px 24px;
  color: #333;
  .comment-tip{
    margin-bottom: 12px;
    font-size: 14px;
    color: #999;
  }
  .comment-container{
    border: 1px solid #e8e8e8;
  }
}
</style>
