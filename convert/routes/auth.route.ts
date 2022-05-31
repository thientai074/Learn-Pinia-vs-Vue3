import express from "express";
const router = express.Router();
import authController from '../controlllers/auth.controller'


// login
router.post("/login", authController.login);

export default router;
