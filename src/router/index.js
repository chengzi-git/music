import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Find from '../views/Find.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'find',
    component: Find,
    children:[
    {
      path: 'day', 
      name: 'Day',
      component: () => import(/* webpackChunkName: "about" */ '../views/FindList/Day.vue')
    },
    {
      path: 'songlist', 
      name: 'SongList',
      component: () => import(/* webpackChunkName: "about" */ '../views/FindList/SongList.vue')
    },
    {
      path: 'rank', 
      name: 'Rank',
      component: () => import(/* webpackChunkName: "about" */ '../views/FindList/Rank.vue')
    },
    {
      path: 'radio', 
      name: 'Radio',
      component: () => import(/* webpackChunkName: "about" */ '../views/FindList/Radio.vue')
    },
    {
      path: 'fm', 
      name: 'FM',
      component: () => import(/* webpackChunkName: "about" */ '../views/FindList/MyFM.vue')
    },
    {
      path: 'song', 
      name: 'Song',
      component: () => import(/* webpackChunkName: "about" */ '../views/FindList/Song.vue')
    },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/video',
    name: 'Video',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Video.vue')
  },
  {
    path: '/playview',
    name: 'PlayView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PlayView.vue')
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
  },
  {
    path: '/phone',
    name: 'Phone',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Phone.vue')
  },
  {
    path: '/loginsuccess',
    name: 'LoginSuccess',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/LoginSuccess.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
