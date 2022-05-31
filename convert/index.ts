require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.router";
import roleRouter from "./routes/role.router";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { env } from "./utils/myVariables";
const cookieParser = require("cookie-parser");
import customerRouter from "./routes/customer.router";

const app = express();

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

// app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.use(express.json());

const MONGODB = env.MONGODB;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB);
  } catch (error) {
    console.log("Ket noi Database that bai !!!");
  }
};
connectDB().then(() => {
  console.log("Ket noi Database thanh cong !!!");
});

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", customerRouter);
app.use("/api", roleRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
