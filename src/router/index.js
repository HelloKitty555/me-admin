import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'
import post from '../views/index/subViews/post/post.vue'
import manage from '../views/index/subViews/manage/manage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
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
    }
  ]
})