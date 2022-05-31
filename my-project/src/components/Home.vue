<template>
  <div class="homeContainer">
    <h1>Welcome {{ authStore.currentUser.fullName }} to homepage</h1>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
export default {
  name: "Home",
  setup() {
    const authStore = useAuthStore();

    const router = useRouter();

    const handleLogout = () => {
      authStore.logoutUser();
      router.push("/login");
    };

    return {
      authStore,
      handleLogout,
    };
  },
};
</script>

<style>
.homeContainer {
  align-items: center;
  text-align: center;
}
</style>
