import Vue from "vue";
import Router from "vue-router";
import util from "@/common/tool/util.js";
Vue.use(Router);

let route = new Router({
  // mode: "history",
  base: process.env.BASE_URL + "platform",
  routes: [
    // {
    //   path: "/",
    //   redirect: "/home"
    // },
    {
      path: "/",
      component: () => import("../views/Main.vue"),
      children: [
        {
          path: "/",
          name: "index-page",
          component: () => import("../views/Home.vue")
        },
        {
          path: "/user",
          name: "user",
          component: () => import("../views/user/list.vue")
        },
        {
          path: "/examination/list",
          name: "examinationList",
          component: () => import("../views/examination/list.vue")
        },
        {
          path: "/basic/dictionary",
          name: "dictionary",
          component: () => import("../views/basic/dictionary/index.vue")
        }
      ]
    }
  ]
});
route.beforeEach(util.checkLogin);

export default route;
