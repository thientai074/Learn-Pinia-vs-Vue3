import { Request, Response } from "express";
import UserService from "../services/user.service";

class userController {
  // create User
  async createUser(req: Request, res: Response) {
    try {
      const { fullName, email, password } = req.body;
      if (!fullName || !email || !password) {
        return res.json({
          success: false,
          message: "Missing name or email or password",
        });
      }

      if (fullName.length < 5) {
        return res.json({
          success: false,
          message: "Full Name must has at least 5 letters",
        });
      }

      if (!email.includes("@gmail.com")) {
        return res.json({
          success: false,
          message: "Email must includes @gmail.com",
        });
      }

      const user = await UserService.create(fullName, email, password);
      if (user) {
        res.json(user);
      } else {
        return res.json({
          success: false,
          message: "Can not create user",
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        message: "Creating user failed",
      });
    }
  }

  // GetAllUsers
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      return res.json({
        success: false,
        message: "Getting all users failed",
      });
    }
  }

  // find User
  async findUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await UserService.findUser(userId);
      res.json(user);
    } catch (error) {
      res.json({
        success: false,
        message: "Getting user failed",
      });
    }
  }

  // Remove user
  async removeUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const deletedUser = await UserService.delete(userId);
      res.json(deletedUser);
    } catch (error) {
      res.json({
        success: false,
        message: "Deleting user failed",
      });
    }
  }

  // update user
  async updateUser(req: Request, res: Response) {
    try {
      const body = req.body;
      const userId = req.params.id;
      const updatedUser = await UserService.update(userId, body);
      res.json(updatedUser);
    } catch (error) {
      res.json({
        success: false,
        message: "Updating user failed",
      });
    }
  }
}

export default new userController();
