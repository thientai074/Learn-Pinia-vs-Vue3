import { Request, Response } from "express";
import RoleService from "../services/role.service";
class RoleController {
  async createRole(req: Request, res: Response) {
    try {
      const { roleId, roleType, rights } = req.body;
      // if (!roleId || !roleType) {
      //   return res.json({
      //     success: false,
      //     message: "Missing roleId or roleType",
      //   });
      // }
      const role = await RoleService.create(roleId, roleType, rights);
      res.json(role);
    } catch (error) {
      return res.json({
        success: false,
        message: "Creating role failed",
      });
    }
  }

  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await RoleService.getAll();
      res.json(roles);
    } catch (error) {
      return res.json({
        success: false,
        message: "Getting all roles failed",
      });
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const roleId = req.params.id;
      const deletedRole = await RoleService.delete(roleId);
      res.json(deletedRole);
    } catch (error) {
      return res.json({
        success: false,
        message: "Deleting this role failed",
      });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const roleId = req.params.id;
      const body = req.body;
      const updatedRole = await RoleService.update(roleId, body);
      res.json(updatedRole);
    } catch (error) {
      return res.json({
        success: false,
        message: "Updating role failed",
      });
    }
  }
}

export default new RoleController();
