import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
  {
    _id: String,
    token: String,
    user: String,
    type: String,
    expires: Date,
    blacklisted: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
