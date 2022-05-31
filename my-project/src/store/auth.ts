import axios from "axios";
import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { requestLogin, requestRegister } from "../services/auth";
import { loginFormType, registerFormType } from "../types/auth";

export const useAuthStore: any = defineStore({
  id: "auth",
  state: () => ({
    currentUser: [],
    isAuthenticated: false,
    message: "",
  }),
  getters: {
    getMessageAuth: (state) => state.message,
    authenticate: (state) => state.isAuthenticated,
  },
  actions: {
    async loginUser(loginForm: loginFormType) {
      const res = await requestLogin(loginForm);
      if (res.data.success) {
        this.currentUser = res.data.data.userInfor;
        this.isAuthenticated = true;
        this.message = res.data.message;
        localStorage.setItem("todo", res.data.data.accessToken);
      } else if (!res.data.success) {
        (this.currentUser = []), (this.isAuthenticated = false);
        this.message = res.data.message;
      } else {
        this.message = "Internal Server error";
      }
    },

    async registerUser(registerForm: registerFormType) {
      const res = await requestRegister(registerForm);
      this.currentUser = [];
      this.isAuthenticated = false;
      this.message = res.data.message;
    },

    logoutUser() {
      Cookies.remove("token");
      localStorage.removeItem("todo");
      this.currentUser = [];
      this.isAuthenticated = false;
      this.message = "";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "vue3",
        storage: localStorage,
      },
    ],
  },
});
