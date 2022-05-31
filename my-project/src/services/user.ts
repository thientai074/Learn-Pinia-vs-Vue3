import { updateUserFormType } from "../types/use";
import { request } from "./request";

export const requestGetAllUsers = async () => {
  return await request.get("/user");
};

export const requestDeleteUser = async (userId: string) => {
  return await request.delete(`/user/${userId}`);
};

export const requestUpdateUser = async (updateUserForm: updateUserFormType) => {
  return await request.put(`/user/${updateUserForm._id}`, updateUserForm);
};
