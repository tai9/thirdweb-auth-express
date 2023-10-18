import { Request, Response } from "express";
import userService from "../services/user.service";
import { constants } from "http2";
import { User } from "../entities";
import auditService from "../services/audit.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User();
    user.name = req.body.name;
    user.walletAddress = req.body.walletAddress;
    const userCreated = await userService.createUser(user);
    return res.status(constants.HTTP_STATUS_OK).json(userCreated);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    return res.status(constants.HTTP_STATUS_OK).json(users);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const address = req.params.address;
    const users = await userService.deleteUser(address);
    if (users.affected === 0) {
      throw new Error("User not found");
    }
    await auditService.createAuditLog({
      type: "USER",
      status: "SUCCESS",
      description: "Delete user",
      data: JSON.stringify({ address: address }),
      // createdBy,
    });
    return res.status(constants.HTTP_STATUS_OK).json({ address });
  } catch (error: any) {
    console.log(error);
    await auditService.createAuditLog({
      type: "USER",
      status: "FAIL",
      description: "Delete user",
      data: JSON.stringify({ error: error?.message }),
      // createdBy,
    });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createUser,
  getUsers,
  deleteUser,
};
