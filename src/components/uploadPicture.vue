<template>
  <el-dialog class="uploadPicture" :visible.sync="visible" center>
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="上传图片" name="upload" class="upload">
        <el-upload action="http://api.toutiaojk.com/e/extend/jkh/upload_file.php" list-type="picture-card" :multiple="true" :before-upload="uploadBefore" :on-success="onSuccess" :on-error="onError" :on-remove="onRemove" :on-preview="onPreview">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog class="picture_preview" :visible.sync="preViewVisible" :modal="false" append-to-body width="30%">
          <img width="100%" :src="preViewUrl" alt="">
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="免费图片" name="select" class="select">
        <el-input class="imgInput" placeholder="请输入关键字" v-model="keyword" @keyup.native.enter="get_picture">
          <el-button slot="append" @click.stop="get_picture">搜素</el-button>
        </el-input>
        <div class="imgWrapper">
          <my-loading :visible="loading" :reload="get_picture"></my-loading>
          <div class="nothing" v-if="freePictureList && !(freePictureList.length > 0) && !loading">
            <img src="~@/assets/img/picture.png" alt="">
            <p>还没有图片，搜索一下吧</p>
          </div>
          <el-checkbox-group class="img-list" v-model="selectFileList">
            <div class="img-item" v-for="(item, index) in freePictureList" :key="index">
              <el-tooltip placement="right-end" effect="light" :enterable="false">
                <el-checkbox-button :label="item.picurl">
                  <img :src="item.picurl" alt="">
                </el-checkbox-button>
                <!-- hover出现的内容 -->
                <img slot="content" :src="item.picurl" alt="">
              </el-tooltip>
            </div>
          </el-checkbox-group>
          <template v-if="freePictureList && freePictureList.length > 0">
            <my-loading :visible="more_loading" :reload="get_picture_more">
              <div slot="nothing">没有更多数据啦</div>
            </my-loading>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancle_btn" @click.stop="cancle">取 消</el-button>
      <el-button type="primary" @click.stop="complete">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPicture } from '@/api'
export default {
  data () {
    return {
      visible: true, // dialog显示
      preViewVisible: false, // 预览toggle
      preViewUrl: '',
      activeTab: 'upload',
      freePictureList: [], // 免费图片数据
      uploadFileList: [], // 上传图片数组
      selectFileList: [], // 选中图片数组
      keyword: '', // 关键词
      page: 1, // 请求免费图片页数
      loading: false,
      more_loading: false,
      lock: false // 底部请求是否上锁
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.$emit('close', false)
      }
    }
  },
  methods: {
    handleClick (val) {
      if (this.activeTab === 'select') {
        this.$nextTick(() => {
          this.$el.querySelector('.imgWrapper').addEventListener('scroll', this.onScroll)
        })
      } else {
        this.$el.querySelector('.imgWrapper').removeEventListener('scroll', this.onScroll)
      }
    },
    // 上传图片前检查格式、大小
    uploadBefore (file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isImg) {
        this.$message.error('目前只支持jpg / png / gif 的图片格式')
      } else if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5M')
      }
      return isImg && isLt2M
    },
    onSuccess (response, file, fileList) {
      this.uploadFileList = fileList
    },
    onError (err, file, fileList) {
      console.log('上传失败', err)
      this.$message.error('上传失败，请重新尝试')
    },
    onRemove (file, fileList) {
      this.uploadFileList = fileList
    },
    onPreview (file) {
      this.preViewUrl = file.url
      this.preViewVisible = true
    },
    // 上传完成或选择完成
    complete () {
      let uploadPicture = []
      let isUploadComplete = true
      if (this.activeTab === 'upload') {
        this.uploadFileList.forEach((item, index) => {
          if (item.response) {
            uploadPicture.push(item.response.data)
          }
        })
      } else if (this.activeTab === 'select') {
        uploadPicture = this.selectFileList
      }
      if (!isUploadComplete) {
        this.$message.warning('部分图片没有上传成功，请重新尝试')
      }
      this.$emit('complete', uploadPicture)
      this.visible = false
    },
    // 清除上传图片
    cancle () {
      this.visible = false
    },
    get_picture () {
      this.freePictureList = []
      this.selectFileList = []
      this.more_loading = false
      this.loading = true
      let params = {
        key: this.keyword,
        page: 1
      }
      getPicture(params)
        .then(res => {
          if (res) {
            this.freePictureList = res
            this.page = 2
            this.loading = false
          } else {
            this.freePictureList = []
            this.loading = false
          }
        })
        .catch(err => {
          console.log(err)
          this.freePictureList = []
          this.loading = 'error'
        })
    },
    get_picture_more () {
      this.more_loading = true
      let params = {
        key: this.keyword,
        page: this.page
      }
      getPicture(params)
        .then(res => {
          if (res) {
            this.freePictureList.push(...res)
            this.page++
            this.more_loading = false
          } else {
            this.more_loading = 'nothing'
          }
          this.lock = false
        })
        .catch(err => {
          console.log(err)
          this.more_loading = 'error'
          this.lock = false
        })
    },
    onScroll () {
      let scrollEle = this.$el.querySelector('.imgWrapper')
      let wrapperEle = this.$el.querySelector('.img-list')
      let timeoutRef
      if (timeoutRef) {
        clearTimeout(timeoutRef)
      }
      timeoutRef = setTimeout(() => {
        let scrollEleScrollTop = scrollEle.scrollTop
        let scrollEleHeight = scrollEle.offsetHeight
        let wrapperEleHeight = wrapperEle.offsetHeight
        let isBottom = scrollEleScrollTop + scrollEleHeight >= wrapperEleHeight
        let isInit = this.freePictureList.length > 0 && !this.more_loading && this.page >= 2
        if (isBottom && isInit && !this.lock) {
          this.get_picture_more()
          this.lock = true
        }
      }, 150)
    }
  }
}
</script>

<style lang="stylus">
.uploadPicture{
  .el-dialog{
    height: 580px;
  }
  .el-dialog__header{
    padding: 0;
    .el-dialog__headerbtn{
      z-index: 1;
    }
  }
  .el-dialog__body{
    margin-bottom: 80px;
    padding: 0;
    height: 500px;
    overflow-y: auto;
    .el-tabs{
      height: 500px;
      .el-tabs__header{
        margin-bottom: 0;
        .el-tabs__nav-wrap{
          padding: 0 12px;
        }
        .el-tabs__item{
          height: 56px;
          line-height: 56px;
          font-size: 16px;
          font-weight: 400;
        }
      }
      .el-tabs__content{
        height: 444px;
        overflow: auto;
      }
    }
  }
  .el-dialog__footer{
    position: absolute;
    bottom: 2px;
    width: 100%;
  }
  .upload{
    padding: 20px 15px 0;
    width: 100%;
    .el-upload-list__item-thumbnail{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      user-select: none;
    }
  }
  .select{
    height: 444px;
    .imgInput{
      padding: 20px;
    }
    .imgWrapper{
      padding: 0 15px;
      width: 100%;
      height: 364px;
      overflow: auto;
      .nothing{
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate3d(-50%, -50%, 0);
        text-align: center;
        p{
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
      .tooltipImg{
        max-width: 800px;
        max-height: 500px;
      }
    }
  }
}
</style>
