
import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import store from './store/index.js';

import router from './router/index.js';
import VueResource from 'vue-resource';
import './style/app.scss';


Vue.use(VueRouter);
//Vue.prototype.$http=axios;
 Vue.use(VueResource);
FastClick.attach(document.body)
Vue.config.productionTip = false;
/* eslint-disable no-new */

// 简单的浏览器历史管理
const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach((to, from, next) => {
  // 判断当前切换是前进forward还是后退reverse
  const toIndex = history.getItem(to.path)          // 目标页
  const fromIndex = history.getItem(from.path)      // 出发页
  if (toIndex) {
    // 再次访问目标页toIndex
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('SET_DIRECTION', 'forward')
    } else {
      store.commit('SET_DIRECTION', 'reverse')
    }
  } else {
    // 第一次访问目标页toIndex
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('SET_DIRECTION', 'forward')
  }
  // 判断当前路由标签是否需要登录后权限
  if (to.meta.auth) {
    // 需要登录
    let accessToken = localStorage.getItem('accessToken')
    if (accessToken === 'null' || accessToken === null) {
      // 未登录
     
      next({
        name: 'login'
      })
    } else {
      // 已登录
      next()
    }
  } else {
    // 不需要登录
    next()
     //console.log("1111")
  }
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
