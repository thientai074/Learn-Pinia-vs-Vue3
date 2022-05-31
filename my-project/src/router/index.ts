import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/Register.vue";
import RolesUser from "../components/RolesUser.vue";
import Admin from "../components/Admin.vue";
import { useAuthStore } from "../store/auth";
import AdminLogin from "../components/AdminLogin.vue";
import CreateRole from "../components/CreateRole.vue";
import Home from "../components/Home.vue";
import LoginUser from "../components/LoginUser.vue";

const routes = [
  {
    path: "/adminLogin",
    component: AdminLogin,
  },
  { path: "/register", component: Register },
  {
    path: "/admin",
    component: Admin,

    // @ts-ignore
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();

      if (authStore.currentUser.role !== "admin") {
        next("/adminLogin");
      } else {
        next();
      }
    },
  },
  {
    path: "/showRoles",
    component: RolesUser, // @ts-ignore
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();

      if (authStore.currentUser.role !== "admin") {
        next("/adminLogin");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    component: Home,
    // @ts-ignore
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.authenticate === false) {
        next("/login");
      } else {
        next();
      }
    },
  },
  { path: "/login", component: LoginUser },
  {
    path: "/createRole",
    component: CreateRole, // @ts-ignore
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();

      if (authStore.currentUser.role !== "admin") {
        next("/adminLogin");
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
