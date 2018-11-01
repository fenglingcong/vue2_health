<template>
  <div class="menuItem">
    <template v-for="(list, listIndex) in json">
      <!-- 有子路由 -->
      <el-submenu v-if="list.children && list.children.length > 0" :index="list.name" :key="listIndex">
        <template slot="title">
          <i v-if="list.icon" :class="list.icon"></i>
          <span>{{list.title}}</span>
        </template>
        <el-menu-item-group>
          <router-link v-for="(item, itemIndex) in list.children" :key="itemIndex" :to="{name: item.name}">
            <el-menu-item :index="item.name">{{item.title}}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 没有子路由 -->
      <router-link v-else :to="{name: list.name}" :key="listIndex">
        <el-menu-item :index="list.name">
          <i v-if="list.icon" :class="list.icon"></i>
          <span slot="title">{{list.title}}</span>
        </el-menu-item>
      </router-link>

    </template>
  </div>
</template>

<script>
export default {
  props: {
    json: Array
  }
}
</script>

<style>
.menuItem a{
  display: block;
}
</style>
