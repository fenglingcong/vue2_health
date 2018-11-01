import Vue from 'vue'
import Router from 'vue-router'

const view = () => import('@/layout/view')
// 一级页面
const login = () => import('@/page/login/login')
const preview = () => import('@/page/preview/preview')
const index = () => import('@/page/index/index')
// 二级页面
const home = () => import('@/page/index/children/home/home')
const publish = () => import('@/page/index/children/publish/publish')
const count = () => import('@/page/index/children/count/count')
const setting = () => import('@/page/index/children/setting/setting')
// 管理页面相关
const articles = () => import('@/page/index/children/manage/articles/articles')
const own = () => import('@/page/index/children/manage/articles/own')
const comment = () => import('@/page/index/children/manage/comment/comment')
const all = () => import('@/page/index/children/manage/comment/all')
const newest = () => import('@/page/index/children/manage/comment/newest')
const material = () => import('@/page/index/children/manage/material/material')
const pic = () => import('@/page/index/children/manage/material/pic')

Vue.use(Router)

export const routes = [
  {
    path: '',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/index/home',
    meta: { login: true },
    component: index,
    children: [
      {
        path: 'home',
        name: 'home',
        title: '主页',
        icon: 'el-icon-fa-home',
        component: home
      },
      {
        path: 'publish',
        name: 'publish',
        title: '发表',
        icon: 'el-icon-fa-pencil',
        component: publish
      },
      {
        path: 'manage',
        name: 'manage',
        title: '管理',
        icon: 'el-icon-fa-cube',
        component: view,
        children: [
          {
            path: 'articles',
            name: 'articles',
            title: '内容管理',
            component: articles,
            redirect: '/index/manage/articles/own',
            children: [
              {
                path: 'own',
                name: 'own',
                title: '我发表的',
                hidden: true,
                component: own
              }
            ]
          },
          {
            path: 'comment',
            name: 'comment',
            title: '评论管理',
            component: comment,
            redirect: '/index/manage/comment/newest',
            children: [
              {
                path: 'newest',
                name: 'newest',
                title: '最新评论',
                hidden: true,
                component: newest
              },
              {
                path: 'all',
                name: 'all',
                title: '文章评论',
                hidden: true,
                component: all
              }
            ]
          },
          {
            path: 'material',
            name: 'material',
            title: '素材管理',
            component: material,
            redirect: '/index/manage/material/pic',
            children: [
              {
                path: 'pic',
                name: 'pic',
                title: '图片管理',
                hidden: true,
                component: pic
              }
            ]
          }
        ]
      },
      {
        path: 'count',
        name: 'count',
        title: '统计',
        icon: 'el-icon-fa-bar-chart',
        component: count
      },
      {
        path: 'setting',
        name: 'setting',
        title: '设置',
        icon: 'el-icon-fa-cog',
        component: setting
      }
    ]
  },
  {
    path: '/preview_article',
    name: 'preview',
    component: preview,
    meta: { login: true }
  }
]

export default new Router({
  routes
})
