import express from "express";
import {
  checkAdmin,
  createAdmin,
} from "../controllers/userController/createAdmin";

const userRoutes = express.Router();

userRoutes.post("/sign-up", createAdmin);

userRoutes.post("/sign-in", checkAdmin);

export default userRoutes;
