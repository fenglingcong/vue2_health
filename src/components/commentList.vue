<template>
  <div class="comment-list">
    <div class="comment-item" v-for="(item, index) in itemJson" :key="item.id">
      <!-- avatar -->
      <div class="comment-avatar">
        <a href="javascript:;" target="_blank">
          <img :src="item.avatar" alt="">
        </a>
      </div>
      <!-- body -->
      <div class="comment-body">
        <!-- header -->
        <div class="comment-header">
          <a class="name">{{item.name}}{{index + 1}}</a>
          <div class="time"><span>{{item.time}}</span></div>
        </div>
        <!-- content -->
        <div class="comment-content">
          <div class="content-text">{{item.commentText}}</div>
          <div class="comment-article">
            评论了我的文章：
            <a :href="item.url" target="_blank">{{item.title}}</a>
          </div>
        </div>
        <!-- action -->
        <div class="comment-action clearfix">
          <div class="comment-action-left">
            <div class="comment-action-item"><i class="el-icon-fa-thumbs-up"></i> {{item.zanNum - index * 10}}</div>
            <div class="comment-action-item"><i class="el-icon-fa-commenting"></i> {{item.commentNum - index * 10}}</div>
          </div>
          <div class="comment-action-right">
            <div class="comment-action-item"><a>推荐</a></div>
            <div class="comment-action-item"><a>回复</a></div>
            <div class="comment-action-item"><a>点赞</a></div>
            <div class="comment-action-item"><a>举报</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemJson: {
      Array,
      default: () => {
        return [
          {
            id: '1',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541691585677&di=bfd54f7b1d19fc5c8c0f3844face88cf&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212014311_jwiC8.jpeg',
            name: '美美哒',
            time: '2018-11-08 20:11',
            commentText: '水乡乌镇再次吸引世界目光。11月7日，第五届世界互联网大会在乌镇开幕。国家主席习近平致贺信。贺信虽然不长，信息量却很大。世界互联网发展趋势是什么？数字经济有多重要？各国如何构建网络空间命运共同体？习近平的贺信都给出了最新答案。关于互联网发展趋势和数字经济，习近平给出最关于互联网发展趋势和数字经济，习近平给出最',
            title: '关于互联网发展趋势和数字经济，习近平给出最新判断',
            url: 'http://news.youth.cn/sz/201811/t20181108_11780030.htm',
            zanNum: 666,
            commentNum: 99
          },
          {
            id: '2',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541691585677&di=bfd54f7b1d19fc5c8c0f3844face88cf&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212014311_jwiC8.jpeg',
            name: '美美哒',
            time: '2018-11-07 10:11',
            commentText: '水乡乌镇再次吸引世界目光。11月7日，第五届世界互联网大会在乌镇开幕。国家主席习近平致贺信。贺信虽然不长，信息量却很大。世界互联网发展趋势是什么？数字经济有多重要？各国如何构建网络空间命运共同体？习近平的贺信都给出了最新答案。关于互联网发展趋势和数字经济，习近平给出最关于互联网发展趋势和数字经济，习近平给出最',
            title: '关于互联网发展趋势和数字经济，习近平给出最新判断',
            url: 'http://news.youth.cn/sz/201811/t20181108_11780030.htm',
            zanNum: 666,
            commentNum: 99
          },
          {
            id: '3',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541691585677&di=bfd54f7b1d19fc5c8c0f3844face88cf&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201412%2F12%2F20141212014311_jwiC8.jpeg',
            name: '美美哒',
            time: '2018-11-06 18:11',
            commentText: '水乡乌镇再次吸引世界目光。11月7日，第五届世界互联网大会在乌镇开幕。国家主席习近平致贺信。贺信虽然不长，信息量却很大。世界互联网发展趋势是什么？数字经济有多重要？各国如何构建网络空间命运共同体？习近平的贺信都给出了最新答案。关于互联网发展趋势和数字经济，习近平给出最关于互联网发展趋势和数字经济，习近平给出最',
            title: '关于互联网发展趋势和数字经济，习近平给出最新判断',
            url: 'http://news.youth.cn/sz/201811/t20181108_11780030.htm',
            zanNum: 666,
            commentNum: 99
          }
        ]
      }
    }
  }
}
</script>

<style lang="stylus">
.comment-list{
  position: relative;
  width: 100%;
  a{
    color: #406599;
  }
  a:hover{
    opacity: .8;
  }
  .comment-item{
    padding: 22px 0;
    position: relative;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
    &:last-child{
      border-bottom: 0;
    }
  }
  .comment-avatar{
    position: absolute;
    left: 22px;
    width: 40px;
    height: 40px;
    a{
      display: block;
    }
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .comment-body{
    padding-left: 76px;
    padding-right: 22px;
    .comment-header{
      line-height: 40px;
      .name{
        cursor: pointer;
      }
      .time{
        float: right;
        color: #999;
      }
    }
  }
  .comment-content{
    margin-bottom: 10px;
    line-height: 1.5;
    .content-text{
      text-align: justify;
      word-break: break-all;
    }
    .comment-article{
      margin-top: 10px;
      padding: 10px;
      line-height: 24px;
      color: #333;
      background-color: #f4f5f6;
    }
  }
  .comment-action{
    .comment-action-item{
      display: inline-block;
      cursor: pointer;
    }
    .comment-action-left{
      display: inline-block;
      color: #999;
      .comment-action-item{
        margin-right: 14px;
      }
    }
    .comment-action-right{
      float: right;
      .comment-action-item{
        margin-left: 14px;
      }
    }
  }
}
</style>
