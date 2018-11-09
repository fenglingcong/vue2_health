<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClasses">
        <i class="el-icon-arrow-up"></i>
      </div>
    </slot>
  </div>
</template>

<script>
import {requestAnimationFrame} from '@/utils/RAFrame.js'
const prefixCls = 'my-backTop'
export default {
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      backTop: false
    }
  },
  computed: {
    classes () {
      return [`${prefixCls}`, {[`${prefixCls}-show`]: this.backTop}]
    },
    styles () {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`
      }
    },
    innerClasses () {
      return `${prefixCls}-inner`
    }
  },
  methods: {
    // 滚动方法
    scrollTop (from = 0, to = 0, duration = 500) {
      const difference = Math.abs(from - to) // 距离
      const step = Math.ceil(difference / duration * 50)

      const scroll = (start, end, step) => {
        if (start === end) {
          this.$emit('complete')
          return
        }
        let d = (start + step > end) ? end : start + step
        if (start > end) {
          d = (start - step < end) ? end : start - step
        }
        window.scrollTo(d, d)
        requestAnimationFrame(() => scroll(d, end, step))
      }
      scroll(from, to, step)
    },
    // 滚动回调方法
    handleScroll () {
      // 滚动距离大于设置的高度时，则显示backTop组件
      this.backTop = window.pageYOffset >= this.height
    },
    // 返回顶部
    back () {
      const sTop = window.pageYOffset
      this.scrollTop(sTop, 200, this.duration)
      this.$emit('onClick')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, false)
    window.addEventListener('resize', this.handleScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, false)
    window.removeEventListener('resize', this.handleScroll, false)
  }
}
</script>

<style lang="stylus">
.my-backTop{
  position: fixed;
  z-index: 800;
  cursor: pointer;
  display: none;
  &-show{
    display: block;
  }
  &-inner{
    background-color: rgba(249, 94, 88, .8);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(249, 94, 88, .2);
    transition: all .2s ease-in-out;
    i{
      padding: 8px 12px;
      font-size: 24px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
