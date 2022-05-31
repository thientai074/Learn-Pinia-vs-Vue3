<template>
  <div>
    <div class="roleUserTitle">
      <h1>All Roles Permission</h1>
      <h2><router-link to="/createRole">Go to create role</router-link></h2>
    </div>
    <ModalUpdateRole
      @closeRolePermission="handleCloseRolsePermission"
      :roleToUpdate="roleToUpdate"
      :isOpenUpdateRole="isOpenUpdateRole"
    />
    <div class="allRoles">
      <Role
        v-for="role in roles"
        :key="role._id"
        :role="role"
        @openUpdateRole="handleOpenUpdateRole"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useRoleStore } from "../store/role";
import { computed, onMounted, ref } from "vue";
import Role from "./Role.vue";
import ModalUpdateRole from "./ModalUpdateRole.vue";
export default {
  name: "RolesUser",
  components: { Role, ModalUpdateRole },
  setup() {
    const roleToUpdate = ref({});
    const isOpenUpdateRole = ref(false);
    const roleStore = useRoleStore();

    onMounted(() => {
      roleStore.getAllRoles();
    });

    const roles = computed(() => {
      return roleStore.roles;
    });

    // @ts-ignore
    const handleOpenUpdateRole = (value) => {
      console.log("valueA", value);
      roleToUpdate.value = value.roleUpdate;
      isOpenUpdateRole.value = value.openUpdateRole;
    };

    // @ts-ignore
    const handleCloseRolsePermission = (value) => {
      isOpenUpdateRole.value = value;
    };

    return {
      roles,
      handleCloseRolsePermission,
      roleToUpdate,
      handleOpenUpdateRole,
      isOpenUpdateRole,
    };
  },
};
</script>

<style>
.allRoles {
  display: flex;
  flex-wrap: wrap;
  margin-top: 140px;
}

.roleUserTitle {
  display: flex;
  align-items: center;
}

h1 {
  margin-right: 10px;
}
</style>
