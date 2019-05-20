import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Authorized",
      meta: { index: 0 },
      component: () => import("./views/Authorized.vue")
    },
    {
      path: "/login",
      name: "login",
      meta: { index: 1 },
      component: () => import("./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      meta: { index: 2 },
      component: () => import("./views/Register.vue")
    },
    {
      path: "/findpassword",
      name: "findpassword",
      meta: { index: 3 },
      component: () => import("./views/FindPassword.vue")
    }
  ]
});
