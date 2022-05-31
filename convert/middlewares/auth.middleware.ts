const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { env } from "../utils/myVariables";
import { DecodeType } from "../types/types";
import { User } from "../models/user.model";
import mongoose from "mongoose";

const adminRight = [
  "create-user",
  "create-customer",
  "create-role",
  "get-users",
  "get-customers",
  "get-roles",
  "delete-user",
  "delete-customer",
  "delete-role",
  "update-user",
  "update-customer",
  "update-role",
];
const userRight = ["create-user", "create-customer"];

const rightToAction = (permission: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.json({
        success: false,
        message: "Access Token not found",
      });
    }

    try {
      const jwtAccessToken = env.JWT_ACCESS_KEY;
      jwt.verify(
        token,
        jwtAccessToken,
        async (err: any, decoded: DecodeType) => {
          if (err) {
            return res.json("Internal Server Error");
          } else {
            res.locals.jwt = decoded;

            const user = await User.aggregate([
              {
                $match: {
                  _id: new mongoose.Types.ObjectId(`${decoded.id}`),
                },
              },
              {
                $lookup: {
                  from: "roles",
                  localField: "role",
                  foreignField: "roleType",
                  as: "detailRole",
                },
              },
            ]);
            if (!user) {
              res.json({
                success: false,
                message: "Can not find this user",
              });
            }

            const roleRight = user && user[0].detailRole[0].rights;
            if (roleRight.includes(permission)) {
              next();
            } else {
              return res.json({
                success: false,
                message: "You are not allowed to do that",
              });
            }
          }
        }
      );
    } catch (error) {
      return res.json({
        success: false,
        message: "Invalid Token",
      });
    }
  };
};

module.exports = {
  rightToAction,
};
