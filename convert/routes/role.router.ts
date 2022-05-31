import express from "express";
import RoleController from "../controlllers/role.controller";
const { rightToAction } = require("../middlewares/auth.middleware");
const router = express.Router();

router.delete(
  "/role/:id",
  rightToAction("delete-role"),
  RoleController.deleteRole
);

router.put(
  "/role/:id",
  rightToAction("update-role"),
  RoleController.updateRole
);

router.post("/role", rightToAction("create-role"), RoleController.createRole);

router.get("/role", rightToAction("get-roles"), RoleController.getAllRoles);

export default router;
