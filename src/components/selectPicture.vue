<template>
  <el-dialog class="selectPicture" title="正文图片" :visible.sync="visible" center>
    <div class="nothing" v-if="json && !(json.length > 0)">
      <img src="~@/assets/img/picture.png" alt="">
      <p>还没有图片</p>
    </div>
    <el-radio-group class="img-list" v-model="selected">
      <div class="img-item" v-for="(item, index) in json" :key="index">
        <el-radio-button :label="item">
          <img :src="item" alt="">
        </el-radio-button>
      </div>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancle_btn" @click.stop="cancle">取 消</el-button>
      <el-button type="primary" @click.stop="complete">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    json: Array
  },
  data () {
    return {
      visible: true,
      selected: null
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
    cancle () {
      this.visible = false
    },
    complete () {
      this.$emit('complete', this.selected)
      this.visible = false
    }
  }
}
</script>

<style lang="stylus">
.selectPicture{
  .el-dialog{
    height: 500px;
    .el-dialog__header{
      padding: 20px 20px 0;
      .el-dialog__title{
        font-size: 16px;
      }
    }
    .el-dialog__body{
      margin-bottom: 80px;
      padding: 20px 10px;
      height: 376px;
      overflow-y: auto;
    }
    .el-dialog__footer{
      position: absolute;
      width: 100%;
      bottom: 2px;
    }
  }
  .nothing{
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    text-align: center;
    p{
      margin-top: 5px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
