<template>
  <div v-if="openModal" class="updateUserModal">
    <h1 class="updateTitle">Update User: {{ user?.fullName }}</h1>
    <form @submit="handleUpdateUser" class="updateForm">
      <label class="updateFormLabel">Change Full Name</label>
      <input
        class="updateUserInput"
        type="text"
        v-model="fullName"
        placeholder="Change Full Name"
        required
      />

      <div>
        <p>Is Disabled: {{ isDisabled }}</p>
        <input
          type="radio"
          id="true"
          value="true"
          v-model="isDisabled"
          required
        />
        <label for="true">True</label>

        <input
          type="radio"
          id="false"
          value="false"
          v-model="isDisabled"
          required
        />
        <label for="false">False</label>
      </div>

      <div>
        <p>Role: {{ role }}</p>

        <select v-model="role">
          <option disabled value="">Please select one</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>
      <div class="buttonsUpdateForm">
        <button class="buttonUpdateForm" @click="handleCloseUpdateModal">
          Close
        </button>
        <button class="buttonUpdateForm" type="submit">Update</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useUserStore } from "../store/user";
export default {
  name: "ModalUpdate",
  props: ["openModal", "user"],

  // @ts-ignore
  setup(props, context) {
    const fullName = ref(props.user?.fullName);
    const role = ref("user");
    const isDisabled = ref(false);

    const userStore = useUserStore();

    // @ts-ignore
    const handleUpdateUser = async (event) => {
      event.preventDefault();
      const updateUserForm = {
        _id: props.user._id,
        fullName: fullName.value,
        role: role.value,
        isDisabled: isDisabled.value,
      };

      await userStore.UpdateUser(updateUserForm);
      context.emit("closeModal", false);
    };

    // @ts-ignore
    const handleCloseUpdateModal = (event) => {
      event.preventDefault();
      context.emit("closeModal", false);
    };
    return {
      handleCloseUpdateModal,
      handleUpdateUser,
      fullName,
      isDisabled,
      role,
    };
  },
};
</script>

<style>
.updateUserModal {
  height: 60vh;
  width: 50vw;
  z-index: 10;
  border: 1px solid black;
  margin-bottom: 160px;
}

.updateTitle {
  text-align: center;
}

.updateUserInput {
  height: 30px;
}

.updateFormLabel {
  margin-bottom: 14px;
}

.updateForm {
  display: flex;
  padding: 0 30%;
  flex-direction: column;
  justify-content: center;
}

.buttonsUpdateForm {
  display: flex;
  justify-content: flex-end;
}

.buttonUpdateForm {
  height: 30px;
  width: 60px;
  margin: 0 2px;
}
</style>
