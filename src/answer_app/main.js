import Vue from "vue";
import router from "./router/router";
import store from "./vuex/store";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import App from "./App.vue";

Vue.use(MintUI);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
