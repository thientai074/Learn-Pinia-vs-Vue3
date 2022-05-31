import { Request, Response } from "express";
import { TokenType } from "../types/types";
import AuthService from "../services/auth.service";

class authController {
  // Login User
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({
          success: false,
          message: "Missing email or password",
        });
      }

      if (!email.includes("@gmail.com")) {
        return res.json({
          success: false,
          message: "Email must includes @gmail.com",
        });
      }
      const user = await AuthService.login(email, password);
      res.cookie("token", user?.data?.accessToken);
      res.json(user);
     
      console.log("cookie", user);
    } catch (error) {
      return res.json({
        success: false,
        message: "Login Failed",
      });
    }
  }
}

export default new authController();
