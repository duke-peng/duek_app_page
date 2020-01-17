import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL + "login",
  routes: [
    {
      path: "/",
      component: () => import("@/login/views/login.vue")
    }
  ]
});
