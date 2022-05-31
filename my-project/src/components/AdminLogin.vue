<template>
  <div class="login">
    <form class="loginForm" @submit="handleLogin">
      <h1>LOGIN FOR ADMIN</h1>
      <input class="input" type="text" v-model="email" placeholder="Email" />
      <input
        class="input"
        type="text"
        v-model="password"
        placeholder="Password"
      />
      <button class="button" type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "../store/auth";
export default {
  name: "AdminLogin",
  components: {},
  setup() {
    const email = ref("");
    const password = ref("");
    const message = ref("");

    const authStore = useAuthStore();

    const router = useRouter();

    // @ts-ignore
    const handleLogin = async (event) => {
      event.preventDefault();

      const loginForm = {
        email: email.value,
        password: password.value,
      };

      await authStore.loginUser(loginForm);
      message.value = authStore.getMessageAuth;
      email.value = "";
      password.value = "";

      if (authStore.authenticate === true) {
        router.push("/admin");
      }
    };

    return {
      handleLogin,
      email,
      password,
      message,
    };
  },
};
</script>

<style>
.login {
  margin-top: 200px;
}
.loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input {
  margin: 10px 0;
  height: 30px;
  width: 300px;
}

.message {
  color: red;
}

.button {
  height: 30px;
  width: 90px;
}
</style>
