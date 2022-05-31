import { Role } from "../models/role.model";

class RoleService {
  async create(roleId: string, roleType: string, rights: any) {
    try {
      const newRole = new Role({
        roleId,
        roleType,
        rights,
      });
      const role = await newRole.save();
      return {
        success: true,
        data: role,
        message: "Role created successfully",
      };
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: "Error while creating role",
      };
    }
  }

  async getAll() {
    try {
      const roles = await Role.find();
      return {
        success: true,
        data: roles,
        message: "Getted roles successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while getting all roles",
      };
    }
  }

  async delete(roleId: string) {
    try {
      const deletedUser = await Role.findByIdAndDelete(roleId);
      return {
        success: true,
        data: deletedUser,
        message: "Deleted role successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting this role",
      };
    }
  }

  async update(roleId: string, body: any) {
    try {
      const updatedRole = await Role.findByIdAndUpdate(
        roleId,
        { $set: body },
        { new: true }
      );
      return {
        success: true,
        data: updatedRole,
        message: "Updated role successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating this role",
      };
    }
  }
}

export default new RoleService();
