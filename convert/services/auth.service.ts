import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { env } from "../utils/myVariables";
import { TokenType } from "../types/types";

let refreshTokens: TokenType[] = [];

class AuthService {
  //  login
  async login(email: string, password: string) {
    try {
      const jwtAccessToken = env.JWT_ACCESS_KEY;
      const user = await User.findOne({ email: email });
      const userInfor = await User.findOne({ email: email }).select(
        "-password"
      );

      if (!user) {
        return {
          success: false,
          message: "Incorrect email or password",
        };
      }

      const validPassword =
        user && (await bcrypt.compare(password, user.password));

      if (!validPassword) {
        return {
          success: false,
          message: "Incorrect email or password",
        };
      }

      if (user && validPassword) {
        //Generate access token
        const jwtAccessToken = env.JWT_ACCESS_KEY;
        const accessToken = jwt.sign(
          {
            id: user._id,
            role: user.role,
            email: user.email,
          },
          jwtAccessToken,
          { expiresIn: "1d" }
        );

        return {
          success: true,
          data: { accessToken, userInfor },
          message: "Logged in successfully",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Login failure",
      };
    }
  }
}

export default new AuthService();
