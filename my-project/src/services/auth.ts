import { authRequest } from "./request";
import { loginFormType, registerFormType } from "../types/auth";

export const requestLogin = async (loginForm: loginFormType) => {
  return await authRequest.post("/login", loginForm, { withCredentials: true });
};

export const requestRegister = async (registerForm: registerFormType) => {
  return await authRequest.post("/user", registerForm);
};
