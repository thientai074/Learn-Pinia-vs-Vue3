<template>
  <div class="roleContainer" v-if="isOpenUpdateRole">
    <div class="roleWrapper">
      <h1 class="updateRoleTitle">
        Update Role Form Role: {{ roleToUpdate._id }}
      </h1>
      <form class="updateRoleForm" @submit="handleUpdateRolePermissions">
        <label>Change role type</label>
        <input
          class="updateInputRole"
          type="text"
          v-model="roleType"
          placeholder="Change Role Type"
          required
        />

        <label>Change role Id</label>
        <input
          class="updateInputRole"
          type="text"
          v-model="roleId"
          placeholder="Change Role Id"
          required
        />

        <label>Change rights</label>
        <input
          class="updateInputRole"
          type="text"
          v-model="rights"
          placeholder="Change Rights"
          required
        />
        <div>
          <button @click="setCloseRolePermissions">Close</button>
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoleStore } from "../store/role";
export default {
  name: "ModalUpdateRole",
  props: ["roleToUpdate", "isOpenUpdateRole"],

  // @ts-ignore
  setup(props, context) {
    const roleType = ref("");
    const roleId = ref("");
    const rights = ref([]);

    const roleStore = useRoleStore();

    // @ts-ignore
    const handleUpdateRolePermissions = (event) => {
      event.preventDefault();

      const updateRoleForm = {
        _id: props.roleToUpdate._id,
        roleType: roleType.value,
        roleId: roleId.value,
        // @ts-ignore
        rights: rights.value.split(","),
      };

      roleStore.updateRole(updateRoleForm);
      context.emit("closeRolePermission", false);
    };

    const setCloseRolePermissions = () => {
      context.emit("closeRolePermission", false);
    };

    return {
      roleType,
      roleId,
      rights,
      setCloseRolePermissions,
      handleUpdateRolePermissions,
    };
  },
};
</script>

<style>
.roleContainer {
  display: flex;
  justify-content: center;
  margin-top: 100px;
}

.updateRoleTitle {
  text-align: center;
}

.roleWrapper {
  border: 1px solid black;
  height: 480px;
  width: 500px;
}

.updateInputRole {
  height: 30px;
  margin: 20px 0;
}

.updateRoleForm {
  display: flex;
  flex-direction: column;
  margin: 10px 30px;
}
</style>
