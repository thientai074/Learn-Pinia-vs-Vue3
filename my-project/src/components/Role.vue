<template>
  <div class="role">
    <p>Role._id: {{ role._id }}</p>
    <p>Role Id: {{ role.roleId }}</p>
    <p>Role Type: {{ role.roleType }}</p>
    <p>Rights: {{ role.rights }}</p>
    <div class="buttonsRolePermission">
      <button class="deleteRoleButton" @click="roleStore.deleteRole(role._id)">
        Delete Role Permission
      </button>
      <button @click="handleOpenUpdateRoleModal">Update Role Permission</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoleStore } from "../store/role";
export default {
  name: "Role",
  props: ["role"],
  // @ts-ignore
  setup(props, context) {
    const roleStore = useRoleStore();

    const handleOpenUpdateRoleModal = () => {
      context.emit("openUpdateRole", {
        roleUpdate: props.role,
        openUpdateRole: true,
      });
      window.scrollTo(0, 0);
    };

    return {
      roleStore,
      handleOpenUpdateRoleModal,
    };
  },
};
</script>

<style>
.role {
  height: 300px;
  width: 300px;
  border: 1px solid black;
  padding: 30px;
}

.buttonsRolePermission {
  display: flex;
}

.deleteRoleButton {
  background-color: rgba(255, 0, 0, 0.726);
}
</style>
