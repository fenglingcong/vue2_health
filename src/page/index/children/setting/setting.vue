<template>
  <div class="setting">
    <my-tabs class="tab_main" :json="json"></my-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      json: [
        {
          label: '设置选项',
          name: 'setting'
        }
      ]
    }
  }
}
</script>

<style lang="stylus"></style>
