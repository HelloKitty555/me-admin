import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'
import login from '../views/login/login.vue'
import post from '../views/index/subViews/post/post.vue'
import manage from '../views/index/subViews/manage/manage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (token) {
          next()
        } else {
          next('/login')
        }
      },
      children: [
        {
          path: 'post',
          name: 'post',
          component: post,
        },
         {
           path: 'manage',
           name: 'manage',
           component: manage
         }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})