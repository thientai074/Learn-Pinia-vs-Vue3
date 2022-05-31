<template>
  <dir>
    <!-- <Login /> -->
    <!-- <Register /> -->
    <router-view />
  </dir>
</template>

<script lang="ts">
import Register from "./components/Register.vue";
import Admin from "./components/Admin.vue"
import RolesUser from "./components/RolesUser.vue";
export default {
  name: "App",
  components: {  Register, Admin },
};
</script>

<style></style>
