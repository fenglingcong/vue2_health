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

const routes = [
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
    component: index,
    children: [
      {
        path: 'home',
        name: 'home',
        component: home
      },
      {
        path: 'publish',
        name: 'publish',
        component: publish
      },
      {
        path: 'manage',
        name: 'manage',
        component: view,
        children: [
          {
            path: 'articles',
            name: 'articles',
            component: articles,
            redirect: '/index/manage/articles/own',
            children: [
              {
                path: 'own',
                name: 'own',
                component: own
              }
            ]
          },
          {
            path: 'comment',
            name: 'comment',
            component: comment,
            redirect: '/index/manage/comment/newest',
            children: [
              {
                path: 'newest',
                name: 'newest',
                component: newest
              },
              {
                path: 'all',
                name: 'all',
                component: all
              }
            ]
          },
          {
            path: 'material',
            name: 'material',
            component: material,
            redirect: '/index/manage/material/pic',
            children: [
              {
                path: 'pic',
                name: 'pic',
                component: pic
              }
            ]
          }
        ]
      },
      {
        path: 'count',
        name: 'count',
        component: count
      },
      {
        path: 'setting',
        name: 'setting',
        component: setting
      }
    ]
  },
  {
    path: '/preview_article',
    name: 'preview',
    component: preview
  }
]

export default new Router({
  routes
})
