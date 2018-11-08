<template>
  <div>
    <my-tabs class="tab_main" :json="json"></my-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      json: [
        {
          label: '最新评论',
          name: 'newest'
        },
        {
          label: '文章论评',
          name: 'all'
        }
      ]
    }
  }
}
</script>

<style lang="stylus"></style>
