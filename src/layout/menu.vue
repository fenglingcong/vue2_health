<template>
  <el-aside id="menu" width="180px">
    <el-menu active-text-color="#fff" :default-active="$route.name" :default-openeds="defaultOpeneds">
      <my-menu-item :json="filterRoutes"></my-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { routes } from '@/router'
export default {
  data () {
    return {
      filterRoutes: [], // 过滤后的路由
      defaultOpeneds: [] // 默认打开的二级菜单
    }
  },
  methods: {
    // 过滤路由
    handleRoutes (Arr) {
      const routesArr = Arr.filter(route => {
        if (route.name) {
          if (route.hidden) {
            return false
          } else {
            if (!route.open) {
              this.defaultOpeneds.push(route.name)
            }
            if (route.children) {
              route.children = this.handleRoutes(route.children)
            }
            return true
          }
        } else {
          return false
        }
      })
      return routesArr
    },
    // 过滤出index路由
    handleIndexRoutes () {
      let filterRoutes = this.handleRoutes(routes)
      let indexRoutes = filterRoutes[1]
      if (indexRoutes.name === 'index' && indexRoutes.children) {
        this.filterRoutes = indexRoutes.children
      }
    }
  },
  created () {
    this.handleIndexRoutes()
  }
}
</script>

<style lang="stylus">
#menu{
  position: relative;
  height: fit-content;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  background: #fff;
  font-size: 14px;
  user-select: none;
  .el-submenu .el-menu-item{
    min-width: 180px;
  }
  .router-link-active > .el-menu-item {
    background: #f95e58;
    color: #fff;
  }
}
</style>
