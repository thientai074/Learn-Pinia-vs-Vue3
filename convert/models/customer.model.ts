import { Document, Schema, Types, model } from "mongoose";
import { UserType } from "../types/types";

interface CustomerType extends Document {
  user: UserType;
  phone: string;
}

const CustomerSchema = new Schema<CustomerType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    phone: {
      type: String,
      validate: {
        validator: function (v: any) {
          // valid phone number belike
          // (123) 456 7899
          // (123).456.7899
          // (123)-456-7899
          // 123-456-7899
          // 123 456 7899
          // 1234567899
          return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(v);
        },
        message: "Please enter a valid phone number",
      },
    },
  },
  { timestamps: true }
);

export const Customer = model<CustomerType>("customers", CustomerSchema);
