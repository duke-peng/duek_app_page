import Vue from "vue";
import router from "./router.js";
// import store from "./vuex/store";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import "@/assets/css/reset.css";
import "@/assets/fonts/icon/iconfont.css";
Vue.use(MintUI);

Vue.use(
  new VueSocketIO({
    debug: true,
    // 服务器端地址
    // connection: "http://10.74.131.52:3000",
    connection: process.env.VUE_APP_USER_HOST,

    vuex: {}
  })
);
new Vue({
  el: "#app",
  router,
  // store,
  render: h => h(App)
});
