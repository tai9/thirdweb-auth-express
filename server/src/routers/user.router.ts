import express from "express";
import publicController from "../controllers/user.controller";
// import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticated";

const userRouters = express.Router();

// authentication
// router.use(ensureAuthenticatedUser);

userRouters.post("/", publicController.createUser);
userRouters.get("/", publicController.getUsers);
userRouters.delete("/:address", publicController.deleteUser);

export default userRouters;
