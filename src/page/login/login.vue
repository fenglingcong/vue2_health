<template>
  <div id="login">
    <swiper class="swiper" ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <div class="page login-page1">
          <div class="page1_wrap">
            <img src="~@/assets/img/login_logo.png" alt="" class="page1_logo">
            <div class="page1_content"><span class="register_btn">注册</span><span class="login_btn" @click.stop="dialogFormVisible = true">登录</span></div>
          </div>
          <a href="https://github.com/fenglingcong/vue2_health" target="_blank" class="projectTitle">vue2_health</a>
          <div class="ripple left">
            <i class="r1"></i>
            <i class="r2"></i>
            <i class="r3"></i>
            <i class="r4"></i>
            <i class="r5"></i>
          </div>
          <div class="ripple right">
            <i class="r1"></i>
            <i class="r2"></i>
            <i class="r3"></i>
            <i class="r4"></i>
            <i class="r5"></i>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="page login-page2">
          <div class="page2-wrap">
            <div class="ani page2-content" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.8s">
              <a href="javascript:;" class="link">撒对抗肌肤卢卡斯的说的水电费</a>
              <h2>老师的夸奖失落的房间</h2>
              <p>当其他公拉萨的总平台</p>
              <p>卢卡斯剪短发脸上的肌肤</p>
              <p>吃的尼古拉斯雕刻技法</p>
            </div>
            <div class="page2-picture">
              <div class="iphone">
                <div class="count" v-if="page === 2">
                  <vue-num-to :endVal='88888' prefix="+" :duration="1000"></vue-num-to>
                </div>
              </div>
              <div class="animate-cuve" :class="{'move': page === 2}">
                <div class="dynamic">
                  <vue-num-to class="count" v-if="page === 2" :endVal='increaseNum' :duration="1000"></vue-num-to>
                  <div class="circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="page login-page3">
          <div class="page3-wrap">
            <div class="circle-wrapper">
              <div class="circle" v-if="page === 3">
                <div class="circle-wrap-1"><span class="circle-1"></span></div>
                <div class="circle-wrap-2"><span class="circle-2"></span></div>
                <div class="circle-wrap-3"><span class="circle-3"></span></div>
                <div class="circle-wrap-4"><span class="circle-4"></span></div>
                <div class="circle-wrap-5"><span class="circle-5"></span></div>
                <div class="circle-wrap-6"><span class="circle-6"></span></div>
                <div class="circle-wrap-7"><span class="circle-7"></span></div>
                <span class="digup"></span>
                <span class="like"></span>
                <span class="search"></span>
                <span class="favorite"></span>
              </div>
            </div>
            <div class="ani article" swiper-animate-effect="fadeInUp" swiper-animate-duration="0.8s">
              <a href="" class="link">了解更多</a>
              <h2>迄今为止</h2>
              <h2>老师的课减肥地方</h2>
              <div class="text">
                <p>打开了手机放路上看到减肥</p>
                <p>打开了手机放路上看到减肥</p>
                <p>打开了手机放路上看到减肥</p>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" :class="{'other': page !== 1}" slot="pagination"></div>
    </swiper>
    <!-- 登录框 -->
    <el-dialog class="login_box" title="登录" :visible.sync="dialogFormVisible">
      <el-form :model="form" @submit.native.prevent="verify">
        <el-form-item>
          <el-input v-model="form.username" placeholder="邮箱/手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="密码" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <div class="agree_item">
          <el-checkbox v-model="form.agree">我已阅读并同意<a href="javascript:;">用户协议和隐私条款</a></el-checkbox>
          <a href="javascript:;" class="forget">忘记密码</a>
        </div>
        <el-input class="login_btn" type="submit" value="登录"></el-input>
      </el-form>
      <!-- otherLogin -->
      <ul slot="footer" class="otherLogin">
        <li class="wx"><span>微信</span></li>
        <li class="qq"><span>QQ</span></li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        mousewheel: true,
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          init: function () {
            swiperAnimateCache(this) // 隐藏动画元素
            swiperAnimate(this) // 初始化完成开始动画
          },
          slideChangeTransitionEnd: () => {
            this.page = this.swiper.activeIndex + 1
            $('.animate-cuve').removeClass('move')
            swiperAnimate(this.swiper)
          }
        }
      },
      page: 1,
      increaseNum: 66666,
      dialogFormVisible: false,
      form: {
        username: 'etone',
        password: '123456',
        agree: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    ...mapActions([
      'get_login_data'
    ]),
    // 登录
    login () {
      let params = {
        enews: 'login',
        username: this.form.username,
        password: this.form.password,
        equestion: 0
      }
      this.get_login_data(params)
        .then((res) => {
          this.$route.query.redirect ? this.$router.push(this.$route.query.redirect) : this.$router.push('/index/home')
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('账号或密码错误')
        })
    },
    // 检验
    verify () {
      if (!this.form.username) {
        this.$message.error('请输入账号')
        return false
      }
      if (!this.form.password) {
        this.$message.error('请输入密码')
        return false
      }
      if (!this.form.agree) {
        this.$message.error('请阅读并同意')
        return false
      }
      this.login()
    }
  }
}
</script>

