<template>
  <div class="container">
    <div>
      <div>
        <h1>Create New Role Permission</h1>
      </div>
      <form class="createRoleForm" @submit="handleCreateNewRole">
        <label>New Role Type (Example: user, admin)</label>
        <input
          class="roleInput"
          type="text"
          v-model="roleType"
          placeholder="New Role Type"
        />

        <label>New Role Id</label>
        <input
          class="roleInput"
          type="text"
          v-model="roleId"
          placeholder="New Role Id"
          required
        />

        <label>New Role Rights (Example: create-user,get-users)</label>
        <input
          class="roleInput"
          type="text"
          v-model="rights"
          placeholder="New Role Rights"
        />
        <div class="createRoleButton">
          <button><router-link to="/showRoles">Back</router-link></button>
          <button type="submit" @click="handleCreateNewRole">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoleStore } from "../store/role";
export default {
  name: "Create Role",
  setup() {
    const roleType = ref("");
    const roleId = ref("");
    const rights = ref([]);

    const router = useRouter();

    const roleStore = useRoleStore();

    // @ts-ignore
    const handleCreateNewRole = (event) => {
      event.preventDefault();

      const roleForm = {
        roleType: roleType.value,
        // @ts-ignore
        rights: rights.value.split(","),
        roleId: roleId.value,
      };

      roleStore.createRole(roleForm);
      roleId.value = "";
      roleType.value = "";
      rights.value = [];
      router.push("/showRoles");
    };
    return {
      handleCreateNewRole,
      roleType,
      rights,
      roleId,
    };
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}
.createRoleForm {
  display: flex;
  flex-direction: column;
}

.roleInput {
  width: 100%;
  height: 30px;
  margin: 10px 0;
}

.createRoleButton {
  margin-top: 30px;
  margin-left: 160px;
}

button {
  margin: 0 4px;
  text-decoration: none;
}
</style>
