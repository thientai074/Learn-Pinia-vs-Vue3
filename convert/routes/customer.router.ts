import express from "express";
const router = express.Router();
const { rightToAction} = require("../middlewares/auth.middleware");
import customerController from "../controlllers/customer.controller";

// delete Customer
router.delete(
  "/customer/:id",
  rightToAction("delete-customer"),
  customerController.deleteCustomer
);

// update Customer
router.put(
  "/customer/:id",
  rightToAction("update-customer"),
  customerController.updateCustomer
);

// Create Customer
router.post(
  "/customer",
  rightToAction("create-customer"),
  customerController.createCustomer
);

// Find all customers
router.get(
  "/customer",
  rightToAction("get-customers"),
  customerController.findAllUser
);

export default router;
