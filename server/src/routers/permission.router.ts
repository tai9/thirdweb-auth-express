import express from "express";
import permissionController from "../controllers/permission.controller";
// import { ensureAuthenticatedUser } from "../middlewares/ensureAuthenticated";

const permissionRouters = express.Router();

// authentication
// router.use(ensureAuthenticatedUser);

permissionRouters.get("/", permissionController.getPermissions);
permissionRouters.post("/", permissionController.createPermission);
permissionRouters.delete("/:id", permissionController.deletePermission);

permissionRouters.get(
  "/perm-categories",
  permissionController.getPermCategories
);

export default permissionRouters;
