import express from "express";
const router = express.Router();
const { rightToAction } = require("../middlewares/auth.middleware");

import userController from "../controlllers/user.controller";

// Find User
router.get("/user/:id", rightToAction("get-users"), userController.findUser);

// // Update User
router.put(
  "/user/:id",
  rightToAction("update-user"),
  userController.updateUser
);

// // Delete User
router.delete(
  "/user/:id",
  rightToAction("delete-user"),
  userController.removeUser
);

// Get all Users
router.get("/user", rightToAction("get-users"), userController.getAllUsers);

// Create User
router.post("/user", userController.createUser);

export default router;
