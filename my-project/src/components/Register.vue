<template>
  <div class="register">
    <h1 class="registerTitle">REGISTER</h1>
    <form @submit="handleRegisterUser" class="registerForm">
      <input
        class="input"
        type="text"
        v-model="fullName"
        placeholder="Your Full Name"
      />
      <input
        class="input"
        type="text"
        v-model="email"
        placeholder="Your Email"
      />
      <input
        class="input"
        type="text"
        v-model="password"
        placeholder="Your Password"
      />
      <p class="message">{{ message }}</p>
      <button type="submit" class="button">Regiser</button>
      <p>
        Already have an account ?
        <router-link :to="{ path: '/login' }"
          ><button class="button">Login</button></router-link
        >
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
export default {
  name: "Register",
  setup() {
    const email = ref("");
    const fullName = ref("");
    const password = ref("");
    const message = ref("");

    const authStore = useAuthStore();

    // @ts-ignore
    const handleRegisterUser = async (event) => {
      event.preventDefault();

      const registerForm = {
        email: email.value,
        password: password.value,
        fullName: fullName.value,
      };

      await authStore.registerUser(registerForm);
      message.value = authStore.getMessageAuth;
      email.value = "";
      password.value = "";
      fullName.value = "";
    };

    return {
      email,
      password,
      fullName,
      message,
      handleRegisterUser,
    };
  },
};
</script>

<style>
.register {
  margin-top: 200px;
}

.registerTitle {
  text-align: center;
}
.registerForm {
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
