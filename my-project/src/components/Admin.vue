<template>
  <div>
    <h1 class="homeTitle">Admin Dashboard</h1>
    <h1>
      <router-link :to="{ path: '/showRoles' }"
        >Go to Role Permission</router-link
      >
    </h1>
    <div class="logoutButton">
      <button class="buttonInRight" @click="handleLogout">Logout</button>
    </div>
    <div class="modalUpdate">
      <ModalUpdate
        :openModal="openModal"
        :user="userToUpdate"
        @closeModal="handleCloseModal"
      />
    </div>
    <div class="showUser">
      <Users
        @customChange="logChange"
        v-for="user in users"
        :key="user._id"
        :user="user"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "../store/user";
import { computed, ref } from "vue";
import { onMounted } from "vue";
import Users from "./Users.vue";
import ModalUpdate from "./ModalUpdate.vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
export default {
  name: "Admin",
  components: { Users, ModalUpdate },
  setup() {
    const userToUpdate = ref({});
    const openModal = ref(false);

    const userStore = useUserStore();
    const authStore = useAuthStore();

    const router = useRouter();

    onMounted(() => {
      userStore.getAllUsers();
    });

    console.log("coca", Cookies.get("token"));

    const users = computed(() => {
      return userStore.users;
    });

    // @ts-ignore
    const handleCloseModal = (value) => {
      openModal.value = value;
    };

    // @ts-ignore
    const logChange = (value) => {
      openModal.value = value.handleOpenModal;
      userToUpdate.value = value.userUpdate;
    };

    const handleLogout = () => {
      authStore.logoutUser();
      router.push("/login");
    };

    return {
      users,
      openModal,
      userToUpdate,
      logChange,
      handleCloseModal,
      handleLogout,
    };
  },
};
</script>

<style>
.homeTitle {
  text-align: center;
}

.logoutButton {
  display: flex;
  justify-content: flex-end;
  margin-right: 84px;
  margin-bottom: 30px;
}

.modalUpdate {
  display: flex;
  justify-content: center;
}

.showUser {
  display: flex;
  flex-wrap: wrap;
}
</style>
