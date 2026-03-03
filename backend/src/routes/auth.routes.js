import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";


const userRouter = Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)

export default userRouter