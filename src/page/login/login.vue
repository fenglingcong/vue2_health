<template>
  <div id="login">
    <swiper class="swiper" ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <div class="page login-page1">
          <div class="page1_wrap">
            <img src="~@/assets/img/login_logo.png" alt="" class="page1_logo">
            <div class="page1_content"><span class="register_btn">注册</span><span class="login_btn">登录</span></div>
          </div>
          <a href="https://github.com/fenglingcong/vue2_health" class="projectTitle">vue2_health</a>
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
      <swiper-slide>2</swiper-slide>
      <swiper-slide>3</swiper-slide>
      <div class="swiper-pagination" :class="{'other': page === 1}" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
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
        }
      },
      page: 1
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
      top: 50%;
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
      &>i{
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
      	&>i{
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
.login-page1::after{
  content: "";
  display: block;
  height: 100%;
  background: url(~@/assets/img/login_bg.png);
}
</style>