<style lang="stylus">
#login{
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  .swiper{
    width: 100%;
    height: 100%;
  }
  .swiper-pagination{
    top: 50%;
    left: 20px;
    right: inherit;
    .swiper-pagination-bullet{
      display: block;
      margin: 0 auto 10px;
      width: 10px;
      height: 10px;
      background-color: #f7f9fa;
      opacity: 1;
    }
    .swiper-pagination-bullet-active{
      border: 4px solid #fff;
      width: 16px;
      height: 16px;
      background: transparent;
    }
    &.other{
      .swiper-pagination-bullet{
        background: #d2d4d6;
      }
      .swiper-pagination-bullet-active{
        border-color: #f95e58;
        background: transparent;
      }
    }
  }
  .page{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    a.link{
      display: inline-block;
      margin-bottom: 10px;
      padding-bottom: 4px;
      border-bottom: 1px solid #ebebec;
      line-height: 22px;
      font-size: 16px;
      color: #899ec5;
    }
  }
  .login-page1{
    background: linear-gradient(#ff6e7c, #ff776d);
    li:hover{
      opacity: 0.8 !important;
    }
    .projectTitle{
      position: absolute;
      top: 20px;
      left: 30px;
      z-index: 999;
      font-size: 24px;
      font-weight: 500;
      color: #fff;
    }
    .page1_wrap{
      position: absolute;
      top: 45%;
      left: 0;
      right: 0;
      width: 440px;
      height: 280px;
      margin: auto;
      .page1_logo{
        position: absolute;
        top: -250px;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 386px;
        height: 215px;
      }
      .page1_content{
        margin: 60px auto 0;
        width: 368px;
        font-size: 0;
        user-select: none;
        text-align: center;
        span{
          display: inline-block;
          width: 164px;
          height: 62px;
          border: 1px solid #fff;
          border-radius: 4px;
          text-align: center;
          line-height: 60px;
          font-size: 22px;
          color: #fff;
          cursor: pointer;
        }
        span:hover{
          opacity: 0.7;
        }
        .register_btn{
          margin-right: 40px;
        }
        .login_btn{
          color: #ff6e7c;
          background-color: #fff;
          border-color: #ff6e7c;
        }
      }
    }
    .ripple{
      position: absolute;
      & > i{
        position: absolute;
        border: 1px solid #fff;
        border-bottom: 0;
        border-radius: 50%;
        opacity: 0;
        animation: ripple 10s infinite ease-out;
      }
      &.left{
        width: 200px;
        height: 200px;
        left: 50px;
        bottom: -120px;
        &>i{
          width: 200px;
          height: 200px;
        }
      }
      &.right{
        top: 25%;
        right: -25px;
        width: 100px;
        height: 100px;
        & > i{
          width: 100px;
          height: 100px;
        }
      }
      .r2{
        animation-delay: 2s;
      }
      .r3{
        animation-delay: 4s;
      }
      .r4{
        animation-delay: 6s;
      }
      .r5{
        animation-delay: 8s;
      }
    }
  }
  .login-page2{
    background: #f7f9fa;
    .page2-wrap{
      position: relative;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 82%;
      height: 100%;
    }
    .page2-content{
      position: relative;
      padding: 32px;
      width: 450px;
      border: 4px solid #f95e58;
      font-weight: 300;
      h2{
        line-height: 55px;
        font-size: 30px;
        color: #333;
        font-weight: 300;
      }
      p{
        line-height: 22px;
        font-size: 16px;
      }
    }
    .page2-picture{
      position: relative;
      width: 625px;
      height: 362px;
      font-size: 24px;
      color: #539fe0;
      .iphone{
        position: absolute;
        left: -10px;
        bottom: -24px;
        width: 211px;
        height: 291px;
        .count{
          position: absolute;
          top: 91px;
          right: 15px;
          font-size: 18px;
        }
      }
      .animate-cuve{
        position: absolute;
        top: 180px;
        left: 70px;
        width: 177px;
        height: 62px;
        background: url(../../assets/img/message.png)  no-repeat;
        &.move{
          animation: slant .8s ease-in;
          animation-fill-mode: forwards;
        }
        .count{
          position: absolute;
          right: 40px;
          line-height: 54px;
          font-size: 18px;
        }
        .circle{
          position: absolute;
          top: 80px;
          left: 78px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 4px solid #38c6ff;
          background: #DDF1FF;
        }
      }
    }
  }
  .login-page3{
    background: #f2f3f4;
    .page3-wrap{
      position: relative;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      height: 100%;
      perspective: 1000px;
      backface-visibility: hidden;
      .circle-wrapper{
        position: relative;
        width: 470px;
        height: 522px;
      }
      .circle{
        position: relative;
        top: -50px;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        animation: rings-translate 1s linear 1 reverse both;
      }
      .circle-wrap-1{
        transform: translateZ(-140px);
        .circle-1{
          display: block;
          position: absolute;
          width: 470px;
          height: 470px;
          animation: spin 35s infinite linear;
        }
      }
      .circle-wrap-2{
        transform: translateZ(-120px);
        .circle-2{
          margin: 12.5px;
          display: block;
          position: absolute;
          width: 445px;
          height: 445px;
          animation: spin 30s infinite linear;
        }
      }
      .circle-wrap-3{
        transform: translateZ(-100px);
        .circle-3{
          margin: 44px;
          display: block;
          position: absolute;
          width: 380px;
          height: 380px;
        }
      }
      .circle-wrap-4{
        transform: translateZ(-80px);
        .circle-4{
          margin: 55px;
          display: block;
          position: absolute;
          width: 359px;
          height: 359px;
          animation: spin 20s infinite linear;
        }
      }
      .circle-wrap-5{
        transform: translateZ(-60px);
        .circle-5{
          margin: 77px;
          display: block;
          position: absolute;
          width: 316px;
          height: 316px;
        }
      }
      .circle-wrap-6{
        transform: translateZ(-40px);
        .circle-6{
          margin: 71px;
          display: block;
          position: absolute;
          width: 326px;
          height: 326px;
          animation: spin 25s infinite linear;
        }
      }
      .circle-wrap-7{
        transform: translateZ(-20px);
        .circle-7{
          margin: 111px;
          display: block;
          position: absolute;
          width: 244px;
          height: 244px;
        }
      }
      .digup{
        position: absolute;
        top: 13%;
        left: 80px;
        display: block;
        width: 80px;
        height: 80px;
        transform: translateZ(70px);
      }
      .like{
        position: absolute;
        top: 63%;
        left: 22%;
        display: block;
        width: 120px;
        height: 120px;
        transform: translateZ(40px);
      }
      .search{
        position: absolute;
        top: 5%;
        left: 68%;
        display: block;
        width: 84px;
        height: 84px;
        transform: translateZ(40px);
      }
      .favorite{
        position: absolute;
        top: 5%;
        left: 50%;
        display: block;
        width: 124px;
        height: 124px;
        transform: translateZ(40px);
      }
    }
    .article{
      padding: 30px;
      width: 440px;
      height: 250px;
      border: 4px solid #f95e58;
      border-left: 0;
      font-weight: 300;
      h2{
       line-height: 35px;
       font-size: 32px;
       color: #333;
       font-weight: 400;
      }
      .text{
        margin-top: 10px;
        p{
          line-height: 22px;
          font-size: 16px;
        }
      }
    }
  }
}
.login_box{
  a{
    display: inline-block;
    font-size: 12px;
    color: #f95e58;
  }
  .el-dialog{
    width: 340px;
    .el-dialog__header{
      padding-bottom: 0;
    }
    .el-input input{
      height: 42px;
    }
    .el-checkbox__label{
      font-size: 12px !important;
      color: #333;
    }
    .el-form-item{
      margin-bottom: 18px;
    }
    .agree_item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .login_btn{
      width: 100%;
      font-size: 18px;
      &:hover{
        opacity: 0.8;
      }
      input{
        color: #fff;
        background: #f95e58;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
    .otherLogin{
      width: 100%;
      text-align: center;
      li{
        display: inline-block;
        margin: 0 10px;
        padding-top: 40px;
        width: 40px;
        height: 70px;
        cursor: pointer;
      }
      span{
        line-height: 30px;
        font-size: 12px;
        color: #505050;
      }
    }
  }
}
</style>
<style>
@keyframes ripple{
  from{
    opacity: .4;
  }
  to{
    opacity: 0;
    transform: scale(4, 4);
  }
}
@keyframes slant{
  from{
    top: 180px;
    left: 70px;
  }
  to{
    top: 92px;
    left: 256px;
  }
}
@keyframes rings-translate{
  from{
    transform: rotateX(40deg);
  }
  to{
    transform: rotateX(0deg);
  }
}
@keyframes spin{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}

.login-page1::after{
  content: "";
  display: block;
  height: 100%;
  background: url(~@/assets/img/login_bg.png);
}
.login-page2 .page2-wrap{
  background: url(~@/assets/img/login_bg2.png) no-repeat;
}
.login-page2 .page2-picture {
  background: url(~@/assets/img/macbook.png) no-repeat;
}
.login-page2 .iphone {
  background: url(~@/assets/img/iphone.png) no-repeat;
}
.login-page2 .message {
  background: url(~@/assets/img/message.png) no-repeat;
}
.login-page3 .circle-1 {
  background: url(~@/assets/img/circle1.png) no-repeat;
}
.login-page3 .circle-2 {
  background: url(~@/assets/img/circle2.png) no-repeat;
}
.login-page3 .circle-3 {
  background: url(~@/assets/img/circle3.png) no-repeat;
}
.login-page3 .circle-4 {
  background: url(~@/assets/img/circle4.png) no-repeat;
}
.login-page3 .circle-5 {
  background: url(~@/assets/img/circle5.png) no-repeat;
}
.login-page3 .circle-6 {
  background: url(~@/assets/img/circle6.png) no-repeat;
}
.login-page3 .circle-7 {
  background: url(~@/assets/img/circle7.png) no-repeat;
}
.login-page3 .digup{
  background: url(~@/assets/img/circle-digup.png) no-repeat;
}
.login-page3 .like{
  background: url(~@/assets/img/circle-like.png) no-repeat;
}
.login-page3 .search{
  background: url(~@/assets/img/circle-search.png) no-repeat;
}
.login-page3 .favorite{
  background: url(~@/assets/img/circle-favorite.png) no-repeat;
}
#login .otherLogin .wx {
  background: url(~@/assets/icon/icon_wx_pc.svg) no-repeat top center;
}

#login .otherLogin .qq {
  background: url(~@/assets/icon/icon_qq_pc.svg) no-repeat top center;
}
</style>
