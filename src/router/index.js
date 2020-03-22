import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { auth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { auth: false }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { auth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
