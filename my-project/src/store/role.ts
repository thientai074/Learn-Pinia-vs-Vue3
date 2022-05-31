import { defineStore } from "pinia";
import axios from "axios";
import {
  requestGetAllRoles,
  requestDeleteRole,
  requestUpdateRole,
  requestCreateRole,
} from "../services/role";
import { roleFormType, roleType, updateRoleFormType } from "../types/role";

export const useRoleStore: any = defineStore({
  id: "roles",
  state: () => ({
    roles: [],
    message: "",
  }),
  getters: {},
  actions: {
    async getAllRoles() {
      const res = await requestGetAllRoles();
      console.log("role", res.data)
      if (res.data.success) {
        this.roles = res.data.data;
        this.message = res.data.message;
      } else {
        this.roles = [];
        this.message = res.data.message;
      }
    },

    async createRole(roleForm: roleFormType) {
      const res = await requestCreateRole(roleForm);
      if (res.data.success) {
        // @ts-ignore
        this.roles.unshift(res.data.data);
        this.message = res.data.message;
      } else {
        this.message = res.data.message;
      }
    },
    async deleteRole(roleId: string) {
      const res = await requestDeleteRole(roleId);
      if (res.data.success) {
        this.roles = this.roles.filter((item: roleType) => item._id !== roleId);
        this.message = res.data.message;
      } else {
        this.message = res.data.message;
      }
    },

    async updateRole(updateRoleForm: updateRoleFormType) {
      const res = await requestUpdateRole(updateRoleForm);
      if (res.data.success) {
        const index = this.roles.findIndex(
          (item: roleType) => item._id === res.data.data._id
        );
        // @ts-ignore
        this.roles.splice(index, 1, res.data.data);
        this.message = res.data.message;
      } else {
        this.message = res.data.message;
      }
    },
  },
});
