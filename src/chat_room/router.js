import Vue from "vue";
import Router from "vue-router";
import util from "@/common/tool/util.js";
Vue.use(Router);

let route = new Router({
  // mode: "history",
  base: process.env.BASE_URL + "chat_room",
  routes: [
    {
      path: "/",
      component: () => import("./view/main.vue"),
      children: [
        {
          path: "/",
          component: () => import("./view/home.vue")
        },
        {
          path: "chatlist",
          component: () => import("./view/home.vue")
        },
        {
          path: "/privacyroom",
          name: "privacyroom",
          component: () => import("./view/privacyroom.vue")
        },
        {
          path: "/friend",
          name: "friend",
          component: () => import("./view/friend.vue")
        },
        {
          path: "/my",
          name: "my",
          component: () => import("./view/my.vue")
        },
        {
          path: "/hot",
          name: "hot",
          component: () => import("./view/hot.vue")
        }
      ]
    },
    {
      path: "/room",
      name: "room",
      component: () => import("./view/room.vue")
    }
  ]
});
route.beforeEach(util.checkLogin);

export default route;
