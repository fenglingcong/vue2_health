<template>
  <div id="publish" v-loading="loading" element-loading-text="加载中...">
    <!-- 草稿提示 -->
    <div class="recovery" v-if="draft">
      已从草稿中恢复
      <el-button type="text" class="cancle" @click.stop="removeDraft">撤销</el-button>
    </div>
    <!-- 写文章 -->
    <div class="write">
      <!-- title -->
      <div class="title">
        <input type="text" placeholder="标题 (5-30个字符)" v-model.trim="title">
        <div class="title_count" :class="{'error': (title.length < 5 || title.length > 30) && title.length > 0}">{{title.length}} / 30</div>
      </div>
      <!-- content -->
      <div class="body">

        <quill-editor ref="myTextEditor" v-model="content" :options="editorOption">
          <my-sticky slot="toolbar">
            <div id="toolbar">
              <div class="ql-formats">
                <button class="ql-header" value="1" title="H1标题"></button>
                <button class="ql-header" value="2" title="H2标题"></button>
                <button class="ql-bold" title="加粗"></button>
                <button class="ql-blockquote" title="引用"></button>
                <button class="ql-list" value="ordered" title="有序列表"></button>
                <button class="ql-list" value="bullet" title="无序列表"></button>
              </div>
              <div class="ql-formats">
                <button class="ql-align" title="左"></button>
                <button class="ql-align" value="center" title="居中"></button>
                <button class="ql-align" value="right" title="右"></button>
                <button class="ql-align" value="justify" title="两边对齐"></button>
              </div>
              <div class="ql-formats">
                <el-button icon="el-icon-picture" title="插入图片" style="font-size: 16px;" @click.stop="uploadPictureVisible = true"></el-button>
                <button class="ql-link" title="文章链接"></button>
                <button class="ql-video" title="插入视频"></button>
              </div>
              <div class="ql-formats">
                <button class="ql-clean" title="清除格式"></button>
                <button class="undo" title="撤销" @click.stop="editor.history.undo()"></button>
                <button class="redo" title="重做" @click.stop="editor.history.redo()"></button>
              </div>
              <div class="draftSave" :class="{on: isSave}"></div>
            </div>
          </my-sticky>
        </quill-editor>
      </div>
    </div>
    <!-- 封面 -->
    <div class="edit">
      <div class="cover edit-cell">
        <div class="edit-label">封面</div>
        <div class="edit-input">
          <div class="select_radio">
            <el-radio-group v-model="cover_mode">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
            </el-radio-group>
          </div>
          <!-- 单图/三图 -->
          <div class="cover_images">
            <template v-for="(item, index) in cover_mode">
              <div class="cover_img" v-if="coverImages[index]" @click="selectPictureOpen(index)" :key="index">
                <img :src="coverImages[index]">
              </div>
              <div class="cover_add" v-else @click="selectPictureOpen(index)" :key="index">
                <i class="el-icon-plus"></i>
              </div>
            </template>
          </div>
          <!-- 提示 -->
          <div class="cover_tip">优质的封面有利于推荐，请使用清晰度较高的图片，避免使用GIF、带大量文字的图片</div>
        </div>
      </div>
      <div class="cover edit-cell">
        <div class="edit-label">类型</div>
        <div class="edit-input">
          <el-radio-group v-model="classid">
            <el-radio-button label="2">女性</el-radio-button>
            <el-radio-button label="3">育儿</el-radio-button>
            <el-radio-button label="4">中医</el-radio-button>
            <el-radio-button label="5">本地</el-radio-button>
            <el-radio-button label="6">政策</el-radio-button>
            <el-radio-button label="7">产业</el-radio-button>
            <el-radio-button label="8">旅游</el-radio-button>
            <el-radio-button label="20">其他</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="control">
      <!-- 修改 -->
      <template v-if="$route.query.id && this.json && this.json.state !== '2'">
        <el-button class="publish_btn" type="primary" size="large" @click.stop="verify('publish')">发表</el-button>
        <el-button class="cancle_btn gray" type="primary" size="large" @click.stop.native="$router.go(-1)">取消</el-button>
      </template>
      <!-- 新建 -->
      <template v-else>
        <el-button class="publish_btn" type="primary" size="large" @click.stop="verify('publish')">发表</el-button>
        <el-button class="draft_btn gray" type="primary" size="large" @click.stop="verify('draft')">存草稿</el-button>
        <el-button class="cancle_btn gray" type="primary" size="large" @click.stop.native="$router.go(-1)">取消</el-button>
      </template>
    </div>
    <!-- 自定义上传图片 -->
    <upload-picture v-if="uploadPictureVisible" @complete="inserPicture" @close="uploadPictureVisible = false"></upload-picture>
    <!-- 选择封面图 -->
    <select-picture v-if="selectPictureVisible" :json="contentImages" @complete="inserCover" @close="selectPictureVisible = false"></select-picture>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import uploadPicture from '@/components/uploadPicture'
