<template>
  <div class="user">
    <h1 class="title">User</h1>
    <div class="userInfor">
      <p>Id: {{ user._id }}</p>
      <p>Full Name: {{ user.fullName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Is Disable: {{ user.isDisabled === false ? "false" : "true" }}</p>
      <p>Role: {{ user.role }}</p>
    </div>

    <div class="buttons">
      <button @click="userStore.deleteUser(user._id)" class="buttonAction">
        Delete User
      </button>
      <button @click="customChange" class="buttonAction">Update User</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "../store/user";

export default {
  name: "Users",

  props: ["user", "openModal"],

  // @ts-ignore
  setup(props, context) {
    const userStore = useUserStore();

    // @ts-ignore
    const customChange = (event) => {
      const userUpdate = props.user;
      context.emit("customChange", { handleOpenModal: true, userUpdate });
      window.scrollTo(0, 0);
    };

    return {
      userStore,
      customChange,
    };
  },
};
</script>

<style>
.user {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 350px;
  width: 300px;
  padding: 0 auto;
}

.title {
  text-align: center;
}

.userInfor {
  padding-left: 60px;
}

.buttons {
  justify-content: center;
  display: flex;
}

.buttonAction {
  margin: 0 2px;
}
</style>
