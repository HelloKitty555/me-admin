import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import api from './network/api'
import './assets/style/index.less'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$api = api
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
