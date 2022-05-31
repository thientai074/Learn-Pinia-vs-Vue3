import { roleFormType, updateRoleFormType } from "../types/role";
import { request } from "./request";

export const requestGetAllRoles = async () => {
  return await request.get("/role");
};

export const requestDeleteRole = async (roleId: string) => {
  return await request.delete(`/role/${roleId}`);
};

export const requestUpdateRole = async (updateRoleForm: updateRoleFormType) => {
  return await request.put(`/role/${updateRoleForm._id}`, updateRoleForm);
};

export const requestCreateRole = async (roleForm: roleFormType ) => {
    return await request.post("/role", roleForm)
}
