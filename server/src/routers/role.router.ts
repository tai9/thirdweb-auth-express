import express from "express";
import roleController from "../controllers/role.controller";
// import { ensureAuthenticatedRole } from "../middlewares/ensureAuthenticated";

const roleRouters = express.Router();

// authentication
// router.use(ensureAuthenticatedRole);

roleRouters.post("/", roleController.createRole);
roleRouters.get("/", roleController.getRoles);
roleRouters.delete("/:id", roleController.deleteRole);
roleRouters.put("/:id", roleController.updateRole);

export default roleRouters;
