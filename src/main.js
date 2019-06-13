// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from "./store";
import axios from "axios";
import BaiduMap from 'vue-baidu-map';
Vue.prototype.axios = axios;

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    
    if (localStorage.getItem("ADMINLOGINTOKEN")) {
      console.log("111")
      next();
    } else {
      next({
        path: "/login"//指向为你的登录界面
      });
    }
  } else {
    next();
  }

  if (to.fullPath === "/SignIn") {
    if (JSON.parse(localStorage.getItem("islogin"))) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});
Vue.use(BaiduMap,{
  ak:'ZISshnqhU8NdP5xNwQjIaoVlWV4fpduV'
});
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
