import Vue from "vue";
import Router from "vue-router";
import user from "@/common/tool/user.js";
Vue.use(Router);

let route = new Router({
  // mode: "history",
  base: process.env.BASE_URL + "answerApp",
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
          name: "home-index",
          component: () => import("../views/home/home.vue")
        },
        {
          path: "/home",
          name: "home",
          component: () => import("../views/home/home.vue")
        },
        {
          path: "/hot",
          name: "hot",
          component: () => import("../views/hot/hot.vue")
        },
        {
          path: "/news",
          name: "news",
          component: () => import("../views/news/news.vue")
        },
        {
          path: "/my",
          name: "my",
          component: () => import("../views/my/my.vue")
        }
      ]
    },
    {
      path: "/anser",
      name: "anser",
      component: () => import("../views/home/anserList.vue")
    },
    {
      path: "/hot/details",
      name: "hotDetails",
      component: () => import("../views/hot/details.vue")
    }
  ]
});
route.beforeEach(user.checkLogin);

export default route;
