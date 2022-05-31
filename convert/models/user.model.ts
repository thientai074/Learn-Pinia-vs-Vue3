import { Document, Schema, Types, model } from "mongoose";

interface UserType extends Document {
  fullName: string;
  email: string;
  password: string;
  role: string;
  docVersion: number;
  isDisabled: boolean;
  roleRights: any;
}

const UserSchema = new Schema<UserType>(
  {
    fullName: { type: String, minLength: 5, required: true },
    email: {
      type: String,
      minLength: 5,
      unique: true,
      required: true,
      validate: {
        validator: function (v: any) {
          // Valid email belike hung@gmail.com
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    roleRights: {
      type: Schema.Types.ObjectId,
      ref: "roles",
    },

    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User: any = model<UserType>("users", UserSchema);
