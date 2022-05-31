import { defineStore } from "pinia";
import {
  requestGetAllUsers,
  requestDeleteUser,
  requestUpdateUser,
} from "../services/user";
import { updateUserFormType, userType } from "../types/use";

export const useUserStore: any = defineStore({
  id: "users",
  state: () => ({
    users: [],
    message: "",
  }),
  getters: {
    allUsers: (state) => state.users,
  },
  actions: {
    async getAllUsers() {
      const res = await requestGetAllUsers();
      console.log("avav", res.data)

      if (res.data.success) {
        this.users = res.data.data;
        this.message = res.data.message;
      } else {
        this.users = [];
        this.message = res.data.message;
      }
    },
    async deleteUser(userId: string) {
      const res = await requestDeleteUser(userId);
      if (res.data.success) {
        this.users = this.users.filter((user: userType) => user._id !== userId);
        this.message = res.data.message;
      } else {
        this.message = res.data.message;
      }
    },

    async UpdateUser(updateUserForm: updateUserFormType) {
      const res = await requestUpdateUser(updateUserForm);
      if (res.data.success) {
        const index = this.users.findIndex(
          (item: userType) => item._id === res.data.data._id
        );
        // @ts-ignore
        this.users.splice(index, 1, res.data.data);
        this.message = res.data.message;
      } else {
        this.message = res.data.message;
      }
    },
  },
});
