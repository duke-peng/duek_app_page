// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router/router";
// import store from "./vuex/store";
// import  from ''
// Vue.config.productionTip = false;

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");

import Vue from "vue";
import router from "./router/router";
import store from "./vuex/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.use(ElementUI);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
