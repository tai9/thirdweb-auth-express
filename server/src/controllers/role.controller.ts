import { Request, Response } from "express";
import { constants } from "http2";
import { Role } from "../entities";
import { getUser } from "../middlewares/auth.middleware";
import roleService from "../services/role.service";

const createRole = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req);

    const role = new Role();
    role.name = req.body.name;
    role.description = req.body.description;
    role.status = req.body.status;
    role.permissionIds = req.body.permissionIds;
    role.createdBy = user?.session["userId"] || null;

    const roleCreated = await roleService.createRole(role);
    return res.status(constants.HTTP_STATUS_OK).json(roleCreated);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getRoles();
    return res.status(constants.HTTP_STATUS_OK).json(roles);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const roles = await roleService.deleteRole(id);
    return res.status(constants.HTTP_STATUS_OK).json(roles);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    // const id = +req.params.id;
    // const role = new Role();
    // const roles = await roleService.deleteRole(id);
    return res.status(constants.HTTP_STATUS_OK).json({});
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createRole,
  getRoles,
  deleteRole,
  updateRole,
};