import selectPicture from '@/components/selectPicture'
import { getArticle, postArticle } from '@/api'
import cache from '@/utils/cache'
Vue.use(VueQuillEditor)
export default {
  components: { uploadPicture, selectPicture },
  data () {
    return {
      json: null, // 修改的文章数据
      title: '',
      content: '',
      cover_mode: 1, // 封面模式 单图/三图
      contentImages: [], // 正文图片
      clickIndex: '',
      selectImages: [], // 选择图片
      coverImages: [], // 封面图片
      classid: '', // 标签
      draft: false,
      uploadPictureVisible: false, // 自定义图片上传dialog的toggle
      selectPictureVisible: false, // 选择封面dialog的toggle
      loading: false,
      isRequest: false, // 是否请求了
      isChange: false, // 是否修改
      isSave: false, // 是否保存
      editorOption: { // 富文本编辑器配置
        modules: {
          toolbar: '#toolbar',
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          }
        },
        placeholder: ''
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    },
    article () {
      return this.title + this.content + this.coverImages + this.classid
    }
  },
  watch: {
    article (val, old) {
      this.isChange = true
      if (this.isRequest) {
        this.isChange = false
        this.isRequest = false
      }
      if (this.isChange) {
        this.saveDfraft()
      }
    }
  },
  methods: {
    // 初始化
    async init () {
      let id = this.$route.query.id
      let draft = JSON.parse(cache.getLocal('draft'))
      // 是否编辑谋篇文章 ？ 请求数据，有这篇文章id的草稿就覆盖原数据 : 读取草稿
      if (id) {
        await this.get_article()
        if (draft && draft.id === id && (draft.title || draft.content)) {
          this.title = draft.title
          this.content = draft.content
          this.draft = true
        }
      } else if (draft && !draft.id && (draft.title || draft.content)) {
        this.title = draft.title
        this.content = draft.content
        this.draft = true
      }
    },
    async get_article () {
      this.loading = true
      await getArticle(this.$route.query.id)
        .then(res => {
          if (res.data) {
            this.isRequest = true
            this.json = res.data
            this.title = this.json.title
            this.content = this.json.newstext
            this.classid = this.json.classid
            if (this.json.titlepic) {
              this.coverImages[0] = this.json.titlepic
            }
            if (this.json.titlepic3) {
              this.coverImages[1] = this.json.titlepic2
              this.coverImages[2] = this.json.titlepic3
            }
          }
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取数据失败，请重新尝试')
          console.log(err)
        })
    },
    // 插入图片
    inserPicture (files) {
      console.log(files)
      this.editor.focus()
      files.forEach((item, index) => {
        if (item) {
          this.editor.insertEmbed(this.editor.getSelection().index + index, 'image', item)
        }
      })
      // 设置光标为末尾
      this.editor.setSelection(this.editor.getSelection().index + 1)
    },
    // 保存草稿
    saveDfraft () {
      let id = this.$route.query.id
      let data = {
        id: id,
        title: this.title,
        content: this.content
      }
      cache.setLocal('draft', data)
      this.isSave = true
      let timer = setTimeout(() => {
        this.isSave = false
        clearTimeout(timer)
      }, 1500)
    },
    // 撤销草稿
    removeDraft () {
      if (this.$route.query.id) {
        this.get_article()
      } else {
        this.title = this.content = ''
      }
      cache.removeLocal('draft')
      this.draft = false
    },
    // 打开图片选择框
    selectPictureOpen (index) {
      let allImg = []
      this.clickIndex = index
      this.editor.container.querySelectorAll('img').forEach(item => {
        allImg.push(item.src)
      })
      this.contentImages = allImg
      this.selectPictureVisible = true
    },
    // 所有规则
    allRule () {
      if (!this.title) {
        this.$message.error('标题不能为空')
      } else if (this.title.length < 5) {
        this.$message.error('标题长度不能低于5个字')
      } else if (this.title.length > 30) {
        this.$message.error('标题长度不能超过30个字')
      } else if (!this.content) {
        this.$message.error('正文不能为空')
      } else if (!this.coverImages.length > 0) {
        this.$message.error('封面图片不能为空')
      } else if (this.cover_mode === 3 && this.coverImages.length < 3) {
        this.$message.error('封面图片不能少于3张')
      } else if (!this.classid) {
        this.$message.error('标签不能为空')
      } else {
        return true
      }
    },
    // 标题规则
    onlyTitleRule () {
      if (!this.title) {
        this.$message.error('标题不能为空')
      } else if (this.title.length < 5) {
        this.$message.error('标题长度不能低于5个字')
      } else if (this.title.length > 30) {
        this.$message.error('标题长度不能超过30个字')
      } else {
        return true
      }
    },
    // 插入封面图
    inserCover (val) {
      if (val) {
        this.coverImages[this.clickIndex] = val
      }
    },
    // 验证
    verify (btnType) {
      let type // 类型
      let state // 状态码
      this.json ? type = 'edit' : type = 'new' // 编辑or新建
      // 需要验证的类型
      if (btnType === 'draft') {
        state = '2'
        if (this.onlyTitleRule()) {
          this.publish(type, state)
        }
      }
      if (btnType === 'publish') {
        state = '3'
        if (this.allRule()) {
          this.$confirm('确定发表文章吗？', '提示', {type: 'info'})
            .then(() => {
              this.publish(type, state)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    },
    // 发表
    publish (type, state) {
      let params = {
        type: type,
        state: state,
        title: this.title,
        newstext: this.content,
        classid: this.classid
      }
      if (this.json) {
        params.id = this.json.id
      }
      if (this.coverImages[0]) {
        params.titlepic = this.coverImages[0]
      }
      if (this.cover_mode === 3) {
        params.titlepic2 = this.coverImages[1]
        params.titlepic3 = this.coverImages[2]
      }
      postArticle(params)
        .then(res => {
          console.log(res)
          if (res && res.data) {
            this.isChange = false
            cache.removeLocal('draft')
            this.$notify.success('发表成功')
            this.$router.push({name: 'own'})
          } else {
            this.$notify.error('出现错误1，请重新尝试')
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
          this.$notify.error('出现错误2，请重新尝试')
        })
    },
    // 监听刷新和关闭窗口
    listenFreshClose (e) {
      if (this.$route.fullPath.indexOf('/index/publish') !== -1) {
        e = e || window.event
        if (e) {
          e.returnValue = '关闭提示'
        }
        return '关闭提示'
      } else {
        window.removeEventListener('beforeunload', this.listenFreshClose)
      }
    }
  },
  mounted () {
    this.init()
    window.addEventListener('beforeunload', this.listenFreshClose)
  },
  beforeRouteLeave (to, from, next) {
    next(false)
    if (this.isChange && (this.title || this.content)) {
      var r = confirm('确定要离开本页面吗？系统可能不会保存你做的更改')
      console.log(r)
      if (r) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
#publish{
  padding: 20px 24px;
  .recovery{
    margin-bottom: 10px;
    padding: 0 15px;
    height: 0;
    background: rgba(254, 133, 0, 0.95);
    line-height: 40px;
    font-size: 14px;
    color: #fff;
    overflow: hidden;
    animation: slideDown 5s ease;
    .cancle{
      margin-left: 8px;
      color: #4d7dd2;
    }
  }
  .write{
    position: relative;
    margin-bottom: 50px;
    border: 1px solid #e9e9e9;
    .title{
      position: relative;
      width: 100%;
      height: 58px;
      line-height: 58px;
      input{
        padding-left: 20px;
        padding-right: 80px;
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        font-size: 20px;
        color: #666;
        font-weight: 700;
      }
      .title_count{
        padding: 0 10px;
        position: absolute;
        top: 0;
        right: 0;
        width: 80px;
        height: 100%;
        text-align: right;
        font-size: 14px;
        color: #999;
        &.error{
          color: #ff4949;
        }
      }
    }
    .body{
      width: 100%;
      .quill-editor{
        .ql-toolbar.ql-snow{
          border: none;
          background: #eee;
        }
        .ql-toolbar{
          border-bottom: 1px solid #e9e9e9 !important;
        }
        .ql-container{
          height: 600px;
          border: none;
          font-size: 16px;
          color: #5d5d5d;
        }
        .ql-formats{
          padding-right: 20px;
          border-right: 1px solid #d8d8d8;
          button{
            width: 30px;
            height: 26px;
          }
          .picLib_btn i{
            font-size: 18px;
          }
        }
        img{
          margin: 0 auto 1em;
          display: block;
        }
      }
      .draftSave{
        float: right;
        margin-top: 9px;
        margin-right: 12px;
        font-size: 13px;
        color: #9e9e9e;
        &:before{
          content: '已保存';
        }
        &.on:before{
          content: '保存中';
        }
      }
    }
  }
  .edit{
    margin-bottom: 40px;
    .edit-cell{
      margin-bottom: 30px;
      width: 100%;
    }
    .edit-label{
      float: left;
      width: 122px;
      font-size: 16px;
    }
    .edit-input{
      margin-left: 122px;
      font-size: 14px;
      color: #999;
    }
    .el-radio{
      color: #999;
    }
    .el-radio__label{
      padding-left: 10px;
    }
    .cover{
      .select_radio{
        margin-bottom: 16px;
      }
      .cover_images{
        .cover_add, .cover_img{
          position: relative;
          margin-right: 20px;
          display: inline-block;
          width: 150px;
          height: 105px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          img{
            width: 100%;
            min-height: 105px;
          }
        }
        .cover_add{
          text-align: center;
          line-height: 105px;
          font-size: 20px;
          background-color: #f0f1f3;
        }
      }
      .cover_tip{
        padding-top: 10px;
      }
    }
  }
  .control{
    padding-left: 122px;
    margin-bottom: 50px;
    button{
      width: 140px;
      line-height: 1;
      font-size: 16px;
    }
    .gray{
      background-color: #f1f1f1;
      color: #a4a4a4;
      border-color: #f1f1f1;
      &:hover{
        background-color: #e4e4e4;
        color: #989898;
        border-color: #e4e4e4;
      }
    }
  }
  .img-list{
    .img-item{
      margin: 10px;
      display: inline-block;
      position: relative;
      width: 150px;
      height: 120px;
      border: 1px solid #e8e8e8;
      label{
        width: 100%;
        height: 100%;
        &.is-active:before, &.is-checked:before{
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .5);
          background-position: 100% 0;
          background-repeat: no-repeat;
          text-align: center;
          color: #fffacd;
        }
        &.is-active:after, &.is-checked:after{
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 2;
          transform: translate(-50%, -50%);
          font-size: 30px;
          color: #fffacd;
        }
      }
      span{
        width: 100%;
        height: 100%;
        border: none;
        background-color: #fff;
      }
      img{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        user-select: none;
      }
    }
  }
}

</style>
<style>
#publish .undo{
  background: url(~@/assets/icon/laststep.png) no-repeat center;
}
#publish .redo{
  background: url(~@/assets/icon/nextstep.png) no-repeat center;
}
#publish .undo.nothing, #publish .redo.nothing{
  opacity: .3;
}
#publish .img-list .img-item label.is-active:before{
    background-image: url(~@/assets/img/checked.png);
}
#publish .img-list .img-item label.is-checked:before{
    background-image: url(~@/assets/img/checked.png);
}
#publish .cancle_btn{
  background-color: #f1f1f1;
  color: #a4a4a4;
  border-color: #f1f1f1;
}
#publish .cancle_btn:hover{
  background-color: #e4e4e4;
  color: #999;
  border-color: #e4e4e4;
}
@keyframes slideDown{
  0%{
    height: 40px;
  }
  94%{
    height: 40px;
  }
  100%{
    height: 0;
  }
}
</style>
